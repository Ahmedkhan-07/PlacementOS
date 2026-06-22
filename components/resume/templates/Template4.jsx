import { resolveSectionTitle } from '@/lib/resumeUtils';

export default function Template4({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const isWhite = accentColor === '#FFFFFF' || accentColor === '#ffffff';
    const resolvedAccent = isWhite ? '#1C1C1C' : accentColor;
    const headerBg = isWhite ? '#FFFFFF' : accentColor;
    const headerText = isWhite ? '#1C1C1C' : '#FFFFFF';
    const headerBorder = isWhite ? '1px solid #E2E8F0' : 'none';

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', borderBottom: '1px solid #E8E0D4', paddingBottom: '4px' }}>{resolveSectionTitle(title, data.atsStandardSectionNames)}</h3>
            {children}
        </div>
    );

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            lineHeight: 1.6
        }}>
            {/* Bold Header Banner */}
            <div style={{ background: headerBg, padding: '32px 40px', color: headerText, textAlign: 'center', borderBottom: headerBorder }}>
                {data.showProfilePic !== false && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', margin: '0 auto 12px',
                                border: isWhite ? '2px solid #CBD5E0' : '2px solid rgba(255,255,255,0.5)'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: isWhite ? '#E2E8F0' : 'rgba(255,255,255,0.2)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                            color: isWhite ? '#1C1C1C' : '#fff', fontSize: '22px', fontWeight: 700,
                            border: isWhite ? '2px solid #CBD5E0' : '2px solid rgba(255,255,255,0.5)'
                        }}>
                            {initials}
                        </div>
                    )
                )}

                <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px' }}>{pi.name || 'Your Name'}</h1>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                    gap: '6px 16px', fontSize: '12.5px', opacity: 0.85, marginBottom: '6px'
                }}>
                    {pi.email && (
                        <a href={`mailto:${pi.email}`} style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <MailIcon /> {pi.email}
                        </a>
                    )}
                    {pi.phone && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <PhoneIcon /> {pi.phone}
                        </span>
                    )}
                    {pi.location && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <MapPinIcon /> {pi.location}
                        </span>
                    )}
                </div>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                    gap: '6px 14px', fontSize: '11px', opacity: 0.7, margin: 0
                }}>
                    {pi.linkedinUrl && (
                        <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <LinkedinIcon /> {pi.linkedinLabel || 'LinkedIn'}
                        </a>
                    )}
                    {pi.githubUrl && (
                        <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <GithubIcon /> {pi.githubLabel || 'GitHub'}
                        </a>
                    )}
                    {pi.leetcodeUrl && (
                        <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <LeetCodeIcon /> {pi.leetcodeLabel || 'LeetCode'}
                        </a>
                    )}
                    {pi.portfolioUrl && (
                        <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <GlobeIcon /> {pi.portfolioLabel || 'Portfolio'}
                        </a>
                    )}
                </div>
            </div>

            <div style={{ padding: '28px 40px' }}>
                {/* 1. Professional Summary */}
                {data.summary && (
                    <Section title="Professional Summary">
                        <p style={{ fontSize: '12px', color: '#4a4a4a', margin: 0 }}>{data.summary}</p>
                    </Section>
                )}

                {/* 2. Education */}
                {data.education?.length > 0 && (
                    <Section title="Education">
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '12px' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                    <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startYear} – {e.endYear}</span>
                                </div>
                                <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>
                                    {e.degree} {e.field && `in ${e.field}`} {e.grade && `| ${e.gradeType || 'CGPA'}: ${e.grade}`}
                                </p>
                                {e.description && <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{e.description}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {/* 3. Technical Skills */}
                {(data.skillsText || data.skills?.length > 0) && (
                    <Section title="Technical Skills">
                        <p style={{ fontSize: '10pt', color: '#4a4a4a', lineHeight: 1.4, margin: 0 }}>
                            {data.skillsText ? renderSkillsText(data.skillsText, data.boldSkillsHeader) : data.skills?.join(', ')}
                        </p>
                    </Section>
                )}

                {/* 4. Projects */}
                {data.projects?.length > 0 && (
                    <Section title="Projects">
                        {data.projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '11pt' }}>{p.title}</strong>
                                    {(p.startDate || p.endDate) && (
                                        <span style={{ fontSize: '9pt', color: '#6B6560' }}>
                                            {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                        </span>
                                    )}
                                </div>
                                {(p.githubUrl || p.demoUrl) && (
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '2px', flexWrap: 'wrap', alignItems: 'center' }}>
                                        {p.githubUrl && (
                                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: resolvedAccent, textDecoration: 'none' }}>{p.githubLabel || 'GitHub'}</a>
                                        )}
                                        {p.githubUrl && p.demoUrl && <span style={{ color: '#CBD5E0', fontSize: '9pt' }}>|</span>}
                                        {p.demoUrl && (
                                            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: resolvedAccent, textDecoration: 'none' }}>{p.demoLabel || 'Live'}</a>
                                        )}
                                    </div>
                                )}
                                {p.techStack?.length > 0 && (
                                    <p style={{ fontSize: '9pt', color: '#6B6560', fontStyle: 'italic', margin: 0, marginTop: '2px', marginBottom: '2px' }}>
                                        {p.techStack.join(', ')}
                                    </p>
                                )}
                                {p.description && (
                                    <p style={{ fontSize: '10pt', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0, marginTop: '4px' }}>{p.description}</p>
                                )}
                            </div>
                        ))}
                    </Section>
                )}

                {/* 5. Work & Internship Experience */}
                {data.experience?.length > 0 && (
                    <Section title="Work & Internship Experience">
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '12px' }}>{e.role}</strong>
                                    <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                                </div>
                                <p style={{ fontSize: '11px', color: resolvedAccent, margin: '2px 0 4px' }}>at {e.company}</p>
                                {e.description && <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line' }}>{e.description}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {/* 6. Certifications */}
                {data.certifications?.length > 0 && (
                    <Section title="Certifications">
                        {data.certifications.map((c, i) => (
                            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <strong style={{ fontSize: '10pt' }}>{c.title}</strong>
                                    {c.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{c.description}</p>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {c.year && <span style={{ fontSize: '9pt', color: '#6B6560' }}>{c.year}</span>}
                                    {c.url && (
                                        <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: resolvedAccent, textDecoration: 'none' }}>Verify →</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Section>
                )}

                {/* 7. Achievements */}
                {data.achievements?.length > 0 && (
                    <Section title="Achievements">
                        {data.achievements.map((a, i) => (
                            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <strong style={{ fontSize: '10pt' }}>{a.title}</strong>
                                    {a.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{a.description}</p>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {a.year && <span style={{ fontSize: '9pt', color: '#6B6560' }}>{a.year}</span>}
                                    {a.url && (
                                        <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: resolvedAccent, textDecoration: 'none' }}>View →</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Section>
                )}

                {/* 8. Leadership & Extracurricular Activities */}
                {data.leadership?.length > 0 && (
                    <Section title="Leadership & Extracurricular Activities">
                        {data.leadership.map((l, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '11pt' }}>{l.role} — {l.organization}</strong>
                                    <span style={{ fontSize: '9pt', color: '#6B6560' }}>{l.startDate} – {l.endDate}</span>
                                </div>
                                {l.description && <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0, marginTop: '2px', whiteSpace: 'pre-line' }}>{l.description}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {/* 9. Languages */}
                {data.languages?.length > 0 && (
                    <Section title="Languages">
                        <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>{data.languages.join(', ')}</p>
                    </Section>
                )}

                {/* 10. Interests */}
                {data.interests && data.interests.filter(i => i.trim() !== '').length > 0 && (
                    <Section title="Interests">
                        <p style={{ fontSize: '12px', color: '#4a4a4a', margin: 0 }}>{data.interests.filter(i => i.trim() !== '').join(' · ')}</p>
                    </Section>
                )}

                {/* 11. References (Optional) */}
                {data.references && (
                    <Section title="References">
                        <p style={{ fontSize: '11px', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{data.references}</p>
                    </Section>
                )}
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
