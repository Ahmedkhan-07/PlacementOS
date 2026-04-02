import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    return Response.json({ user });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { username } = await req.json();

    if (!username || username.length < 3 || username.length > 30) {
        return Response.json({ error: 'Username must be 3-30 characters' }, { status: 400 });
    }

    const sanitized = username.toLowerCase().replace(/[^a-z0-9-]/g, '');

    await connectDB();

    try {
        const existingUsername = await User.findOne({ username: sanitized });
        if (existingUsername) {
            return Response.json({ error: 'Username already taken' }, { status: 409 });
        }

        const existingUser = await User.findOne({ clerkId: userId });
        if (existingUser) {
            return Response.json({ error: 'Account already initialized' }, { status: 400 });
        }

        const user = await User.create({
            clerkId: userId,
            username: sanitized,
        });

        return Response.json({ user }, { status: 201 });
    } catch (err) {
        console.error('Signup Error:', err);
        return Response.json({ error: err.message || 'Signup failed' }, { status: 500 });
    }
}
