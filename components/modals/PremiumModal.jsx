'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BENEFITS = [
    'Your data is saved permanently — never resets',
    'Public portfolio: placementos.com/u/your-username',
    'Share your link with recruiters, HR, and companies',
    'Download your full portfolio as a beautiful PDF',
    '👑 Royal Premium Badge on your profile',
];

export default function PremiumModal({ isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/razorpay/create-order', { method: 'POST' });
            const { orderId, amount } = await res.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount,
                currency: 'INR',
                order_id: orderId,
                name: 'PlacementOS Premium',
                description: 'Lifetime Premium Access',
                handler: async (response) => {
                    try {
                        const verifyRes = await fetch('/api/razorpay/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        if (verifyRes.ok) {
                            toast.success('Welcome to Premium! 👑');
                            onSuccess?.();
                            onClose();
                        } else {
                            toast.error('Payment verification failed');
                        }
                    } catch {
                        toast.error('Verification error');
                    }
                },
                modal: { ondismiss: () => setLoading(false) },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch {
            toast.error('Could not initiate payment');
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#FFFFFF',
                    borderRadius: '28px',
                    padding: '56px 48px',
                    maxWidth: '520px',
                    width: '100%',
                    position: 'relative',
                    animation: 'modalSlideUp 0.4s ease forwards',
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="btn-icon"
                    style={{ position: 'absolute', top: '16px', right: '16px' }}
                >
                    ×
                </button>

                {/* Crown */}
                <div style={{ textAlign: 'center', fontSize: '56px', marginBottom: '16px' }}>
                    👑
                </div>

                {/* Heading */}
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '38px',
                    fontWeight: 700,
                    color: '#2D6A4F',
                    textAlign: 'center',
                    marginBottom: '8px',
                }}>
                    Unlock Premium
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#6B6560',
                    textAlign: 'center',
                    marginBottom: '32px',
                }}>
                    Everything you need to stand out to every recruiter
                </p>

                {/* Benefits */}
                <div style={{ marginBottom: '32px' }}>
                    {BENEFITS.map((b, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            marginBottom: '14px',
                        }}>
                            <span style={{ color: '#C9A23A', fontSize: '16px', flexShrink: 0 }}>✅</span>
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '15px',
                                color: '#1C1C1C',
                                lineHeight: 1.5,
                            }}>
                                {b}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Price */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    {/* Discount badge */}
                    <div style={{ display: 'inline-block', background: '#C0392B', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', marginBottom: '10px', letterSpacing: '0.05em' }}>
                        93% OFF 🔥
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px' }}>
                        {/* Strikethrough original */}
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '26px', color: '#aaa', textDecoration: 'line-through', fontWeight: 500 }}>
                            ₹399
                        </span>
                        {/* Actual price */}
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '58px', fontWeight: 700, color: '#2D6A4F', lineHeight: 1 }}>
                            ₹29
                        </span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560', marginTop: '6px' }}>
                        one-time payment · limited time offer
                    </p>
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '16px' }}
                >
                    {loading ? '⏳ Processing...' : 'Unlock Premium →'}
                </button>

                {/* Fine print */}
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#6B6560',
                    textAlign: 'center',
                    marginTop: '16px',
                }}>
                    One-time payment. No subscriptions. No renewals. Ever.
                </p>
            </div>

            <style>{`
                @keyframes modalSlideUp {
                    from { transform: translateY(60px); opacity: 0; }
                    to   { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
