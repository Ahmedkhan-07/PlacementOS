'use client';

import Link from 'next/link';

export default function Hero() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '100px 20px 80px',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '720px' }}>
                {/* Pill Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 20px',
                    background: 'rgba(45,106,79,0.08)',
                    border: '1px solid rgba(45,106,79,0.2)',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontFamily: "'Inter', sans-serif",
                    color: '#2D6A4F',
                    fontWeight: 500,
                    marginBottom: '32px',
                }}>
                    ✦ Free to Start · Premium to Share
                </div>

                {/* Headline */}
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(40px, 6vw, 76px)',
                    fontWeight: 700,
                    color: '#1C1C1C',
                    lineHeight: 1.1,
                    marginBottom: '24px',
                }}>
                    Your Career. One Link.
                </h1>

                {/* Subheading */}
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    color: '#6B6560',
                    lineHeight: 1.7,
                    maxWidth: '560px',
                    margin: '0 auto 40px',
                }}>
                    Build your resume, showcase projects, store certificates — all in one elegant portfolio.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <Link href="/sign-up">
                        <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '15px' }}>
                            Get Started Free
                        </button>
                    </Link>
                    <a href="#features">
                        <button className="btn-outline" style={{ padding: '14px 36px', fontSize: '15px' }}>
                            See How It Works
                        </button>
                    </a>
                </div>

                {/* Fine print */}
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#6B6560',
                    marginTop: '20px',
                }}>
                    No credit card required · Free forever
                </p>
            </div>
        </section>
    );
}
