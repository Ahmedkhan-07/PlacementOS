import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: '' },
    headline: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 300 },
    profilePicUrl: { type: String, default: '' },
    skills: [{ type: String }],
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    leetcodeUrl: { type: String, default: '' },
    hackerrankUrl: { type: String, default: '' },
    codeforcesUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    isPremium: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    razorpayPaymentId: { type: String, default: '' },
    dataExpiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
