import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: '' },
    demoUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
