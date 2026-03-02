'use client';

import Link from 'next/link';

export default function CTASection() {
    return (
        <section style={{
            background: '#2D6A4F',
            padding: '96px 40px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '20px',
                }}>
                    Ready to stand out?
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.75)',
                    marginBottom: '40px',
                    lineHeight: 1.6,
                }}>
                    Join students who already share their portfolio link.
                </p>
                <Link href="/sign-up">
                    <button className="btn-gold" style={{ padding: '18px 48px', fontSize: '16px' }}>
                        Create Your Free Portfolio →
                    </button>
                </Link>
            </div>
        </section>
    );
}
