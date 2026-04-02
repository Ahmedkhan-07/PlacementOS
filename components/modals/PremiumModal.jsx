'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        const envUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
        return envUrl || window.location.origin;
    }
    return '';
};

const BENEFITS = [
    'Your data is saved permanently — never resets',
    'Public portfolio: your-domain.com/u/your-username', // Placeholder changed in UI
    'Share your link with recruiters, HR, and companies',
    '👑 Royal Premium Badge on your profile',
];

export default function PremiumModal({ isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [shared, setShared] = useState(false);
    const [displayUrl, setDisplayUrl] = useState('');

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_APP_URL?.replace('https://', '')?.replace('http://', '')?.replace(/\/$/, '') || 'placementos.in';
        setDisplayUrl(url);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleUnlock = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/premium/unlock', { method: 'POST' });
            if (res.ok) {
                toast.success('Welcome to Premium! 👑');
                onSuccess?.();
                onClose();
            } else {
                toast.error('Failed to unlock premium. Please try again.');
            }
        } catch {
            toast.error('An error occurred. Check your connection.');
        }
        setLoading(false);
    };

    const handleShare = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || window.location.origin;
        const shareData = {
            title: 'PlacementOS - Ultimate Job Placement Platform',
            text: 'I found this amazing platform to build my placement portfolio! Check it out.',
            url: baseUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                setShared(true);
                toast.success('Link shared! You can now unlock premium.');
                // Auto unlock after successful share
                await handleUnlock();
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(shareData.url);
                setShared(true);
                toast.success('Link copied! Share it with a friend then click Unlock.');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                toast.error('Sharing failed. Please try copying the link.');
            }
        }
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
                    Unlock Premium FREE
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#6B6560',
                    textAlign: 'center',
                    marginBottom: '32px',
                }}>
                    Help us grow by sharing this link to unlock premium features forever!
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
                                {i === 1 ? b.replace('your-domain.com', displayUrl) : b}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Share Section */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ 
                        display: 'inline-block', 
                        background: '#2D6A4F', 
                        color: '#fff', 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        padding: '4px 12px', 
                        borderRadius: '100px', 
                        marginBottom: '10px', 
                        letterSpacing: '0.05em' 
                    }}>
                        SPECIAL OFFER: SHARE TO UNLOCK 🚀
                    </div>
                    {shared ? (
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#2D6A4F', fontWeight: 600 }}>
                            Sharing almost complete! Unlock now.
                        </p>
                    ) : (
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B6560' }}>
                            No payment required. Just share and enjoy.
                        </p>
                    )}
                </div>

                {/* Share/Unlock Button */}
                {!shared ? (
                    <button
                        onClick={handleShare}
                        className="btn-gold"
                        style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '16px' }}
                    >
                        Share with 1 Friend →
                    </button>
                ) : (
                    <button
                        onClick={handleUnlock}
                        disabled={loading}
                        className="btn-gold"
                        style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '16px', background: '#2D6A4F' }}
                    >
                        {loading ? '⏳ Processing...' : 'Unlock Now ✨'}
                    </button>
                )}

                {/* Fine print */}
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#6B6560',
                    textAlign: 'center',
                    marginTop: '16px',
                }}>
                    Help 1 friend get placed to unlock your own premium access.
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
