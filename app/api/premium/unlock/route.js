import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
            $set: {
                isPremium: true,
                dataExpiresAt: null,
                updatedAt: new Date(),
            },
        },
        { new: true }
    );

    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    return Response.json({ success: true, isPremium: true });
}
