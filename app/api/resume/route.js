import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import Resume from '@/models/Resume';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const resume = await Resume.findOne({ userId });
    return Response.json({ resume: resume || null });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();

    await connectDB();
    const resume = await Resume.findOneAndUpdate(
        { userId },
        { $set: { ...data, updatedAt: new Date() } },
        { new: true, upsert: true }
    );

    return Response.json({ resume });
}
