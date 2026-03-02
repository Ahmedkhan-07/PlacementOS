'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

function ThemeToggle() {
    const { dark, toggle } = useTheme();
    const [spin, setSpin] = useState(false);

    const handleClick = () => {
        setSpin(true);
        toggle();
        setTimeout(() => setSpin(false), 450);
    };

    return (
        <button
            onClick={handleClick}
            className="theme-toggle"
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
        >
            <span className={`theme-toggle-icon${spin ? ' spin' : ''}`}>
                {dark ? '☀️' : '🌙'}
            </span>
            <span className="theme-toggle-label">
                {dark ? 'Light' : 'Dark'}
            </span>
        </button>
    );
}

export default function Navbar() {
    const { isSignedIn } = useUser();
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';

    return (
        <nav className="glass-navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '14px 40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--accent)' }}>
                        PlacementOS
                    </span>
                </Link>

                {/* Right actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Theme toggle — always visible */}
                    <ThemeToggle />

                    {isSignedIn ? (
                        <>
                            {!isDashboard && (
                                <Link href="/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            )}
                            <SignOutButton>
                                <button className="btn-ghost" style={{ padding: '8px 20px', fontSize: '13px' }}>
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <button className="btn-outline" style={{ padding: '10px 28px', fontSize: '13px' }}>
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/sign-up">
                                <button className="btn-primary" style={{ padding: '10px 28px', fontSize: '13px' }}>
                                    Get Started Free
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
