'use client';

import { useState } from 'react';
import ProfileHero from '@/components/dashboard/ProfileHero';
import ResumePreview from '@/components/resume/ResumePreview';
import DownloadResumeButton from '@/components/resume/DownloadResumeButton';
import SocialLinks from '@/components/dashboard/SocialLinks';


export default function PublicPortfolioClient({ user, resume, projects = [], certificates = [], achievements = [] }) {
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);
    const [selectedAch, setSelectedAch] = useState(null);

    return (
        <main style={{ position: 'relative', zIndex: 1 }}>
            {/* Navbar - minimal */}
            <nav className="glass-navbar fixed top-0 left-0 right-0 z-50" style={{ padding: '14px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2D6A4F' }}>
                            PlacementOS
                        </span>
                    </a>
                </div>
            </nav>

            {/* Profile Hero — no edit button */}
            <div style={{ paddingTop: '70px' }}>
                <ProfileHero user={user} />
            </div>

            {/* Resume Section — simplified, no builder */}
            {resume && (
                <section style={{
                    padding: '80px 40px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative', zIndex: 1,
                }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '34px', fontWeight: 700,
                        color: '#1C1C1C', marginBottom: '32px',
                    }}>
                        Resume
                    </h2>

                    <div
                        onClick={() => setShowResumeModal(true)}
                        style={{
                            cursor: 'pointer',
                            width: '280px', minHeight: '396px',
                            background: '#FFFFFF', borderRadius: '8px',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
                            overflow: 'hidden',
                            transform: 'scale(0.55)',
                            transformOrigin: 'top center',
                            marginBottom: '-120px',
                        }}
                    >
                        <ResumePreview
                            data={resume}
                            templateId={resume.templateId || 1}
                            accentColor={resume.accentColor || '#2D6A4F'}
                            compact
                        />
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <DownloadResumeButton username={user.username} />
                    </div>

                    {/* Hidden PDF container */}
                    <div id="resume-pdf-container" style={{ position: 'absolute', left: '-9999px', top: 0, width: '794px' }}>
                        <ResumePreview
                            data={resume}
                            templateId={resume.templateId || 1}
                            accentColor={resume.accentColor || '#2D6A4F'}
                        />
                    </div>
                </section>
            )}

            {/* Resume Preview Modal */}
            {showResumeModal && resume && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 60,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
                }} onClick={() => setShowResumeModal(false)}>
                    <div onClick={e => e.stopPropagation()} style={{
                        background: '#FFFFFF', borderRadius: '16px', maxWidth: '800px', width: '100%',
                        maxHeight: '90vh', overflow: 'auto', padding: '24px', position: 'relative',
                    }}>
                        <button onClick={() => setShowResumeModal(false)} className="btn-icon" style={{ position: 'absolute', top: '12px', right: '12px' }}>×</button>
                        <ResumePreview
                            data={resume}
                            templateId={resume.templateId || 1}
                            accentColor={resume.accentColor || '#2D6A4F'}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <DownloadResumeButton username={user.username} />
                        </div>
                    </div>
                </div>
            )}

            {/* Projects — read-only train */}
            {projects.length > 0 && (
                <section style={{ padding: '80px 40px 100px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '34px', fontWeight: 700, color: '#1C1C1C',
                        maxWidth: '1100px', margin: '0 auto 40px',
                    }}>
                        Projects
                    </h2>
                    <div style={{ position: 'relative', paddingBottom: '30px' }}>
                        <div style={{ position: 'absolute', bottom: '18px', left: 0, right: 0, height: '5px', background: '#5a4a3a', borderRadius: '3px' }} />
                        <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, height: '5px', background: '#5a4a3a', borderRadius: '3px' }} />
                        <div style={{
                            display: 'flex', alignItems: 'flex-end', width: 'max-content',
                            animation: `scroll-left ${Math.max(20, projects.length * 6)}s linear infinite`,
                            paddingBottom: '16px',
                        }}>
                            {projects.map((p, i) => (
                                <div key={p._id} style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
                                    <div
                                        onClick={() => setSelectedProject(p)}
                                        style={{
                                            width: '230px', height: '150px',
                                            background: '#FFFFFF', borderRadius: '14px 14px 8px 8px',
                                            border: '2px solid #C9A23A', cursor: 'pointer',
                                            overflow: 'hidden', position: 'relative',
                                        }}
                                    >
                                        <div style={{ height: '7px', background: 'linear-gradient(90deg, #C9A23A, #F0C96B, #C9A23A)' }} />
                                        <div style={{ padding: '12px 14px', textAlign: 'center' }}>
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '50%',
                                                background: 'rgba(45,106,79,0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                margin: '0 auto 8px', fontSize: '18px',
                                            }}>📦</div>
                                            <p style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: '15px', fontWeight: 700, color: '#2D6A4F',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            }}>{p.title}</p>
                                        </div>
                                    </div>
                                    <div style={{ width: '14px', height: '5px', background: '#666', borderRadius: '3px', alignSelf: 'center', marginBottom: '4px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Project Detail Overlay */}
            {selectedProject && (
                <>
                    <div className="overlay active" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setSelectedProject(null)} />
                    <div className="slide-panel-up open">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
                            <div style={{ width: '48px', height: '5px', background: '#E8E0D4', borderRadius: '3px' }} />
                        </div>
                        <div style={{ height: '4px', background: 'linear-gradient(90deg, #C9A23A, #2D6A4F, #C9A23A)', margin: '8px 0 0' }} />
                        <button onClick={() => setSelectedProject(null)} className="btn-icon" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>×</button>
                        <div style={{ display: 'flex', gap: '32px', padding: '24px 40px', height: 'calc(100% - 40px)', overflow: 'auto', flexWrap: 'wrap' }}>
                            <div style={{ flex: '0 0 40%', minWidth: '250px' }}>
                                {selectedProject.imageUrl ? (
                                    <img src={selectedProject.imageUrl} alt={selectedProject.title} style={{ width: '100%', height: '200px', borderRadius: '16px', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '200px', borderRadius: '16px', background: 'linear-gradient(135deg, #2D6A4F, #1B4332)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: '#FFFFFF' }}>{selectedProject.title?.[0]?.toUpperCase()}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
                                    {(selectedProject.techStack || []).map((t, i) => <span key={i} className="tag-chip">{t}</span>)}
                                </div>
                            </div>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, color: '#1C1C1C', marginBottom: '12px' }}>{selectedProject.title}</h3>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B6560', lineHeight: 1.75 }}>{selectedProject.description || 'No description.'}</p>
                                <div style={{ borderTop: '1px solid #E8E0D4', margin: '16px 0', paddingTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {selectedProject.githubUrl && <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ textDecoration: 'none' }}>🐙 GitHub</a>}
                                    {selectedProject.demoUrl && <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>Live Demo →</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Certificates — read-only train */}
            {certificates.length > 0 && (
                <section style={{ padding: '80px 40px 100px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '34px', fontWeight: 700, color: '#1C1C1C',
                        maxWidth: '1100px', margin: '0 auto 40px',
                    }}>
                        Certificates
                    </h2>
                    <div style={{ position: 'relative', paddingBottom: '30px' }}>
                        <div style={{ position: 'absolute', bottom: '18px', left: 0, right: 0, height: '5px', background: '#5a4a3a', borderRadius: '3px' }} />
                        <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, height: '5px', background: '#5a4a3a', borderRadius: '3px' }} />
                        <div style={{
                            display: 'flex', alignItems: 'flex-end', width: 'max-content',
                            animation: `scroll-right ${Math.max(20, certificates.length * 6)}s linear infinite`,
                            paddingBottom: '16px',
                        }}>
                            {certificates.map((c, i) => (
                                <div key={c._id} style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
                                    <div
                                        onClick={() => setSelectedCert(c)}
                                        style={{
                                            width: '230px', height: '150px',
                                            background: 'linear-gradient(160deg, #FFFFFF, #FFFDF7)',
                                            borderRadius: '14px 14px 8px 8px',
                                            border: '2px solid #C9A23A', cursor: 'pointer', overflow: 'hidden',
                                        }}
                                    >
                                        <div style={{ height: '7px', background: 'linear-gradient(90deg, #C9A23A, #F0C96B, #C9A23A)' }} />
                                        <div style={{ padding: '16px 14px', textAlign: 'center' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(201,162,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '18px' }}>🏆</div>
                                            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, color: '#2D6A4F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#6B6560', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.issuer || ''}</p>
                                        </div>
                                    </div>
                                    <div style={{ width: '14px', height: '5px', background: '#666', borderRadius: '3px', alignSelf: 'center', marginBottom: '4px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Certificate Detail Overlay */}
            {selectedCert && (
                <>
                    <div className="overlay active" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setSelectedCert(null)} />
                    <div className="slide-panel-up open">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
                            <div style={{ width: '48px', height: '5px', background: '#E8E0D4', borderRadius: '3px' }} />
                        </div>
                        <div style={{ height: '4px', background: 'linear-gradient(90deg, #C9A23A, #2D6A4F, #C9A23A)', margin: '8px 0 0' }} />
                        <button onClick={() => setSelectedCert(null)} className="btn-icon" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>×</button>
                        <div style={{ display: 'flex', gap: '32px', padding: '24px 40px', height: 'calc(100% - 40px)', overflow: 'auto', flexWrap: 'wrap' }}>
                            <div style={{ flex: '0 0 40%', minWidth: '250px' }}>
                                {selectedCert.fileUrl ? (
                                    <img src={selectedCert.thumbnailUrl || selectedCert.fileUrl} alt={selectedCert.name} style={{ width: '100%', height: '220px', borderRadius: '16px', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '220px', borderRadius: '16px', background: 'linear-gradient(135deg, #C9A23A, #F0C96B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '64px' }}>🏆</span>
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, color: '#1C1C1C', marginBottom: '12px' }}>{selectedCert.name}</h3>
                                {selectedCert.issuer && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#2D6A4F', fontWeight: 600, marginBottom: '8px' }}>{selectedCert.issuer}</p>}
                                {selectedCert.fileUrl && (
                                    <div style={{ borderTop: '1px solid #E8E0D4', paddingTop: '16px', marginTop: '16px' }}>
                                        <a href={selectedCert.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ textDecoration: 'none' }}>View Certificate</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Achievements — read-only bus */}
            {achievements.length > 0 && (
                <section style={{ padding: '80px 40px 100px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '34px', fontWeight: 700, color: '#1C1C1C',
                        maxWidth: '1100px', margin: '0 auto 40px',
                    }}>
                        Achievements
                    </h2>
                    <div style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '20px',
                        paddingBottom: '20px',
                        paddingLeft: '40px',
                        paddingTop: '12px',
                        scrollbarWidth: 'none',
                    }}>
                        {achievements.map((a) => (
                            <div
                                key={a._id}
                                onClick={() => setSelectedAch(a)}
                                style={{
                                    flexShrink: 0, width: '240px',
                                    background: '#FFFFFF', borderRadius: '16px',
                                    border: '2px solid #C9A23A',
                                    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                                    cursor: 'pointer', overflow: 'hidden',
                                }}
                            >
                                <div style={{ height: '6px', background: 'linear-gradient(90deg, #C9A23A, #F0C96B, #C9A23A)' }} />
                                {a.imageUrl
                                    ? <img src={a.imageUrl} alt={a.title} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                                    : <div style={{ height: '60px', background: 'linear-gradient(135deg, #FAF7F2, #F0EBE3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏅</div>
                                }
                                <div style={{ padding: '10px 12px' }}>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 700, color: '#1C1C1C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</p>
                                    {a.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B6560', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievement Detail Overlay */}
            {selectedAch && (
                <>
                    <div className="overlay active" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setSelectedAch(null)} />
                    <div className="slide-panel-up open">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
                            <div style={{ width: '48px', height: '5px', background: '#E8E0D4', borderRadius: '3px' }} />
                        </div>
                        <button onClick={() => setSelectedAch(null)} className="btn-icon" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>×</button>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '28px 40px', overflow: 'auto', height: 'calc(100% - 30px)' }}>
                            <button onClick={() => setSelectedAch(null)} className="btn-icon" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>×</button>
                            {selectedAch.imageUrl && <img src={selectedAch.imageUrl} alt={selectedAch.title} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} />}
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1C1C1C', marginBottom: '8px' }}>{selectedAch.title}</h3>
                            {selectedAch.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B6560', lineHeight: 1.6, marginBottom: '12px' }}>{selectedAch.description}</p>}
                            {selectedAch.details && <div style={{ background: '#FAF7F2', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' }}><p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#1C1C1C', lineHeight: 1.6 }}>{selectedAch.details}</p></div>}
                            {selectedAch.link && <a href={selectedAch.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>View Achievement →</a>}
                        </div>
                    </div>
                </>
            )}

            {/* Social Links */}
            <SocialLinks user={user} />
        </main>
    );
}
