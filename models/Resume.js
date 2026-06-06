import mongoose from 'mongoose';

const ResumeDataSchema = new mongoose.Schema({
    label: { type: String, default: 'Resume 1' },
    isActive: { type: Boolean, default: false },
    templateId: { type: Number, default: 1 },
    accentColor: { type: String, default: '#2D6A4F' },
    personalInfo: {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedinUrl: { type: String, default: '' },
        githubUrl: { type: String, default: '' },
        leetcodeUrl: { type: String, default: '' },
        portfolioUrl: { type: String, default: '' },
        websiteUrl: { type: String, default: '' },
        profilePicUrl: { type: String, default: '' },
    },
    summary: { type: String, default: '' },
    skillsText: { type: String, default: '' },
    skills: [{ type: String }],
    education: [{
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        field: { type: String, default: '' },
        startYear: { type: String, default: '' },
        endYear: { type: String, default: '' },
        grade: { type: String, default: '' },
        description: { type: String, default: '' },
    }],
    experience: [{
        company: { type: String, default: '' },
        role: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
    }],
    projects: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        techStack: [{ type: String }],
        githubUrl: { type: String, default: '' },
        demoUrl: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
    }],
    achievements: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        year: { type: String, default: '' },
        url: { type: String, default: '' },
    }],
    hobbies: [{ type: String }],
    certifications: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        year: { type: String, default: '' },
        url: { type: String, default: '' },
        hidden: { type: Boolean, default: false },
    }],
    leadership: [{
        role: { type: String, default: '' },
        organization: { type: String, default: '' },
        description: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
    }],
    languages: [{ type: String }],
    interests: [{ type: String }],
    references: { type: String, default: '' },
    boldSkillsHeader: { type: Boolean, default: false },
    showProfilePic: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
});

const UserResumesSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    resumes: {
        type: [ResumeDataSchema],
        default: [],
        validate: [arr => arr.length <= 3, 'Maximum 3 resumes allowed'],
    },
});

export default mongoose.models.UserResumes || mongoose.model('UserResumes', UserResumesSchema, 'resumes');
