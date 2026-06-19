export default function Template10({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    
    const isWhite = accentColor === '#FFFFFF' || accentColor === '#ffffff';
    const primaryColor = isWhite ? '#1C1C1C' : accentColor;

    const Section = ({ title, children, isLast }) => (
        <div style={{ marginBottom: '16px' }}>
            <h3 style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: primaryColor,
                marginBottom: '8px',
                fontFamily: "'Inter', sans-serif"
            }}>
                {title}
            </h3>
            <div style={{ 
                paddingBottom: '12px', 
                borderBottom: isLast ? 'none' : `1px solid ${isWhite ? '#E2E8F0' : 'rgba(0, 0, 0, 0.15)'}` 
            }}>
                {children}
            </div>
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

    // Format contact info into a single line
    const contactInfo = [
        pi.phone,
        pi.email,
        pi.linkedinUrl ? 'LinkedIn' : null,
        pi.githubUrl ? 'GitHub' : null,
        pi.portfolioUrl ? 'Portfolio' : null
    ].filter(Boolean);

    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

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
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
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
                    fontSize: '22pt',
                    fontWeight: 700,
                    color: '#1C1C1C',
                    margin: '0 0 4px',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1
                }}>
                    {pi.name || 'Your Name'}
                </h1>
                {pi.location && (
                    <div style={{ fontSize: '9.5pt', color: '#4A5568', marginBottom: '4px' }}>
                        {pi.location}
                    </div>
                )}
                <div style={{
                    fontSize: '9.5pt',
                    color: '#4A5568',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px 12px'
                }}>
                    {contactInfo.map((part, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>
                            {idx > 0 && <span style={{ margin: '0 8px 0 0', color: '#CBD5E0' }}>|</span>}
                            {part === 'LinkedIn' ? (
                                <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                            ) : part === 'GitHub' ? (
                                <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                            ) : part === 'Portfolio' ? (
                                <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</a>
                            ) : (
                                part
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Separator under Header */}
            <div style={{ borderBottom: `1.5px solid ${primaryColor}`, marginBottom: '20px' }} />

            {/* 1. Professional Summary */}
            {data.summary && (
                <Section title="Professional Summary">
                    <p style={{ fontSize: '9.5pt', color: '#2D3748', lineHeight: 1.5, margin: 0 }}>
                        {data.summary}
                    </p>
                </Section>
            )}

            {/* 2. Education */}
            {data.education?.length > 0 && (
                <Section title="Education">
                    {data.education.map((e, idx) => (
                        <div key={idx} style={{ marginBottom: idx < data.education.length - 1 ? '10px' : 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '10pt', color: '#1A202C' }}>
                                {e.degree}{e.field && ` in ${e.field}`}
                            </div>
                            <div style={{ fontSize: '9.5pt', color: '#4A5568', marginTop: '1px' }}>
                                {e.institution}{e.university && `, ${e.university}`} | Graduated: {e.endYear || 'N/A'}
                            </div>
                            {e.grade && (
                                <div style={{ fontSize: '9.5pt', color: '#4A5568', marginTop: '1px' }}>
                                    Scored {e.grade} ({e.gradeType || 'CGPA'})
                                </div>
                            )}
                            {e.description && (
                                <p style={{ fontSize: '9pt', color: '#4A5568', margin: '4px 0 0' }}>{e.description}</p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 3. Skills */}
            {skills.length > 0 && (
                <Section title="Skills">
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '9.5pt', color: '#2D3748', lineHeight: 1.4 }}>
                        {skills.map((skill, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>
                                {renderSingleSkillsLine(skill, data.boldSkillsHeader)}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {/* 4. Experience */}
            {data.experience?.length > 0 && (
                <Section title="Experience">
                    {data.experience.map((e, idx) => (
                        <div key={idx} style={{ marginBottom: idx < data.experience.length - 1 ? '14px' : 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '10pt', color: '#1A202C' }}>
                                {e.role}, {e.company}
                            </div>
                            <div style={{ fontSize: '9pt', color: '#718096', marginBottom: '4px' }}>
                                {e.startDate} – {e.current ? 'Present' : e.endDate}
                            </div>
                            {renderBulletPoints(e.description)}
                        </div>
                    ))}
                </Section>
            )}

            {/* 5. Projects */}
            {data.projects?.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((p, idx) => (
                        <div key={idx} style={{ marginBottom: idx < data.projects.length - 1 ? '14px' : 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '10pt', color: '#1A202C' }}>
                                {p.title}
                                {p.techStack?.length > 0 && ` (${p.techStack.join(', ')})`}
                            </div>
                            <div style={{ fontSize: '9pt', color: '#718096', marginBottom: '4px' }}>
                                {p.startDate} – {p.endDate}
                                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '10px' }}>[GitHub]</a>}
                                {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '8px' }}>[Demo]</a>}
                            </div>
                            {renderBulletPoints(p.description)}
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
                <Section title="Leadership & Extracurriculars">
                    {data.leadership.map((l, idx) => (
                        <div key={idx} style={{ marginBottom: '8px' }}>
                            <div style={{ fontWeight: 600, fontSize: '9.5pt', color: '#1A202C' }}>
                                {l.role} — {l.organization}
                            </div>
                            <div style={{ fontSize: '8.5pt', color: '#718096', marginBottom: '2px' }}>
                                {l.startDate} – {l.endDate}
                            </div>
                            {l.description && <p style={{ fontSize: '9pt', color: '#4A5568', margin: 0 }}>{l.description}</p>}
                        </div>
                    ))}
                </Section>
            )}

            {/* 9. Languages & Interests */}
            {(data.languages?.length > 0 || (data.interests && data.interests.filter(i => i.trim() !== '').length > 0)) && (
                <Section title="Additional Information" isLast={!data.references}>
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
                <Section title="References" isLast={true}>
                    <p style={{ fontSize: '9.5pt', color: '#4A5568', whiteSpace: 'pre-line', margin: 0 }}>
                        {data.references}
                    </p>
                </Section>
            )}
        </div>
    );
}
