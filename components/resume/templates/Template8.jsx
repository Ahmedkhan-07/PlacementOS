export default function Template8({ data = {}, accentColor = '#2D6A4F' }) {
    if (accentColor === '#FFFFFF' || accentColor === '#ffffff') {
        accentColor = '#1C1C1C';
    }
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '18px' }}>
            <h3 style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderBottom: `1.5px solid ${accentColor}`,
                paddingBottom: '3px',
                marginBottom: '10px',
            }}>{title}</h3>
            {children}
        </div>
    );

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            fontSize: '10pt',
            lineHeight: 1.5,
            margin: '0 auto',
            boxSizing: 'border-box',
        }}>
            {/* Bold Premium Banner Header */}
            <div style={{
                backgroundColor: accentColor,
                color: '#FFFFFF',
                padding: '36px 40px',
                textAlign: 'center',
            }}>
                {data.showProfilePic === true && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', margin: '0 auto 12px',
                                border: '2px solid rgba(255,255,255,0.5)'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                            color: '#fff', fontSize: '22px', fontWeight: 700,
                            border: '2px solid rgba(255,255,255,0.5)'
                        }}>
                            {initials}
                        </div>
                    )
                )}

                <h1 style={{
                    fontSize: '26pt',
                    fontWeight: 800,
                    margin: '0 0 8px',
                    letterSpacing: '-0.02em',
                }}>
                    {pi.name || 'Your Name'}
                </h1>
                
                {/* Contact grid */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '6px 16px',
                    fontSize: '9pt',
                    opacity: 0.9,
                }}>
                    {pi.email && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><MailIcon /> {pi.email}</span>}
                    {pi.phone && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><PhoneIcon /> {pi.phone}</span>}
                    {pi.location && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><MapPinIcon /> {pi.location}</span>}
                    {pi.linkedinUrl && (
                        <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><LinkedinIcon /> LinkedIn</a>
                    )}
                    {pi.githubUrl && (
                        <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><GithubIcon /> GitHub</a>
                    )}
                    {pi.leetcodeUrl && (
                        <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><LeetCodeIcon /> LeetCode</a>
                    )}
                    {pi.portfolioUrl && (
                        <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><GlobeIcon /> Portfolio</a>
                    )}
                </div>
            </div>

            {/* Split Grid Body */}
            <div style={{
                display: 'flex',
                padding: '32px 40px',
                gap: '28px',
            }}>
                {/* Left Column — 65% width */}
                <div style={{ width: '65%' }}>
                    {/* 1. Professional Profile */}
                    {data.summary && (
                        <Section title="Professional Profile">
                            <p style={{ color: '#4a4a4a', fontSize: '9.5pt', margin: 0 }}>
                                {data.summary}
                            </p>
                        </Section>
                    )}

                    {/* 2. Education */}
                    {data.education?.length > 0 && (
                        <Section title="Education">
                            {data.education.map((e, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <strong style={{ fontSize: '10pt', display: 'block' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                    <span style={{ fontSize: '9.5pt', color: '#4a4a4a', display: 'block' }}>{e.degree} {e.field && `in ${e.field}`}</span>
                                    <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{e.startYear} – {e.endYear} {e.grade && `| ${e.gradeType || 'CGPA'}: ${e.grade}`}</span>
                                    {e.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: '2px 0 0' }}>{e.description}</p>}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 3. Key Projects */}
                    {data.projects?.length > 0 && (
                        <Section title="Key Projects">
                            {data.projects.map((p, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <strong style={{ fontSize: '10.5pt' }}>{p.title}</strong>
                                            <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>
                                                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none', marginRight: '6px' }}>GitHub</a>}
                                                {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>Live</a>}
                                            </span>
                                        </div>
                                        {(p.startDate || p.endDate) && (
                                            <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>
                                                {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                            </span>
                                        )}
                                    </div>
                                    {p.techStack?.length > 0 && (
                                        <p style={{ fontSize: '8.5pt', color: '#6B6560', fontStyle: 'italic', margin: 0 }}>
                                            {p.techStack.join(', ')}
                                        </p>
                                    )}
                                    {p.description && (
                                        <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, marginTop: '2px', whiteSpace: 'pre-line' }}>
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 4. Work History */}
                    {data.experience?.length > 0 && (
                        <Section title="Work History">
                            {data.experience.map((e, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <strong style={{ fontSize: '10.5pt' }}>{e.role}</strong>
                                        <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                                    </div>
                                    <span style={{ fontSize: '9.5pt', color: accentColor, fontWeight: 600, display: 'block', marginBottom: '3px' }}>{e.company}</span>
                                    {e.description && (
                                        <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line' }}>
                                            {e.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 5. Certifications */}
                    {data.certifications?.length > 0 && (
                        <Section title="Certifications">
                            {data.certifications.map((c, i) => (
                                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <strong style={{ fontSize: '9.5pt' }}>{c.title}</strong>
                                        {c.description && <p style={{ fontSize: '8.5pt', color: '#4a4a4a', margin: '2px 0 0' }}>{c.description}</p>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {c.year && <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{c.year}</span>}
                                        {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '8.5pt', color: accentColor, textDecoration: 'none' }}>Verify →</a>}
                                    </div>
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 6. Achievements */}
                    {data.achievements?.length > 0 && (
                        <Section title="Achievements">
                            {data.achievements.map((a, i) => (
                                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <strong style={{ fontSize: '9.5pt' }}>{a.title}</strong>
                                        {a.description && <p style={{ fontSize: '8.5pt', color: '#4a4a4a', margin: '2px 0 0' }}>{a.description}</p>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {a.year && <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{a.year}</span>}
                                        {a.url && <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '8.5pt', color: accentColor, textDecoration: 'none' }}>Verify →</a>}
                                    </div>
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 7. Leadership & Extracurricular Activities */}
                    {data.leadership?.length > 0 && (
                        <Section title="Leadership & Extracurricular Activities">
                            {data.leadership.map((l, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <strong style={{ fontSize: '10pt' }}>{l.role}</strong>
                                        <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{l.startDate} – {l.endDate}</span>
                                    </div>
                                    <span style={{ fontSize: '9.5pt', color: accentColor, fontWeight: 600, display: 'block', marginBottom: '3px' }}>{l.organization}</span>
                                    {l.description && (
                                        <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line' }}>
                                            {l.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 8. References (Optional) */}
                    {data.references && (
                        <Section title="References">
                            <p style={{ color: '#4a4a4a', fontSize: '9.5pt', whiteSpace: 'pre-line', margin: 0 }}>
                                {data.references}
                            </p>
                        </Section>
                    )}
                </div>

                {/* Right Column — 35% width */}
                <div style={{ width: '35%' }}>
                    {/* Technical Expertise */}
                    {(data.skillsText || data.skills?.length > 0) && (
                        <Section title="Technical Expertise">
                            <p style={{ fontSize: '9.5pt', color: '#4a4a4a', lineHeight: 1.4, margin: 0 }}>
                                {data.skillsText ? renderSkillsText(data.skillsText, data.boldSkillsHeader) : data.skills?.join(', ')}
                            </p>
                        </Section>
                    )}

                    {/* Languages */}
                    {data.languages?.length > 0 && (
                        <Section title="Languages">
                            <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0 }}>
                                {data.languages.join(', ')}
                            </p>
                        </Section>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.filter(i => i.trim() !== '').length > 0 && (
                        <Section title="Interests">
                            <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0 }}>
                                {data.interests.filter(i => i.trim() !== '').join(', ')}
                            </p>
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
}

// Clean and professional inline SVG icons that inherit the parent's color and align perfectly
const MailIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const LinkedinIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const GithubIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const LeetCodeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const GlobeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const renderSkillsText = (text, boldHeader = false) => {
    if (!text) return null;
    return text.split('\n').map((line, lineIdx) => {
        if (line.includes('**')) {
            const parts = line.split('**');
            return (
                <span key={lineIdx} style={{ display: 'block', minHeight: '1.2em' }}>
                    {parts.map((part, partIdx) => {
                        if (partIdx % 2 === 1) {
                            return <strong key={partIdx} style={{ fontWeight: 800, color: '#1C1C1C' }}>{part}</strong>;
                        }
                        return part;
                    })}
                </span>
            );
        }
        if (boldHeader) {
            const colonIdx = line.indexOf(':');
            if (colonIdx > 0 && colonIdx < line.length - 1) {
                const category = line.slice(0, colonIdx);
                const skillsVal = line.slice(colonIdx);
                return (
                    <span key={lineIdx} style={{ display: 'block', minHeight: '1.2em' }}>
                        <strong style={{ fontWeight: 800, color: '#1C1C1C' }}>{category}</strong>{skillsVal}
                    </span>
                );
            }
        }
        return <span key={lineIdx} style={{ display: 'block', minHeight: '1.2em' }}>{line}</span>;
    });
};
