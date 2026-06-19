import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import UserResumes from '@/models/Resume';

export async function getOrMigrateUserResumes(userId) {
    // 1. Fetch raw MongoDB document to bypass Mongoose schema limitations
    const rawDoc = await UserResumes.collection.findOne({ userId });
    if (!rawDoc) return null;

    const hasRootData = !!(
        rawDoc.summary || 
        rawDoc.skillsText || 
        (rawDoc.personalInfo && (rawDoc.personalInfo.name || rawDoc.personalInfo.email || rawDoc.personalInfo.phone)) || 
        (rawDoc.education && rawDoc.education.length > 0) ||
        (rawDoc.experience && rawDoc.experience.length > 0) ||
        (rawDoc.projects && rawDoc.projects.length > 0)
    );

    const isOldFormat = !Array.isArray(rawDoc.resumes) || (rawDoc.resumes.length === 0 && hasRootData);

    if (isOldFormat) {
        // Full migration of old single-resume document to nested format
        const migratedResume = {
            label: 'Resume 1',
            isActive: true,
            templateId: rawDoc.templateId || 1,
            accentColor: rawDoc.accentColor || '#2D6A4F',
            personalInfo: rawDoc.personalInfo || {},
            summary: rawDoc.summary || '',
            skillsText: rawDoc.skillsText || '',
            skills: rawDoc.skills || [],
            education: rawDoc.education || [],
            experience: rawDoc.experience || [],
            projects: rawDoc.projects || [],
            achievements: rawDoc.achievements || [],
            hobbies: rawDoc.hobbies || [],
            certifications: rawDoc.certifications || [],
            leadership: rawDoc.leadership || [],
            languages: rawDoc.languages || [],
            interests: rawDoc.interests || [],
            references: rawDoc.references || '',
            boldSkillsHeader: rawDoc.boldSkillsHeader || false,
            showProfilePic: rawDoc.showProfilePic !== false,
            updatedAt: rawDoc.updatedAt || new Date(),
        };

        await UserResumes.updateOne(
            { userId },
            {
                $set: { resumes: [migratedResume] },
                $unset: {
                    templateId: "",
                    accentColor: "",
                    personalInfo: "",
                    summary: "",
                    skillsText: "",
                    skills: "",
                    education: "",
                    experience: "",
                    projects: "",
                    achievements: "",
                    hobbies: "",
                    certifications: "",
                    leadership: "",
                    languages: "",
                    interests: "",
                    references: "",
                    boldSkillsHeader: "",
                    showProfilePic: ""
                }
            }
        );
    } else if (rawDoc.resumes && rawDoc.resumes.length > 0) {
        // Self-healing migration check for documents already migrated in previous step
        // to move residual root-level fields (like projects, skills, certifications) into resumes[0]
        // if they were not migrated during the first step.
        const firstResume = rawDoc.resumes[0];
        const fieldsToRestore = {};
        const unsets = {};
        let needsRestore = false;

        const checkAndRestoreArray = (fieldName) => {
            if (rawDoc[fieldName] && rawDoc[fieldName].length > 0 && (!firstResume[fieldName] || firstResume[fieldName].length === 0)) {
                fieldsToRestore[`resumes.0.${fieldName}`] = rawDoc[fieldName];
                unsets[fieldName] = "";
                needsRestore = true;
            }
        };

        const checkAndRestoreValue = (fieldName) => {
            const rawVal = rawDoc[fieldName];
            const firstVal = firstResume[fieldName];
            const rawHasData = rawVal !== undefined && rawVal !== null && rawVal !== '';
            const firstIsEmpty = firstVal === undefined || firstVal === null || firstVal === '';
            if (rawHasData && firstIsEmpty) {
                fieldsToRestore[`resumes.0.${fieldName}`] = rawVal;
                unsets[fieldName] = "";
                needsRestore = true;
            }
        };

        const checkAndRestorePersonalInfo = () => {
            const rawPI = rawDoc.personalInfo;
            const firstPI = firstResume.personalInfo;
            const rawHasData = rawPI && (rawPI.name || rawPI.email || rawPI.phone);
            const firstIsEmpty = !firstPI || (!firstPI.name && !firstPI.email && !firstPI.phone);
            if (rawHasData && firstIsEmpty) {
                fieldsToRestore['resumes.0.personalInfo'] = rawPI;
                unsets['personalInfo'] = "";
                needsRestore = true;
            }
        };

        checkAndRestoreArray('education');
        checkAndRestoreArray('experience');
        checkAndRestoreArray('projects');
        checkAndRestoreArray('skills');
        checkAndRestoreArray('achievements');
        checkAndRestoreArray('hobbies');
        checkAndRestoreArray('certifications');
        checkAndRestoreArray('leadership');
        checkAndRestoreArray('languages');
        checkAndRestoreArray('interests');

        checkAndRestoreValue('summary');
        checkAndRestoreValue('skillsText');
        checkAndRestoreValue('references');
        checkAndRestoreValue('boldSkillsHeader');
        checkAndRestoreValue('showProfilePic');
        checkAndRestoreValue('templateId');
        checkAndRestoreValue('accentColor');

        checkAndRestorePersonalInfo();

        if (needsRestore) {
            await UserResumes.updateOne(
                { userId },
                {
                    $set: fieldsToRestore,
                    $unset: unsets
                }
            );
        }
    }

    return await UserResumes.findOne({ userId });
}

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const doc = await getOrMigrateUserResumes(userId);
    return Response.json({ resumes: doc?.resumes || [] });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const { resumeId, data } = await req.json();
    await connectDB();

    let doc = await getOrMigrateUserResumes(userId);

    if (!doc) {
        doc = await UserResumes.create({
            userId,
            resumes: [{ ...data, label: 'Resume 1', isActive: true }],
        });
        return Response.json({ resume: doc.resumes[0], resumes: doc.resumes });
    }

    if (resumeId) {
        const idx = doc.resumes.findIndex(r => r._id.toString() === resumeId);
        if (idx !== -1) {
            Object.assign(doc.resumes[idx], { ...data, updatedAt: new Date() });
        }
    } else {
        if (doc.resumes.length >= 3) {
            return Response.json({ error: 'Maximum 3 resumes allowed' }, { status: 400 });
        }
        const label = `Resume ${doc.resumes.length + 1}`;
        const isActive = doc.resumes.length === 0;
        doc.resumes.push({ ...data, label, isActive });
    }

    doc.markModified('resumes');
    await doc.save();

    return Response.json({
        resume: resumeId
            ? doc.resumes.find(r => r._id.toString() === resumeId)
            : doc.resumes[doc.resumes.length - 1],
        resumes: doc.resumes,
    });
}

export async function PATCH(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const { resumeId, label } = await req.json();
    await connectDB();

    const doc = await getOrMigrateUserResumes(userId);
    if (!doc) return Response.json({ error: 'Not found' }, { status: 404 });

    doc.resumes.forEach(r => {
        r.isActive = r._id.toString() === resumeId;
    });

    if (label) {
        const target = doc.resumes.find(r => r._id.toString() === resumeId);
        if (target) target.label = label;
    }

    doc.markModified('resumes');
    await doc.save();

    return Response.json({ resumes: doc.resumes });
}

export async function DELETE(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const { resumeId } = await req.json();
    await connectDB();

    const doc = await getOrMigrateUserResumes(userId);
    if (!doc) return Response.json({ error: 'Not found' }, { status: 404 });

    const wasActive = doc.resumes.find(r => r._id.toString() === resumeId)?.isActive;
    doc.resumes = doc.resumes.filter(r => r._id.toString() !== resumeId);

    if (wasActive && doc.resumes.length > 0) {
        doc.resumes[0].isActive = true;
    }

    doc.markModified('resumes');
    await doc.save();

    return Response.json({ resumes: doc.resumes });
}
