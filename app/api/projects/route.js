import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const projects = await Project.find({ userId }).sort({ order: 1, createdAt: -1 }).lean();
    return Response.json({ projects });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();
    if (!data.title) return Response.json({ error: 'Title is required' }, { status: 400 });

    await connectDB();

    // Idempotency: if the same title was inserted in the last 5 seconds for this user, return it
    const fiveSecondsAgo = new Date(Date.now() - 10000);
    const existing = await Project.findOne({
        userId,
        title: data.title,
        createdAt: { $gte: fiveSecondsAgo },
    }).lean();
    if (existing) return Response.json({ project: existing }, { status: 201 });

    const count = await Project.countDocuments({ userId });
    const project = await Project.create({ ...data, userId, order: count });
    return Response.json({ project: project.toObject() }, { status: 201 });
}

export async function PUT(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 });

    const data = await req.json();
    await connectDB();
    const project = await Project.findOneAndUpdate(
        { _id: id, userId },
        { $set: { title: data.title, description: data.description, techStack: data.techStack, githubUrl: data.githubUrl, demoUrl: data.demoUrl, imageUrl: data.imageUrl } },
        { new: true }
    );
    if (!project) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ project: project.toObject() });
}

export async function DELETE(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 });

    await connectDB();
    const project = await Project.findOneAndDelete({ _id: id, userId });
    if (!project) return Response.json({ error: 'Not found' }, { status: 404 });

    return Response.json({ success: true });
}
