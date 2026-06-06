import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Resume from '@/models/Resume';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Achievement from '@/models/Achievement';
import PublicPortfolioClient from './PublicPortfolioClient';

export async function generateMetadata({ params }) {
    await connectDB();
    const user = await User.findOne({ username: params.username }).lean();
    if (!user) return { title: 'Not Found' };
    return {
        title: `${user.name || user.username} — Portfolio | PlacementOS`,
        description: user.bio || `${user.name || user.username}'s professional portfolio`,
        openGraph: {
            title: `${user.name || user.username} — Portfolio`,
            description: user.bio || `Professional portfolio on PlacementOS`,
            images: user.profilePicUrl ? [user.profilePicUrl] : [],
        },
    };
}

export default async function PublicPortfolio({ params }) {
    await connectDB();
    const user = await User.findOne({ username: params.username }).lean();

    if (!user) return notFound();

    // The public portfolio is accessible if the URL is shared. 
    // We removed the strict `!user.isPublic` check so it doesn't block by default.

    // Fetch all data for the user
    const [resumeDoc, projects, certificates, achievements] = await Promise.all([
        Resume.findOne({ userId: user.clerkId }).lean(),
        Project.find({ userId: user.clerkId }).sort({ order: 1, createdAt: -1 }).lean(),
        Certificate.find({ userId: user.clerkId }).sort({ order: 1, createdAt: -1 }).lean(),
        Achievement.find({ userId: user.clerkId }).sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    let activeResume = null;
    if (resumeDoc) {
        if (resumeDoc.resumes && resumeDoc.resumes.length > 0) {
            activeResume = resumeDoc.resumes.find(r => r.isActive) || resumeDoc.resumes[0];
        } else {
            activeResume = resumeDoc;
        }
    }

    if (activeResume && user.profilePicUrl) {
        if (!activeResume.personalInfo) activeResume.personalInfo = {};
        activeResume.personalInfo.profilePicUrl = user.profilePicUrl;
    }

    // Serialize MongoDB data (convert ObjectIds and dates to strings)
    const serialized = {
        user: JSON.parse(JSON.stringify(user)),
        resume: activeResume ? JSON.parse(JSON.stringify(activeResume)) : null,
        projects: JSON.parse(JSON.stringify(projects)),
        certificates: JSON.parse(JSON.stringify(certificates)),
        achievements: JSON.parse(JSON.stringify(achievements)),
    };

    return <PublicPortfolioClient {...serialized} />;
}
