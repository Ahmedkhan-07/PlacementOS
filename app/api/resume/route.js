import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import Resume from '@/models/Resume';
import User from '@/models/User';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const resume = await Resume.findOne({ userId });
    const user = await User.findOne({ clerkId: userId });

    let resumeObj = resume ? resume.toObject() : null;
    if (resumeObj && user && user.profilePicUrl) {
        if (!resumeObj.personalInfo) resumeObj.personalInfo = {};
        resumeObj.personalInfo.profilePicUrl = user.profilePicUrl;
    }

    return Response.json({ resume: resumeObj });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (user && user.profilePicUrl) {
        if (!data.personalInfo) data.personalInfo = {};
        data.personalInfo.profilePicUrl = user.profilePicUrl;
    }

    const resume = await Resume.findOneAndUpdate(
        { userId },
        { $set: { ...data, updatedAt: new Date() } },
        { new: true, upsert: true }
    );

    return Response.json({ resume });
}
