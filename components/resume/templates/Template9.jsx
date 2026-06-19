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
                {title}
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
        pi.location,
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
                    {contactParts.map((part, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>
                            {idx > 0 && <span style={{ margin: '0 10px 0 2px', color: '#A0AEC0' }}>|</span>}
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
                                    {(p.githubUrl || p.demoUrl) && (
                                        <span style={{ fontSize: '8.5pt', fontWeight: 400, marginLeft: '10px' }}>
                                            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginRight: '8px' }}>[GitHub]</a>}
                                            {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>[Live Demo]</a>}
                                        </span>
                                    )}
                                </strong>
                                {(p.startDate || p.endDate) && (
                                    <span style={{ fontSize: '9pt', color: '#4A5568', fontWeight: 600 }}>
                                        {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                    </span>
                                )}
                            </div>
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
                                    {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, textDecoration: 'none', marginLeft: '6px', fontSize: '8.5pt' }}>View →</a>}
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
