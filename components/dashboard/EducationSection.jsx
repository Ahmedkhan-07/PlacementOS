'use client';
import React, { useState } from 'react';

function EduCard({ edu, isLast }) {
    const [hovered, setHovered] = useState(false);
    
    return (
        <div style={{ display: 'flex', position: 'relative', paddingBottom: isLast ? '0' : '40px' }}>
            {/* Connecting Timeline Line */}
            {!isLast && (
                <div style={{
                    position: 'absolute',
                    left: '23px', // Center aligned with the 16px dot (15px + 8px half-width)
                    top: '36px',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--accent) 0%, rgba(45, 106, 79, 0.1) 100%)',
                    zIndex: 0
                }} />
            )}

            {/* Timeline Dot */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                marginTop: '28px', // Match the card's inner badge offset
                marginRight: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '48px', // Flexible column
                flexShrink: 0
            }}>
                <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--surface)',
                    border: '3px solid var(--accent)',
                    boxShadow: hovered ? '0 0 14px var(--accent)' : '0 0 0 rgba(0,0,0,0)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: hovered ? 'scale(1.3)' : 'scale(1)'
                }} />
            </div>

            {/* Education Content Card */}
            <div 
                className="card"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    flex: 1,
                    padding: '32px',
                    transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                    borderColor: hovered ? 'var(--accent)' : 'var(--border)',
                }}
            >
                {/* Duration Badge */}
                <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    background: hovered ? 'var(--accent)' : 'rgba(45, 106, 79, 0.08)',
                    color: hovered ? '#ffffff' : 'var(--accent)',
                    borderRadius: '100px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '20px',
                    transition: 'all 0.3s ease'
                }}>
                    {edu.startYear} — {edu.current ? 'Present' : edu.endYear}
                </div>

                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '26px',
                    color: 'var(--text)',
                    fontWeight: 700,
                    marginBottom: '10px',
                    lineHeight: 1.3
                }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </h3>
                
                <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: 'var(--text-muted)',
                    marginBottom: edu.grade ? '20px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--accent)'}}>
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                     </svg>
                    <span style={{ fontWeight: 500 }}>{edu.institution}</span>
                </div>

                {edu.grade && (
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'var(--text)',
                        fontWeight: 500,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--gold-light)"/>
                        </svg>
                        Grade: {edu.grade}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function EducationSection({ education = [] }) {
    if (!education || education.length === 0) return null;

    return (
        <section id="education" style={{
            padding: '100px 5%',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                        padding: '8px 16px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '100px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                            Academic Journey
                        </span>
                    </div>
                    
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(36px, 5vw, 52px)',
                        fontWeight: 700,
                        color: 'var(--text)',
                        lineHeight: 1.2
                    }}>
                        My Education
                    </h2>
                </div>

                <div style={{ position: 'relative' }}>
                    {education.map((edu, i) => (
                        <EduCard 
                            key={i} 
                            edu={edu} 
                            isLast={i === education.length - 1} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
