'use client';

import { useState, useEffect, useRef } from 'react';

export default function TypewriterSummary({ user, resume }) {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);
    const sectionRef = useRef(null);

    // Prefer resume.summary, fall back to user.bio
    const sourceText = resume?.summary || user?.bio || '';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started || !sourceText) return;
        setDisplayedText('');
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayedText(sourceText.slice(0, i));
            if (i >= sourceText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [started, sourceText]);

    if (!sourceText) return null;

    return (
        <section
            ref={sectionRef}
            style={{
                padding: '80px 48px',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                minHeight: '80px',
            }}>
                {!started ? (
                    <em style={{ color: 'var(--text-muted)' }}>
                        Loading summary...
                        <span style={{ borderRight: '2px solid var(--text-muted)', animation: 'blink 1s step-end infinite', marginLeft: 1 }}>​</span>
                    </em>
                ) : (
                    <>
                        {displayedText}
                        {displayedText.length < sourceText.length && (
                            <span style={{ borderRight: '2px solid var(--accent)', animation: 'blink 1s step-end infinite', marginLeft: 1 }}>​</span>
                        )}
                    </>
                )}
            </p>
            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </section>
    );
}
