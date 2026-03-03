'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
    const { user: clerkUser } = useUser();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('idle'); // idle | checking | available | taken | invalid
    const [loading, setLoading] = useState(false);

    const checkAvailability = useCallback(async (name) => {
        if (name.length < 3) {
            setStatus('invalid');
            return;
        }
        setStatus('checking');
        try {
            const res = await fetch(`/api/user?check=${name}`);
            if (res.status === 409) {
                setStatus('taken');
            } else {
                setStatus('available');
            }
        } catch {
            setStatus('idle');
        }
    }, []);

    useEffect(() => {
        if (username.length < 3) {
            setStatus(username.length > 0 ? 'invalid' : 'idle');
            return;
        }
        const timer = setTimeout(() => checkAvailability(username), 500);
        return () => clearTimeout(timer);
    }, [username, checkAvailability]);

    const handleChange = (e) => {
        const val = e.target.value
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 30);
        setUsername(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status !== 'available' || loading) return;

        setLoading(true);
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clerkId: clerkUser?.id, username }),
            });

            if (res.ok) {
                toast.success('Username claimed! Welcome aboard! 🎉');
                router.push('/dashboard');
            } else {
                const data = await res.json();
                toast.error(data.error || 'Something went wrong');
                setStatus('taken');
            }
        } catch {
            toast.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    const statusUI = {
        checking: { text: '🔄 Checking...', color: '#6B6560' },
        available: { text: '✅ Available!', color: '#52B788' },
        taken: { text: '❌ Already taken', color: '#C0392B' },
        invalid: { text: 'Min 3 characters', color: '#F39C12' },
        idle: { text: '', color: 'transparent' },
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FAF7F2',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '56px 48px',
                maxWidth: '480px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>

                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#1C1C1C',
                    marginBottom: '12px',
                }}>
                    Choose Your Username
                </h1>

                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#6B6560',
                    marginBottom: '8px',
                }}>
                    Your portfolio lives at:
                </p>
                <p style={{
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color: '#2D6A4F',
                    marginBottom: '32px',
                    fontWeight: 600,
                }}>
                    placement-os-nine.vercel.app/u/{username || 'your-username'}
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        placeholder="your-username"
                        className="fancy-input"
                        style={{ textAlign: 'center', fontSize: '16px', marginBottom: '8px' }}
                        maxLength={30}
                        autoFocus
                    />

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: statusUI[status].color,
                        minHeight: '20px',
                        marginBottom: '24px',
                        transition: 'color 0.2s ease',
                    }}>
                        {statusUI[status].text}
                    </p>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={status !== 'available' || loading}
                        style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                    >
                        {loading ? '⏳ Claiming...' : 'Claim My Username →'}
                    </button>
                </form>
            </div>
        </div>
    );
}
