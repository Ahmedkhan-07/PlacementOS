import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    templateId: { type: Number, default: 1 },
    accentColor: { type: String, default: '#2D6A4F' },
    personalInfo: {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedinUrl: { type: String, default: '' },
        githubUrl: { type: String, default: '' },
        websiteUrl: { type: String, default: '' },
        profilePicUrl: { type: String, default: '' },
    },
    summary: { type: String, default: '' },
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
    skills: [{ type: String }],
    projects: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        techStack: [{ type: String }],
        githubUrl: { type: String, default: '' },
        demoUrl: { type: String, default: '' },
    }],
    achievements: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        year: { type: String, default: '' },
    }],
    hobbies: [{ type: String }],
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
