import { resolveSectionTitle } from '@/lib/resumeUtils';

export default function Template9({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    
    const isWhite = accentColor === '#FFFFFF' || accentColor === '#ffffff';
    // Use a clean professional dark blue/slate or black for primary color when white is selected
    const primaryColor = isWhite ? '#1A365D' : accentColor;

    const SectionHeader = ({ title }) => (
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 12px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: primaryColor }} />
            <span style={{ 
                padding: '0 15px', 
                fontSize: '11pt', 
                fontWeight: 700, 
                color: primaryColor, 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em',
                fontFamily: "'Inter', sans-serif"
            }}>
                {resolveSectionTitle(title, data.atsStandardSectionNames)}
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: primaryColor }} />
        </div>
    );

    const renderBulletPoints = (text) => {
        if (!text) return null;
        const lines = text.split('\n').map(l => l.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
        return (
            <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: '9.5pt', color: '#1C1C1C', lineHeight: 1.4 }}>
                {lines.map((line, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>{line}</li>
                ))}
            </ul>
        );
    };

    const renderSingleSkillsLine = (line, boldHeader = false) => {
        if (!line) return null;
        if (line.includes('**')) {
            const parts = line.split('**');
            return (
                <span>
                    {parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} style={{ fontWeight: 700, color: '#1C1C1C' }}>{part}</strong> : part)}
                </span>
            );
        }
        if (boldHeader) {
            const colonIdx = line.indexOf(':');
            if (colonIdx > 0 && colonIdx < line.length - 1) {
                const category = line.slice(0, colonIdx);
                const skillsVal = line.slice(colonIdx);
                return (
                    <span>
                        <strong style={{ fontWeight: 700, color: '#1C1C1C' }}>{category}</strong>{skillsVal}
                    </span>
                );
            }
        }
        return <span>{line}</span>;
    };

    const getSkillsList = () => {
        if (data.skillsText) {
            return data.skillsText.split('\n').map(l => l.trim()).filter(Boolean);
        }
        return data.skills || [];
    };

    const skills = getSkillsList();

    // Format contact details into a single centered line
    const contactParts = [
        pi.location ? { icon: <MapPinIcon />, text: pi.location } : null,
        pi.phone ? { icon: <PhoneIcon />, text: pi.phone, href: `tel:${pi.phone}` } : null,
        pi.email ? { icon: <MailIcon />, text: pi.email, href: `mailto:${pi.email}` } : null,
        pi.linkedinUrl ? { icon: <LinkedinIcon />, text: pi.linkedinLabel || 'LinkedIn', href: pi.linkedinUrl } : null,
        pi.githubUrl ? { icon: <GithubIcon />, text: pi.githubLabel || 'GitHub', href: pi.githubUrl } : null,
        pi.portfolioUrl ? { icon: <GlobeIcon />, text: pi.portfolioLabel || 'Portfolio', href: pi.portfolioUrl } : null
    ].filter(Boolean);

    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            padding: '40px 50px',
            boxSizing: 'border-box',
            margin: '0 auto',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                {data.showProfilePic === true && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', margin: '0 auto 12px',
                                border: `2px solid ${primaryColor}`
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: primaryColor, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                            color: '#fff', fontSize: '22px', fontWeight: 700
                        }}>
                            {initials}
                        </div>
                    )
                )}
                <h1 style={{
                    fontSize: '24pt',
                    fontWeight: 700,
                    color: primaryColor,
                    textTransform: 'uppercase',
                    margin: '0 0 8px',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1
                }}>
                    {pi.name || 'YOUR NAME'}
                </h1>
                <div style={{
                    fontSize: '9.5pt',
                    color: '#4A5568',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px 12px'
                }}>
                    {contactParts.map((link, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                            {link.href ? (
                                <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                    {link.icon}
                                    {link.text}
                                </a>
                            ) : (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                    {link.icon}
                                    {link.text}
                                </span>
                            )}
                            {idx < contactParts.length - 1 && <span style={{ marginLeft: '12px', color: '#A0AEC0' }}>|</span>}
                        </span>
                    ))}
                </div>
            </div>

            {/* 1. Summary Statement */}
            {data.summary && (
                <div>
                    <SectionHeader title="Summary Statement" />
                    <p style={{ fontSize: '9.5pt', color: '#1C1C1C', lineHeight: 1.5, margin: 0, textAlign: 'justify' }}>
                        {data.summary}
                    </p>
                </div>
            )}

            {/* 2. Core Qualifications / Skills */}
            {skills.length > 0 && (
                <div>
                    <SectionHeader title="Core Qualifications" />
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '6px 20px', 
                        fontSize: '9.5pt', 
                        color: '#1C1C1C',
                        paddingLeft: '10px'
                    }}>
                        {skills.map((skill, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ color: primaryColor, fontSize: '11pt', lineHeight: 1 }}>•</span>
                                <span>{renderSingleSkillsLine(skill, data.boldSkillsHeader)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. Work Experience */}
            {data.experience?.length > 0 && (
                <div>
                    <SectionHeader title="Work Experience" />
                    {data.experience.map((e, idx) => (
                        <div key={idx} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '10pt', color: '#1A202C' }}>{e.role}</strong>
                                <span style={{ fontSize: '9pt', color: '#4A5568', fontWeight: 600 }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                            </div>
                            <div style={{ fontSize: '9.5pt', color: '#4A5568', marginBottom: '4px', fontStyle: 'italic' }}>
                                {e.company}
                            </div>
                            {renderBulletPoints(e.description)}
                        </div>
                    ))}
                </div>
            )}

            {/* 4. Projects */}
            {data.projects?.length > 0 && (
                <div>
                    <SectionHeader title="Projects" />
                    {data.projects.map((p, idx) => (
                        <div key={idx} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                <strong style={{ fontSize: '10pt', color: '#1A202C' }}>
                                    {p.title}
                                </strong>
                                {(p.startDate || p.endDate) && (
                                    <span style={{ fontSize: '9pt', color: '#4A5568', fontWeight: 600 }}>
                                        {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                    </span>
                                )}
                            </div>
                            {(p.githubUrl || p.demoUrl) && (
                                <div style={{ fontSize: '9pt', marginBottom: '4px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {p.githubUrl && (
                                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>
                                            {data.atsProjectLinksFormat ? p.githubLabel : 'GitHub'}
                                        </a>
                                    )}
                                    {p.githubUrl && p.demoUrl && <span style={{ color: '#CBD5E0' }}>|</span>}
                                    {p.demoUrl && (
                                        <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>
                                            {data.atsProjectLinksFormat ? p.demoLabel : 'Live Demo'}
                                        </a>
                                    )}
                                </div>
                            )}
                            {p.techStack?.length > 0 && (
                                <div style={{ fontSize: '8.5pt', color: '#718096', fontStyle: 'italic', marginBottom: '4px' }}>
                                    Technologies: {p.techStack.join(', ')}
                                </div>
                            )}
                            {renderBulletPoints(p.description)}
                        </div>
                    ))}
                </div>
            )}

            {/* 5. Education */}
            {data.education?.length > 0 && (
                <div>
                    <SectionHeader title="Education" />
                    {data.education.map((e, idx) => (
                        <div key={idx} style={{ marginBottom: '12px' }}>
                            <strong style={{ fontSize: '10pt', color: '#1A202C', display: 'block', marginBottom: '2px' }}>
                                {e.degree}{e.field && ` in ${e.field}`}
                            </strong>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5pt', color: '#4A5568' }}>
                                <span>{e.institution}{e.university && `, ${e.university}`}</span>
                                <span style={{ fontSize: '9pt', fontWeight: 600 }}>{e.startYear} – {e.endYear}</span>
                            </div>
                            {e.grade && (
                                <div style={{ fontSize: '9pt', color: '#718096', marginTop: '1px' }}>
                                    {e.gradeType || 'CGPA'}: {e.grade}
                                </div>
                            )}
                            {e.description && (
                                <p style={{ fontSize: '9pt', color: '#4A5568', margin: '4px 0 0' }}>
                                    {e.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 6. Certifications */}
            {data.certifications?.length > 0 && (
                <div>
                    <SectionHeader title="Certifications" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9.5pt' }}>
                        {data.certifications.map((c, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ color: '#1A202C' }}>
                                    • <strong>{c.title}</strong>{c.description && ` — ${c.description}`}
                                    {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '6px', fontSize: '8.5pt' }}>Verify →</a>}
                                </span>
                                {c.year && <span style={{ fontSize: '8.5pt', color: '#718096' }}>{c.year}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 7. Achievements */}
            {data.achievements?.length > 0 && (
                <div>
                    <SectionHeader title="Achievements" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9.5pt' }}>
                        {data.achievements.map((a, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ color: '#1C1C1C' }}>
                                    • <strong>{a.title}</strong>{a.description && `: ${a.description}`}
                                    {a.url && <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '6px', fontSize: '8.5pt' }}>View →</a>}
                                </span>
                                {a.year && <span style={{ fontSize: '8.5pt', color: '#718096' }}>{a.year}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 8. Leadership */}
            {data.leadership?.length > 0 && (
                <div>
                    <SectionHeader title="Leadership" />
                    {data.leadership.map((l, idx) => (
                        <div key={idx} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '9.5pt', color: '#1A202C' }}>{l.role} — {l.organization}</strong>
                                <span style={{ fontSize: '9pt', color: '#4A5568' }}>{l.startDate} – {l.endDate}</span>
                            </div>
                            {l.description && <p style={{ fontSize: '9pt', color: '#4A5568', margin: '2px 0 0' }}>{l.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* 9. Languages & Interests */}
            {(data.languages?.length > 0 || (data.interests && data.interests.filter(i => i.trim() !== '').length > 0)) && (
                <div>
                    <SectionHeader title="Additional Information" />
                    <div style={{ fontSize: '9.5pt', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {data.languages?.length > 0 && (
                            <div>
                                <strong>Languages: </strong>{data.languages.join(', ')}
                            </div>
                        )}
                        {data.interests && data.interests.filter(i => i.trim() !== '').length > 0 && (
                            <div>
                                <strong>Interests: </strong>{data.interests.filter(i => i.trim() !== '').join(', ')}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 10. References */}
            {data.references && (
                <div>
                    <SectionHeader title="References" />
                    <p style={{ fontSize: '9.5pt', color: '#4A5568', whiteSpace: 'pre-line', margin: 0 }}>
                        {data.references}
                    </p>
                </div>
            )}
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
