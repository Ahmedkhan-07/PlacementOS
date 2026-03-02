import Razorpay from 'razorpay';

let _razorpay = null;

export function getRazorpay() {
    if (!_razorpay) {
        _razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return _razorpay;
}

// Keep named export for backward compat — resolves lazily on first property access
export const razorpay = new Proxy({}, {
    get(_, prop) {
        return getRazorpay()[prop];
    }
});

