'use client';
import React, { useState } from 'react';

// Theme configurations for each category
const CATEGORY_THEMES = {
    'Artificial Intelligence': {
        color: '#10B981', // Emerald
        gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(5, 150, 105, 0.02) 100%)',
        borderGlow: '0 0 20px rgba(16, 185, 129, 0.12)',
        iconBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        glow: 'rgba(16, 185, 129, 0.15)'
    },
    'Data Science': {
        color: '#6366F1', // Indigo
        gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(79, 70, 229, 0.02) 100%)',
        borderGlow: '0 0 20px rgba(99, 102, 241, 0.12)',
        iconBg: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        glow: 'rgba(99, 102, 241, 0.15)'
    },
    'Development': {
        color: '#F59E0B', // Amber
        gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(217, 119, 6, 0.02) 100%)',
        borderGlow: '0 0 20px rgba(245, 158, 11, 0.12)',
        iconBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        glow: 'rgba(245, 158, 11, 0.15)'
    },
    'Tools & Frameworks': {
        color: '#06B6D4', // Cyan
        gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.04) 0%, rgba(8, 145, 178, 0.02) 100%)',
        borderGlow: '0 0 20px rgba(6, 182, 212, 0.12)',
        iconBg: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        glow: 'rgba(6, 182, 212, 0.15)'
    }
};

const CATEGORY_DESCRIPTIONS = {
    'Artificial Intelligence': 'Building intelligent agents, neural network architectures, and generative AI systems.',
    'Data Science': 'Extracting patterns from complex datasets and architecting analytics pipelines.',
    'Development': 'Engineering responsive user interfaces, robust APIs, and web architectures.',
    'Tools & Frameworks': 'Managing deployment environments, developer tools, and continuous delivery pipelines.'
};

// Professional SVG Icons for Categories
const CATEGORY_ICONS = {
    'Artificial Intelligence': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
        </svg>
    ),
    'Data Science': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <line x1="3" x2="21" y1="9" y2="9"/>
            <line x1="9" x2="9" y1="21" y2="9"/>
        </svg>
    ),
    'Development': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
        </svg>
    ),
    'Tools & Frameworks': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
    )
};

const getSkillDotColor = (skillName) => {
    const lower = skillName.toLowerCase().trim();
    if (['python', 'pytorch', 'tensorflow', 'machine learning', 'deep learning', 'nlp', 'llm', 'scikit-learn', 'artificial intelligence', 'neural network'].some(k => lower.includes(k))) {
        return '#10B981'; // Emerald
    }
    if (['sql', 'data science', 'tableau', 'power bi', 'pandas', 'numpy', 'matplotlib', 'r ', 'spark', 'database', 'postgres', 'mysql', 'mongodb'].some(k => lower.includes(k))) {
        return '#6366F1'; // Indigo
    }
    if (['javascript', 'react', 'next', 'node', 'express', 'html', 'css', 'typescript', 'java', 'c++', 'c#', 'php', 'rust', 'go ', 'web', 'api', 'tail'].some(k => lower.includes(k))) {
        return '#F59E0B'; // Amber
    }
    if (['git', 'docker', 'aws', 'kubernetes', 'linux', 'cloud', 'ci/cd', 'github', 'devops', 'azure', 'firebase'].some(k => lower.includes(k))) {
        return '#06B6D4'; // Cyan
    }
    return 'var(--accent)'; // Default
};

const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
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
        'Data Science': ['data science', 'sql', 'math', 'stat', 'data visual', 'analytics', 'tableau', 'power bi', 'python', 'r ', 'spark', 'postgres', 'mysql', 'mongodb', 'database'],
        'Development': ['html', 'css', 'javascript', 'react', 'next', 'node', 'express', 'mongo', 'mysql', 'postgres', 'java', 'c++', 'python', 'typescript', 'api', 'web', 'php', 'rust', 'go ', 'c#'],
        'Tools & Frameworks': ['numpy', 'pandas', 'matplotlib', 'git', 'docker', 'aws', 'kubernetes', 'tensor', 'pytorch', 'scikit', 'linux', 'azure', 'tailwind', 'github', 'devops', 'firebase']
    };

    rawSkills.forEach(skillStr => {
        const lower = skillStr.toLowerCase().trim();
        if (!lower) return;

        let matched = false;

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

        if (!matched && !categories['Tools & Frameworks'].includes(skillStr)) {
            categories['Tools & Frameworks'].push(skillStr);
        }
    });

    for (const key in categories) {
        categories[key] = [...new Set(categories[key])];
    }
    
    return categories;
}

function SkillPill({ skill, themeColor }) {
    const [hovered, setHovered] = useState(false);
    const dotColor = getSkillDotColor(skill);
    
    const getSoftBg = (hex, alpha) => {
        const rgb = hexToRgb(hex);
        return `rgba(${rgb}, ${alpha})`;
    };
    
    return (
        <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? getSoftBg(themeColor, 0.06) : 'var(--bg)',
                color: hovered ? themeColor : 'var(--text)',
                border: `1px solid ${hovered ? themeColor : 'var(--border)'}`,
                borderRadius: '8px',
                padding: '6px 12px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
                display: 'inline-flex',
                alignItems: 'center',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hovered 
                    ? `0 4px 12px ${getSoftBg(themeColor, 0.15)}` 
                    : '0 1px 2px rgba(0,0,0,0.01)',
            }}
        >
            <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: dotColor,
                display: 'inline-block',
                marginRight: '8px',
                boxShadow: hovered ? `0 0 6px ${dotColor}` : 'none',
                transition: 'all 0.2s ease',
                transform: hovered ? 'scale(1.2)' : 'scale(1)'
            }} />
            {skill}
        </span>
    );
}

function SkillCard({ category, items, icon }) {
    const [hovered, setHovered] = useState(false);
    const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES['Tools & Frameworks'];
    const description = CATEGORY_DESCRIPTIONS[category] || 'Technical toolkit and development utilities.';
    
    const rgbColor = hexToRgb(theme.color);
    
    return (
        <div 
            className="card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                borderColor: hovered ? theme.color : 'var(--border)',
                background: hovered ? `linear-gradient(135deg, rgba(${rgbColor}, 0.05) 0%, rgba(${rgbColor}, 0.01) 100%)` : 'var(--surface)',
                boxShadow: hovered 
                    ? `0 20px 40px rgba(0, 0, 0, 0.04), ${theme.borderGlow}` 
                    : '0 4px 20px rgba(0,0,0,0.02)',
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '3px',
                background: theme.iconBg,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: hovered ? `rgba(${rgbColor}, 0.12)` : 'rgba(120, 120, 120, 0.04)',
                        border: `1.5px solid ${hovered ? theme.color : 'var(--border)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: hovered ? `0 8px 16px rgba(${rgbColor}, 0.15)` : 'none',
                    }}>
                        {icon(theme.color)}
                    </div>
                    
                    <h3 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '17px',
                        fontWeight: 600,
                        color: 'var(--text)',
                        margin: 0
                    }}>
                        {category}
                    </h3>
                </div>
            </div>
            
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: '4px 0 8px'
            }}>
                {description}
            </p>
            
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '8px'
            }}>
                {items.map((skill, idx) => (
                    <SkillPill 
                        key={idx} 
                        skill={skill} 
                        themeColor={theme.color} 
                    />
                ))}
            </div>
        </div>
    );
}

function TabButton({ tabName, count, isActive, onClick }) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '8px 18px',
                borderRadius: '100px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                background: isActive 
                    ? 'var(--accent)' 
                    : (hovered ? 'rgba(45, 106, 79, 0.05)' : 'transparent'),
                color: isActive 
                    ? 'white' 
                    : (hovered ? 'var(--accent)' : 'var(--text-muted)'),
                border: 'none',
                boxShadow: isActive ? '0 4px 12px rgba(45, 106, 79, 0.15)' : 'none',
                transform: hovered && !isActive ? 'translateY(-1px)' : 'translateY(0)',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
            }}
        >
            <span>{tabName}</span>
            <span style={{
                fontSize: '10px',
                opacity: 0.8,
                background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--border)',
                color: isActive ? 'white' : 'var(--text-muted)',
                borderRadius: '100px',
                padding: '2px 6px',
                fontWeight: 700,
                display: 'inline-block',
                lineHeight: 1
            }}>
                {count}
            </span>
        </button>
    );
}

export default function SkillsArsenal({ skills = [] }) {
    const [selectedTab, setSelectedTab] = useState('All');
    const categorized = categorizeSkills(skills);
    const activeCategories = Object.entries(categorized).filter(([_, items]) => items.length > 0);

    if (activeCategories.length === 0) return null;

    const filteredCategories = selectedTab === 'All' 
        ? activeCategories 
        : activeCategories.filter(([category]) => category === selectedTab);

    // Dynamic counts
    const totalUniqueSkills = new Set(skills.map(s => s.trim()).filter(Boolean)).size;

    return (
        <section id="skills" style={{
            padding: '80px 5%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(to bottom, var(--bg), rgba(45, 106, 79, 0.01))'
        }}>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulse-accent {
                    0% { transform: scale(0.85); box-shadow: 0 0 0 0 rgba(45, 106, 79, 0.4); }
                    70% { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(45, 106, 79, 0); }
                    100% { transform: scale(0.85); box-shadow: 0 0 0 0 rgba(45, 106, 79, 0); }
                }
                .pulse-dot {
                    animation: pulse-accent 2s infinite ease-in-out;
                }
            `}} />

            {/* Glowing Backdrop Blob */}
            <div style={{
                position: 'absolute',
                top: '20%', left: '30%', width: '400px', height: '400px',
                borderRadius: '50%', background: 'var(--accent)',
                filter: 'blur(150px)', opacity: 0.05, pointerEvents: 'none', zIndex: 0
            }} />

            <div style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 1 }}>
                
                {/* Asymmetric Section Header Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    alignItems: 'flex-end',
                    marginBottom: '60px',
                    width: '100%'
                }}>
                    {/* Left Panel: Branding & Title */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px',
                            padding: '6px 14px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '100px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}>
                            <span 
                                className="pulse-dot"
                                style={{ 
                                    width: '6px', 
                                    height: '6px', 
                                    borderRadius: '50%', 
                                    background: 'var(--accent)', 
                                    display: 'inline-block'
                                }} 
                            />
                            <span style={{ 
                                fontFamily: "'Inter', sans-serif", 
                                fontSize: '11px', 
                                letterSpacing: '0.12em', 
                                color: 'var(--text-muted)', 
                                textTransform: 'uppercase', 
                                fontWeight: 700 
                            }}>
                                Technical Expertise
                            </span>
                        </div>
                        
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(32px, 4.5vw, 46px)',
                            fontWeight: 700,
                            color: 'var(--text)',
                            marginBottom: '16px',
                            lineHeight: 1.15
                        }}>
                            Core Tech <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Arsenal</span>
                        </h2>
                        
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px',
                            color: 'var(--text-muted)',
                            lineHeight: 1.6,
                            maxWidth: '520px',
                            margin: 0
                        }}>
                            A curated, dynamically organized index of technologies, languages, and frameworks acquired through engineering complex, high-impact projects.
                        </p>
                    </div>

                    {/* Right Panel: Segmented Filter Control */}
                    {activeCategories.length > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            justifySelf: 'stretch',
                            width: '100%',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '100px',
                                padding: '4px',
                                gap: '2px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                                flexWrap: 'wrap',
                                marginLeft: 'auto',
                            }}>
                                <TabButton 
                                    tabName="All" 
                                    count={totalUniqueSkills}
                                    isActive={selectedTab === 'All'} 
                                    onClick={() => setSelectedTab('All')} 
                                />
                                {activeCategories.map(([category, items]) => (
                                    <TabButton 
                                        key={category}
                                        tabName={category} 
                                        count={items.length}
                                        isActive={selectedTab === category} 
                                        onClick={() => setSelectedTab(category)} 
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: filteredCategories.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
                    maxWidth: filteredCategories.length === 1 ? '700px' : '100%',
                    margin: '0 auto',
                    gap: '30px',
                }}>
                    {filteredCategories.map(([category, items]) => (
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
