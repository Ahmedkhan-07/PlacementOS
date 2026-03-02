import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import Achievement from '@/models/Achievement';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const achievements = await Achievement.find({ userId }).sort({ order: 1, createdAt: -1 }).lean();
    return Response.json({ achievements });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();
    if (!data.title?.trim()) return Response.json({ error: 'Title is required' }, { status: 400 });

    await connectDB();

    // Idempotency: same title inserted within last 10 seconds → return existing
    const tenSecondsAgo = new Date(Date.now() - 10000);
    const existing = await Achievement.findOne({
        userId,
        title: data.title,
        createdAt: { $gte: tenSecondsAgo },
    }).lean();
    if (existing) return Response.json({ achievement: existing }, { status: 201 });

    const count = await Achievement.countDocuments({ userId });
    const achievement = await Achievement.create({ ...data, userId, order: count });
    return Response.json({ achievement: achievement.toObject() }, { status: 201 });
}

export async function PUT(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 });

    const data = await req.json();
    await connectDB();
    const achievement = await Achievement.findOneAndUpdate(
        { _id: id, userId },
        { $set: { title: data.title, description: data.description, details: data.details, link: data.link, imageUrl: data.imageUrl } },
        { new: true }
    );
    if (!achievement) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ achievement: achievement.toObject() });
}

export async function DELETE(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 });

    await connectDB();
    const achievement = await Achievement.findOneAndDelete({ _id: id, userId });
    if (!achievement) return Response.json({ error: 'Not found' }, { status: 404 });

    return Response.json({ success: true });
}
