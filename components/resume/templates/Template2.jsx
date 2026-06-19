export default function Template2({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const isWhite = accentColor === '#FFFFFF' || accentColor === '#ffffff';
    const resolvedAccent = isWhite ? '#1C1C1C' : accentColor;
    const sidebarBg = isWhite ? '#FAFAFA' : accentColor;
    const sidebarText = isWhite ? '#1C1C1C' : '#FFFFFF';
    const sidebarBorder = isWhite ? '1px solid #CBD5E0' : 'none';

    const renderSkillsText = (text, boldHeader = false) => {
        if (!text) return null;
        const boldColor = isWhite ? '#1C1C1C' : '#FFFFFF';
        return text.split('\n').map((line, lineIdx) => {
            if (line.includes('**')) {
                const parts = line.split('**');
                return (
                    <span key={lineIdx} style={{ display: 'block', minHeight: '1.2em' }}>
                        {parts.map((part, partIdx) => {
                            if (partIdx % 2 === 1) {
                                return <strong key={partIdx} style={{ fontWeight: 800, color: boldColor }}>{part}</strong>;
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
                            <strong style={{ fontWeight: 800, color: boldColor }}>{category}</strong>{skillsVal}
                        </span>
                    );
                }
            }
            return <span key={lineIdx} style={{ display: 'block', minHeight: '1.2em' }}>{line}</span>;
        });
    };

    const Section = ({ title, children }) => {
        const isSidebarSec = title === "Skills" || title === "Technical Skills" || title === "Languages" || title === "Interests";
        return (
            <div style={{ marginBottom: '20px' }}>
                {isSidebarSec && !isWhite && (
                    <style>{`
                        .sidebar-section-content p { color: #FFFFFF !important; }
                        .sidebar-section-content p strong { color: #FFFFFF !important; }
                    `}</style>
                )}
                {isSidebarSec && isWhite && (
                    <style>{`
                        .sidebar-section-content p { color: #1C1C1C !important; }
                        .sidebar-section-content p strong { color: #1C1C1C !important; }
                    `}</style>
                )}
                <h3 style={{
                    fontSize: isSidebarSec ? '11px' : '13px',
                    fontWeight: 700,
                    color: isSidebarSec ? sidebarText : resolvedAccent,
                    textTransform: 'uppercase',
                    letterSpacing: isSidebarSec ? '0.1em' : undefined,
                    opacity: isSidebarSec && !isWhite ? 0.7 : undefined,
                    marginBottom: '8px'
                }}>{title}</h3>
                <div className={isSidebarSec ? "sidebar-section-content" : ""}>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <div style={{
            display: 'flex',
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            lineHeight: 1.6
        }}>
            {/* Sidebar */}
            <div style={{ width: '35%', background: sidebarBg, color: sidebarText, padding: '32px 20px', borderRight: sidebarBorder }}>
                {data.showProfilePic !== false && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', margin: '0 auto 16px',
                                border: isWhite ? '2px solid #CBD5E0' : '2px solid rgba(255,255,255,0.5)'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: isWhite ? '#E2E8F0' : 'rgba(255,255,255,0.2)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                            color: isWhite ? '#1C1C1C' : '#fff', fontSize: '24px', fontWeight: 700,
                            border: isWhite ? '2px solid #CBD5E0' : '2px solid rgba(255,255,255,0.5)'
                        }}>
                            {initials}
                        </div>
                    )
                )}

                <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>{pi.name || 'Your Name'}</h1>
                <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '24px', textAlign: 'center', wordBreak: 'break-all' }}>{pi.email}</p>

                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '8px' }}>Contact</h3>
                    {pi.phone && <p style={{ fontSize: '11px', marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><PhoneIcon /> {pi.phone}</p>}
                    {pi.location && <p style={{ fontSize: '11px', marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><MapPinIcon /> {pi.location}</p>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                        {pi.linkedinUrl && (
                            <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LinkedinIcon /> LinkedIn</a>
                        )}
                        {pi.githubUrl && (
                            <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><GithubIcon /> GitHub</a>
                        )}
                        {pi.leetcodeUrl && (
                            <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LeetCodeIcon /> LeetCode</a>
                        )}
                        {pi.portfolioUrl && (
                            <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><GlobeIcon /> Portfolio</a>
                        )}
                    </div>
                </div>

                {(data.skillsText || data.skills?.length > 0) && (
                    <Section title="Technical Skills">
                        <p style={{ fontSize: '10pt', color: '#4a4a4a', lineHeight: 1.4, margin: 0 }}>
                            {data.skillsText ? renderSkillsText(data.skillsText, data.boldSkillsHeader) : data.skills?.join(', ')}
                        </p>
                    </Section>
                )}

                {data.languages?.length > 0 && (
                    <Section title="Languages">
                        <p style={{ fontSize: '11px', margin: 0 }}>
                            {data.languages.join(', ')}
                        </p>
                    </Section>
                )}

                {data.interests && data.interests.filter(i => i.trim() !== '').length > 0 && (
                    <Section title="Interests">
                        <p style={{ fontSize: '11px', margin: 0 }}>
                            {data.interests.filter(i => i.trim() !== '').join(', ')}
                        </p>
                    </Section>
                )}
            </div>

            {/* Main Content */}
            <div style={{ width: '65%', padding: '32px 24px' }}>
                {/* 1. Professional Summary */}
                {data.summary && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Professional Summary</h3>
                        <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>{data.summary}</p>
                    </div>
                )}

                {/* 2. Education */}
                {data.education?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Education</h3>
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '12px' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                    <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startYear} – {e.endYear}</span>
                                </div>
                                <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>
                                    {e.degree}{e.field && ` in ${e.field}`}{e.grade && ` | ${e.gradeType || 'CGPA'}: ${e.grade}`}
                                </p>
                                {e.description && <p style={{ fontSize: '10px', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{e.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. Projects */}
                {data.projects?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Projects</h3>
                        {data.projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                        <strong style={{ fontSize: '12px' }}>{p.title}</strong>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {p.githubUrl && (
                                                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px', color: resolvedAccent, textDecoration: 'none' }}>GitHub</a>
                                            )}
                                            {p.demoUrl && (
                                                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px', color: resolvedAccent, textDecoration: 'none' }}>Live</a>
                                            )}
                                        </div>
                                    </div>
                                    {(p.startDate || p.endDate) && (
                                        <span style={{ fontSize: '10px', color: '#6B6560' }}>
                                            {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                        </span>
                                    )}
                                </div>
                                {p.techStack?.length > 0 && (
                                    <p style={{ fontSize: '10px', color: '#6B6560', fontStyle: 'italic', margin: 0, marginTop: '2px' }}>
                                        {p.techStack.join(', ')}
                                    </p>
                                )}
                                {p.description && (
                                    <p style={{ fontSize: '11px', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0, marginTop: '4px' }}>{p.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 4. Work & Internship Experience */}
                {data.experience?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Work & Internship Experience</h3>
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '12px' }}>{e.role}</strong>
                                    <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                                </div>
                                <p style={{ fontSize: '11px', color: resolvedAccent, margin: '2px 0 4px' }}>{e.company}</p>
                                {e.description && <p style={{ fontSize: '11px', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{e.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* 5. Certifications */}
                {data.certifications?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Certifications</h3>
                        {data.certifications.map((c, i) => (
                            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <strong style={{ fontSize: '11px' }}>{c.title}</strong>
                                    {c.description && <p style={{ fontSize: '10px', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{c.description}</p>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {c.year && <span style={{ fontSize: '10px', color: '#6B6560' }}>{c.year}</span>}
                                    {c.url && (
                                        <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px', color: resolvedAccent, textDecoration: 'none' }}>View →</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 6. Achievements */}
                {data.achievements?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Achievements</h3>
                        {data.achievements.map((a, i) => (
                            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <strong style={{ fontSize: '11px' }}>{a.title}</strong>
                                    {a.description && <p style={{ fontSize: '10px', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{a.description}</p>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {a.year && <span style={{ fontSize: '10px', color: '#6B6560' }}>{a.year}</span>}
                                    {a.url && (
                                        <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px', color: resolvedAccent, textDecoration: 'none' }}>View →</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 7. Leadership & Extracurricular Activities */}
                {data.leadership?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>Leadership & Extracurricular Activities</h3>
                        {data.leadership.map((l, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '12px' }}>{l.role} — {l.organization}</strong>
                                    <span style={{ fontSize: '10px', color: '#6B6560' }}>{l.startDate} – {l.endDate}</span>
                                </div>
                                {l.description && <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0, marginTop: '2px', whiteSpace: 'pre-line' }}>{l.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* 8. References (Optional) */}
                {data.references && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: resolvedAccent, textTransform: 'uppercase', marginBottom: '8px' }}>References</h3>
                        <p style={{ fontSize: '11px', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{data.references}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Clean and professional inline SVG icons that inherit the parent's color and align perfectly
const PhoneIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const LinkedinIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const GithubIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const LeetCodeIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const GlobeIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);


