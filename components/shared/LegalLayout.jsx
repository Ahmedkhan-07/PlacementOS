'use client';

import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';

export default function LegalLayout({ title, lastUpdated, children }) {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 32px' }}>
                    {/* Breadcrumb */}
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                        <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>PlacementOS</Link>
                        {' '}/{' '}{title}
                    </p>

                    {/* Header */}
                    <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: '24px', marginBottom: '40px' }}>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '38px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: '10px' }}>
                            {title}
                        </h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)' }}>
                            Effective Date: {lastUpdated} &nbsp;·&nbsp; PlacementOS by TechForce Studio
                        </p>
                    </div>

                    {/* Content */}
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '15.5px', lineHeight: 1.85, color: 'var(--text)' }}>
                        {children}
                    </div>

                    {/* Footer nav */}
                    <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                        {[
                            { href: '/privacy-policy', label: 'Privacy Policy' },
                            { href: '/terms', label: 'Terms & Conditions' },
                            { href: '/refund-policy', label: 'Refund Policy' },
                            { href: '/shipping-policy', label: 'Shipping & Delivery' },
                            { href: '/contact', label: 'Contact Us' },
                            { href: '/about', label: 'About Us' },
                        ].map(link => (
                            <Link key={link.href} href={link.href}
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
