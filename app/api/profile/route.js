import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function PATCH(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();

    const allowedFields = [
        'name', 'headline', 'bio', 'profilePicUrl', 'skills', 'contactEmail',
        'linkedinUrl', 'githubUrl', 'leetcodeUrl', 'hackerrankUrl',
        'codeforcesUrl', 'twitterUrl', 'websiteUrl', 'isPublic', 'openToOpportunities'
    ];

    const updates = {};
    for (const key of allowedFields) {
        if (data[key] !== undefined) {
            updates[key] = data[key];
        }
    }
    updates.updatedAt = new Date();

    await connectDB();
    const user = await User.findOneAndUpdate(
        { clerkId: userId },
        { $set: updates },
        { new: true }
    );

    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    return Response.json({ user });
}
