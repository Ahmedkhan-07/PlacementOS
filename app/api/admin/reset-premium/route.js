import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    try {
        await connectDB();
        const res = await User.updateMany({}, { $set: { isPremium: false } });
        return Response.json({ success: true, updated: res.modifiedCount });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
