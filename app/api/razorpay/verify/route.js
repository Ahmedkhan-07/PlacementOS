import { auth } from '@clerk/nextjs';
import crypto from 'crypto';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    if (expectedSignature !== razorpay_signature) {
        return Response.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
            $set: {
                isPremium: true,
                dataExpiresAt: null,
                razorpayPaymentId: razorpay_payment_id,
                updatedAt: new Date(),
            },
        },
        { new: true }
    );

    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    return Response.json({ success: true, isPremium: true });
}
