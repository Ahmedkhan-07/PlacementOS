import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Resume from '@/models/Resume';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Achievement from '@/models/Achievement';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const now = new Date();

    const expiredUsers = await User.find({
        isPremium: false,
        dataExpiresAt: { $lte: now },
    });

    for (const user of expiredUsers) {
        await Resume.deleteOne({ userId: user.clerkId });
        await Project.deleteMany({ userId: user.clerkId });
        await Certificate.deleteMany({ userId: user.clerkId });
        await Achievement.deleteMany({ userId: user.clerkId });

        await User.findByIdAndUpdate(user._id, {
            name: '',
            headline: '',
            bio: '',
            profilePicUrl: '',
            skills: [],
            linkedinUrl: '',
            githubUrl: '',
            leetcodeUrl: '',
            hackerrankUrl: '',
            codeforcesUrl: '',
            twitterUrl: '',
            websiteUrl: '',
            isPublic: false,
            dataExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    }

    return Response.json({ cleaned: expiredUsers.length });
}
