export default function Template11({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    
    const isWhite = accentColor === '#FFFFFF' || accentColor === '#ffffff';
    const primaryColor = isWhite ? '#1C1C1C' : accentColor;

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '16px' }}>
            <h3 style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#1C1C1C',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '0 0 2px',
                fontFamily: "'Inter', sans-serif"
            }}>
                {title}
            </h3>
            <div style={{ height: '1.5px', backgroundColor: primaryColor, marginBottom: '10px' }} />
            {children}
        </div>
    );

    const renderBulletPoints = (text) => {
        if (!text) return null;
        const lines = text.split('\n').map(l => l.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
        return (
            <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: '9.5pt', color: '#2D3748', lineHeight: 1.4 }}>
                {lines.map((line, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>{line}</li>
                ))}
            </ul>
        );
    };

    const renderSkillsText = (text, boldHeader = false) => {
        if (!text) return null;
        return text.split('\n').map((line, idx) => {
            if (line.includes('**')) {
                const parts = line.split('**');
                return (
                    <div key={idx} style={{ fontSize: '9.5pt', marginBottom: '4px', color: '#2D3748', lineHeight: 1.4 }}>
                        {parts.map((part, partIdx) => partIdx % 2 === 1 ? <strong key={partIdx} style={{ fontWeight: 700, color: '#1C1C1C' }}>{part}</strong> : part)}
                    </div>
                );
            }
            if (boldHeader) {
                const colonIdx = line.indexOf(':');
                if (colonIdx > 0 && colonIdx < line.length - 1) {
                    const category = line.slice(0, colonIdx);
                    const skillsVal = line.slice(colonIdx);
                    return (
                        <div key={idx} style={{ fontSize: '9.5pt', marginBottom: '4px', color: '#2D3748', lineHeight: 1.4 }}>
                            <strong style={{ fontWeight: 700, color: '#1C1C1C' }}>{category}</strong>{skillsVal}
                        </div>
                    );
                }
            }
            return (
                <div key={idx} style={{ fontSize: '9.5pt', marginBottom: '4px', color: '#2D3748', lineHeight: 1.4 }}>
                    {line}
                </div>
            );
        });
    };

    // Format contact links into a single line
    const contactLinks = [
        pi.phone ? { text: pi.phone, href: `tel:${pi.phone}` } : null,
        pi.email ? { text: pi.email, href: `mailto:${pi.email}` } : null,
        pi.linkedinUrl ? { text: 'LinkedIn', href: pi.linkedinUrl } : null,
        pi.githubUrl ? { text: 'GitHub', href: pi.githubUrl } : null,
        pi.leetcodeUrl ? { text: 'LeetCode', href: pi.leetcodeUrl } : null,
        pi.portfolioUrl ? { text: 'Portfolio', href: pi.portfolioUrl } : null
    ].filter(Boolean);

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            padding: '50px 50px',
            boxSizing: 'border-box',
            margin: '0 auto',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{
                    fontSize: '26pt',
                    fontWeight: 700,
                    color: '#1C1C1C',
                    margin: '0 0 6px',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1
                }}>
                    {pi.name || 'Your Name'}
                </h1>
                <div style={{
                    fontSize: '9pt',
                    color: '#4A5568',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px 12px'
                }}>
                    {contactLinks.map((link, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>
                            {idx > 0 && <span style={{ margin: '0 8px 0 0', color: '#CBD5E0' }}>|</span>}
                            {link.href ? (
                                <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {link.text}
                                </a>
                            ) : (
                                link.text
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* 1. Summary */}
            {data.summary && (
                <Section title="Summary">
                    <p style={{ fontSize: '9.5pt', color: '#2D3748', lineHeight: 1.5, margin: 0, textAlign: 'justify' }}>
                        {data.summary}
                    </p>
                </Section>
            )}

            {/* 2. Technical Skills */}
            {(data.skillsText || data.skills?.length > 0) && (
                <Section title="Technical Skills">
                    {data.skillsText ? (
                        renderSkillsText(data.skillsText, data.boldSkillsHeader)
                    ) : (
                        <div style={{ fontSize: '9.5pt', color: '#2D3748' }}>
                            {data.skills.join(', ')}
                        </div>
                    )}
                </Section>
            )}

            {/* 3. Projects */}
            {data.projects?.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((p, idx) => (
                        <div key={idx} style={{ marginBottom: idx < data.projects.length - 1 ? '12px' : 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '10pt', color: '#1C1C1C' }}>{p.title}</strong>
                                <span style={{ fontSize: '9pt', fontWeight: 600, color: '#1C1C1C' }}>
                                    {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                <span style={{ fontSize: '9pt', color: '#4A5568', fontStyle: 'italic' }}>
                                    {p.techStack?.length > 0 ? p.techStack.join(', ') : 'Personal Project'}
                                </span>
                                <span style={{ fontSize: '8.5pt' }}>
                                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginRight: '8px' }}>[GitHub]</a>}
                                    {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>[Live]</a>}
                                </span>
                            </div>
                            {renderBulletPoints(p.description)}
                        </div>
                    ))}
                </Section>
            )}

            {/* 4. Experience */}
            {data.experience?.length > 0 && (
                <Section title="Experience">
                    {data.experience.map((e, idx) => (
                        <div key={idx} style={{ marginBottom: idx < data.experience.length - 1 ? '12px' : 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '10pt', color: '#1C1C1C' }}>{e.role}</strong>
                                <span style={{ fontSize: '9pt', fontWeight: 600, color: '#1C1C1C' }}>
                                    {e.startDate} – {e.current ? 'Present' : e.endDate}
                                </span>
                            </div>
                            <div style={{ fontSize: '9.5pt', color: '#4A5568', fontStyle: 'italic', marginBottom: '2px' }}>
                                {e.company}
                            </div>
                            {renderBulletPoints(e.description)}
                        </div>
                    ))}
                </Section>
            )}

            {/* 5. Education */}
            {data.education?.length > 0 && (
                <Section title="Education">
                    {data.education.map((e, idx) => (
                        <div key={idx} style={{ marginBottom: idx < data.education.length - 1 ? '10px' : 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '10pt', color: '#1C1C1C' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                <span style={{ fontSize: '9pt', fontWeight: 600, color: '#1C1C1C' }}>
                                    {e.startYear} – {e.endYear}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ fontSize: '9.5pt', color: '#4A5568' }}>
                                    {e.degree}{e.field && ` in ${e.field}`}
                                </span>
                                {e.grade && (
                                    <span style={{ fontSize: '9pt', color: '#718096' }}>
                                        {e.gradeType || 'CGPA'}: {e.grade}
                                    </span>
                                )}
                            </div>
                            {e.description && <p style={{ fontSize: '9pt', color: '#4A5568', margin: '2px 0 0' }}>{e.description}</p>}
                        </div>
                    ))}
                </Section>
            )}

            {/* 6. Certifications */}
            {data.certifications?.length > 0 && (
                <Section title="Certifications">
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '9.5pt', color: '#2D3748', lineHeight: 1.4 }}>
                        {data.certifications.map((c, idx) => (
                            <li key={idx} style={{ marginBottom: '3px' }}>
                                <strong>{c.title}</strong>{c.description && ` — ${c.description}`} {c.year && `(${c.year})`}
                                {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '6px' }}>View →</a>}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {/* 7. Achievements */}
            {data.achievements?.length > 0 && (
                <Section title="Achievements">
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '9.5pt', color: '#2D3748', lineHeight: 1.4 }}>
                        {data.achievements.map((a, idx) => (
                            <li key={idx} style={{ marginBottom: '3px' }}>
                                <strong>{a.title}</strong>{a.description && `: ${a.description}`} {a.year && `(${a.year})`}
                                {a.url && <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '6px' }}>View →</a>}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {/* 8. Leadership */}
            {data.leadership?.length > 0 && (
                <Section title="Leadership">
                    {data.leadership.map((l, idx) => (
                        <div key={idx} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '9.5pt', color: '#1C1C1C' }}>{l.role} — {l.organization}</strong>
                                <span style={{ fontSize: '9pt', color: '#4A5568' }}>{l.startDate} – {l.endDate}</span>
                            </div>
                            {l.description && <p style={{ fontSize: '9pt', color: '#4A5568', margin: '2px 0 0' }}>{l.description}</p>}
                        </div>
                    ))}
                </Section>
            )}

            {/* 9. Languages & Interests */}
            {(data.languages?.length > 0 || (data.interests && data.interests.filter(i => i.trim() !== '').length > 0)) && (
                <Section title="Additional Information">
                    {data.languages?.length > 0 && (
                        <div style={{ fontSize: '9.5pt', color: '#2D3748', marginBottom: '2px' }}>
                            <strong>Languages: </strong>{data.languages.join(', ')}
                        </div>
                    )}
                    {data.interests && data.interests.filter(i => i.trim() !== '').length > 0 && (
                        <div style={{ fontSize: '9.5pt', color: '#2D3748' }}>
                            <strong>Interests: </strong>{data.interests.filter(i => i.trim() !== '').join(', ')}
                        </div>
                    )}
                </Section>
            )}

            {/* 10. References */}
            {data.references && (
                <Section title="References">
                    <p style={{ fontSize: '9.5pt', color: '#4A5568', whiteSpace: 'pre-line', margin: 0 }}>
                        {data.references}
                    </p>
                </Section>
            )}
        </div>
    );
}
