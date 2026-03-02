import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ clerkId: userId }).select('isPremium dataExpiresAt');
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    return Response.json({
        isPremium: user.isPremium,
        dataExpiresAt: user.dataExpiresAt,
    });
}
