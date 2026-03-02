import { auth } from '@clerk/nextjs';
import { connectDB } from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

export async function GET() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const certificates = await Certificate.find({ userId }).sort({ order: 1, createdAt: -1 }).lean();
    return Response.json({ certificates });
}

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();
    if (!data.name) return Response.json({ error: 'Name is required' }, { status: 400 });

    await connectDB();

    // Idempotency: same name inserted within last 5 seconds → return existing
    const fiveSecondsAgo = new Date(Date.now() - 10000);
    const existing = await Certificate.findOne({
        userId,
        name: data.name,
        createdAt: { $gte: fiveSecondsAgo },
    }).lean();
    if (existing) return Response.json({ certificate: existing }, { status: 201 });

    const count = await Certificate.countDocuments({ userId });
    const certificate = await Certificate.create({ ...data, userId, order: count });
    return Response.json({ certificate: certificate.toObject() }, { status: 201 });
}

export async function PUT(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 });

    const data = await req.json();
    await connectDB();
    const certificate = await Certificate.findOneAndUpdate(
        { _id: id, userId },
        { $set: { name: data.name, issuer: data.issuer, dateIssued: data.dateIssued, fileUrl: data.fileUrl, thumbnailUrl: data.thumbnailUrl, fileType: data.fileType } },
        { new: true }
    );
    if (!certificate) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ certificate: certificate.toObject() });
}

export async function DELETE(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 });

    await connectDB();
    const certificate = await Certificate.findOneAndDelete({ _id: id, userId });
    if (!certificate) return Response.json({ error: 'Not found' }, { status: 404 });

    return Response.json({ success: true });
}
