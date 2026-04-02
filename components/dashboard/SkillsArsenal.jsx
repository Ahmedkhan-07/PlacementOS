'use client';
import React, { useState } from 'react';

// Professional SVG Icons for Categories
const CATEGORY_ICONS = {
    'Artificial Intelligence': (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
        </svg>
    ),
    'Data Science': (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)' }}>
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <line x1="3" x2="21" y1="9" y2="9"/>
            <line x1="9" x2="9" y1="21" y2="9"/>
        </svg>
    ),
    'Development': (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--warning)' }}>
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
        </svg>
    ),
    'Tools & Frameworks': (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--success)' }}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
    )
};

function categorizeSkills(rawSkills) {
    const categories = {
        'Artificial Intelligence': [],
        'Data Science': [],
        'Development': [],
        'Tools & Frameworks': [],
    };

    const rules = {
        'Artificial Intelligence': ['machine learning', 'deep learning', 'nlp', 'computer vision', 'generative', 'ai', 'neural', 'llm', 'python'],
        'Data Science': ['data science', 'sql', 'math', 'stat', 'data visual', 'analytics', 'tableau', 'power bi', 'python'],
        'Development': ['html', 'css', 'javascript', 'react', 'next', 'node', 'express', 'mongo', 'mysql', 'postgres', 'java', 'c++', 'python', 'typescript', 'api', 'web'],
        'Tools & Frameworks': ['numpy', 'pandas', 'matplotlib', 'git', 'docker', 'aws', 'kubernetes', 'tensor', 'pytorch', 'scikit', 'linux', 'azure']
    };

    rawSkills.forEach(skillStr => {
        const lower = skillStr.toLowerCase().trim();
        if (!lower) return;

        let matched = false;

        // Python spans multiple domains
        if (lower === 'python') {
            categories['Artificial Intelligence'].push(skillStr);
            categories['Data Science'].push(skillStr);
            categories['Development'].push(skillStr);
            matched = true;
        } else {
            for (const [cat, keywords] of Object.entries(rules)) {
                if (keywords.some(k => lower.includes(k))) {
                    if (!categories[cat].includes(skillStr)) {
                        categories[cat].push(skillStr);
                    }
                    matched = true;
                }
            }
        }

        // Default bucket
        if (!matched && !categories['Tools & Frameworks'].includes(skillStr)) {
            categories['Tools & Frameworks'].push(skillStr);
        }
    });

    for (const key in categories) {
        categories[key] = [...new Set(categories[key])];
    }
    
    return categories;
}

// Tooltip/Card Component to enable micro-interactions
function SkillCard({ category, items, icon }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            className="card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '36px 28px',
                position: 'relative',
                overflow: 'visible', // allow glowing effects
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                borderColor: hovered ? 'var(--accent)' : 'var(--border)',
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '4px',
                background: hovered ? 'linear-gradient(90deg, var(--accent), var(--gold))' : 'transparent',
                borderRadius: '16px 16px 0 0',
                transition: 'background 0.4s ease'
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: hovered ? '0 10px 20px rgba(45, 106, 79, 0.12)' : '0 4px 10px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
                    transform: hovered ? 'scale(1.05)' : 'scale(1)'
                }}>
                    {icon}
                </div>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: 0
                }}>
                    {category}
                </h3>
            </div>
            
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                {items.map((skill, idx) => (
                    <span key={idx} style={{
                        background: 'rgba(45, 106, 79, 0.05)',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                        borderRadius: '100px',
                        padding: '8px 18px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'all 0.25s ease',
                        cursor: 'default',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(45, 106, 79, 0.1)';
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.color = 'var(--accent)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(45, 106, 79, 0.05)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function SkillsArsenal({ skills = [] }) {
    const categorized = categorizeSkills(skills);
    const activeCategories = Object.entries(categorized).filter(([_, items]) => items.length > 0);

    if (activeCategories.length === 0) return null;

    return (
        <section id="skills" style={{
            padding: '100px 5%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(to bottom, var(--bg), rgba(45, 106, 79, 0.02))'
        }}>
            <div style={{ maxWidth: '1200px', width: '100%' }}>
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
                            Technical Expertise
                        </span>
                    </div>
                    
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(36px, 5vw, 52px)',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '20px',
                        lineHeight: 1.2
                    }}>
                        My Tech <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Arsenal</span>
                    </h2>
                    
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '17px',
                        color: 'var(--text-muted)',
                        maxWidth: '640px',
                        lineHeight: 1.7,
                        margin: '0 auto' // centered
                    }}>
                        A comprehensive and ever-evolving toolkit spanning the modern technology stack, empowering the creation of intelligent, scalable, and beautifully designed applications.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                }}>
                    {activeCategories.map(([category, items]) => (
                        <SkillCard 
                            key={category} 
                            category={category} 
                            items={items} 
                            icon={CATEGORY_ICONS[category] || CATEGORY_ICONS['Tools & Frameworks']} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
