import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    details: { type: String, default: '' },
    link: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
