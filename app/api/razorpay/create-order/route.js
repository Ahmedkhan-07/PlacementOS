import { auth } from '@clerk/nextjs';
import { razorpay } from '@/lib/razorpay';

export async function POST() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const order = await razorpay.orders.create({
            amount: 2900,
            currency: 'INR',
            receipt: `pos_${userId.slice(-16)}_${Date.now().toString().slice(-8)}`,
        });

        return Response.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Razorpay order error:', error);
        return Response.json({ error: 'Order creation failed' }, { status: 500 });
    }
}
