'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function PremiumCTA({ user, onOpenPremiumModal, onRefreshUser }) {
    const [isPublic, setIsPublic] = useState(user?.isPublic || false);
    const [copied, setCopied] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [toggling, setToggling] = useState(false);

    const [portfolioUrl, setPortfolioUrl] = useState('');

    useEffect(() => {
        setPortfolioUrl(`https://placement-os-nine.vercel.app/u/${user?.username}`);
    }, [user?.username]);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(portfolioUrl);
            setCopied(true);
            toast.success('Link copied! 📋');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleTogglePublic = async () => {
        setToggling(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPublic: !isPublic }),
            });
            if (res.ok) {
                setIsPublic(!isPublic);
                toast.success(isPublic ? 'Portfolio set to private' : 'Portfolio is now public! 🎉');
                onRefreshUser?.();
            }
        } catch {
            toast.error('Failed to update');
        }
        setToggling(false);
    };

    const handleDownloadPortfolioPdf = async () => {
        setPdfLoading(true);
        try {
            const res = await fetch('/api/portfolio-pdf', { method: 'POST' });
            if (!res.ok) throw new Error('Failed');
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${user.username}-portfolio.pdf`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('Portfolio PDF ready! 📄');
        } catch {
            toast.error('Failed to generate PDF');
        }
        setPdfLoading(false);
    };

    // Premium user view
    if (user?.isPremium) {
        return (
            <section style={{
                padding: '80px 40px',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{
                    background: '#FFFFFF',
                    border: '2px solid #2D6A4F',
                    borderRadius: '28px',
                    padding: '64px 56px',
                    maxWidth: '720px',
                    width: '100%',
                    textAlign: 'center',
                }}>
                    {/* Premium badge */}
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>👑</div>

                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '38px',
                        fontWeight: 700,
                        color: '#2D6A4F',
                        marginBottom: '32px',
                    }}>
                        Your Portfolio is Live!
                    </h2>

                    {/* Copy URL */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        justifyContent: 'center',
                        marginBottom: '28px',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{
                            background: '#FAF7F2',
                            border: '1.5px solid #E8E0D4',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            color: '#2D6A4F',
                            fontWeight: 500,
                        }}>
                            {portfolioUrl.replace('https://', '')}
                        </div>
                        <button onClick={handleCopy} className="btn-icon">
                            {copied ? '✅' : '📋'}
                        </button>
                    </div>

                    {/* Toggle public */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '14px',
                        marginBottom: '32px',
                    }}>
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px',
                            color: '#1C1C1C',
                            fontWeight: 500,
                        }}>
                            Make Profile Public
                        </span>
                        <div
                            onClick={toggling ? undefined : handleTogglePublic}
                            className={`toggle-switch ${isPublic ? 'active' : ''}`}
                            style={{ opacity: toggling ? 0.6 : 1 }}
                        />
                    </div>

                    {/* Download portfolio PDF */}
                    <button
                        onClick={handleDownloadPortfolioPdf}
                        disabled={pdfLoading}
                        className="btn-gold"
                        style={{ fontSize: '16px', padding: '16px 40px' }}
                    >
                        {pdfLoading ? '⏳ Generating...' : '📄 Download Portfolio PDF'}
                    </button>
                </div>
            </section>
        );
    }

    // Free user view
    return (
        <section style={{
            padding: '80px 40px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{
                background: '#FFFFFF',
                border: '2px solid #2D6A4F',
                borderRadius: '28px',
                padding: '64px 56px',
                maxWidth: '720px',
                width: '100%',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>

                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '38px',
                    fontWeight: 700,
                    color: '#2D6A4F',
                    marginBottom: '12px',
                }}>
                    Share Your Portfolio With the World
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#6B6560',
                    marginBottom: '12px',
                    maxWidth: '480px',
                    margin: '0 auto 12px',
                }}>
                    Get a permanent link and let every recruiter find you. Upgrade to keep your data forever.
                </p>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#F39C12',
                    marginBottom: '32px',
                }}>
                    ⚠️ Free portfolios reset every 30 days
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}>
                    <button onClick={onOpenPremiumModal} className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
                        🔗 Make Portfolio Public
                    </button>
                    <button onClick={onOpenPremiumModal} className="btn-gold" style={{ fontSize: '16px', padding: '16px 36px' }}>
                        📄 Download Portfolio PDF
                    </button>
                </div>
            </div>
        </section>
    );
}
