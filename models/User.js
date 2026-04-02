import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: '' },
    headline: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 300 },
    aboutMe: { type: String, default: '', maxlength: 1000 },
    profilePicUrl: { type: String, default: '' },
    skills: [{ type: String }],
    contactEmail: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    leetcodeUrl: { type: String, default: '' },
    hackerrankUrl: { type: String, default: '' },
    codeforcesUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    openToOpportunities: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    razorpayPaymentId: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
