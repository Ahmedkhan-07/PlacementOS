'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ResumePreview from '@/components/resume/ResumePreview';
import toast from 'react-hot-toast';

export default function ResumeSection({ resumes: initialResumes = [], resume, username, onResumesChange, readOnly = false, userProfilePic }) {
    const normalizedResumes = Array.isArray(initialResumes) && initialResumes.length > 0
        ? initialResumes
        : (resume ? [resume] : []);

    const [resumes, setResumes] = useState(normalizedResumes);
    const [revealed, setRevealed] = useState(false);
    const [showBuilder, setShowBuilder] = useState(false);
    const [editingResume, setEditingResume] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewResume, setPreviewResume] = useState(null);
    const [downloading, setDownloading] = useState(null);
    const [showAllResumes, setShowAllResumes] = useState(false);
    const [showEditSelector, setShowEditSelector] = useState(false);
    const [confirmDownloadResume, setConfirmDownloadResume] = useState(null);
    const [showDownloadSelector, setShowDownloadSelector] = useState(false);
    const sectionRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const normalized = Array.isArray(initialResumes) && initialResumes.length > 0
            ? initialResumes
            : (resume ? [resume] : []);
        setResumes(normalized);
    }, [initialResumes, resume]);

    const activeResume = resumes.find(r => r.isActive) || resumes[0];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSave = async (savedResume, resumeId) => {
        const updatedResumes = resumes.map(r =>
            r._id?.toString() === resumeId ? { ...r, ...savedResume } : r
        );
        if (!resumeId) updatedResumes.push(savedResume);
        setResumes(updatedResumes);
        onResumesChange?.(updatedResumes);
    };

    const handleSetActive = async (resumeId) => {
        const res = await fetch('/api/resume', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeId }),
        });
        if (res.ok) {
            const { resumes: updated } = await res.json();
            setResumes(updated);
            onResumesChange?.(updated);
            toast.success('Active resume updated!');
        }
    };

    const handleDelete = async (resumeId) => {
        const res = await fetch('/api/resume', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeId }),
        });
        if (res.ok) {
            const { resumes: updated } = await res.json();
            setResumes(updated);
            onResumesChange?.(updated);
            toast.success('Resume deleted');
        }
    };

    const handleDownloadClick = () => {
        if (readOnly) {
            setConfirmDownloadResume(activeResume);
        } else if (resumes.length > 0) {
            setShowDownloadSelector(true);
        } else {
            toast.error('No resume available to download');
        }
    };

    const handleDownload = (resume) => {
        setDownloading(resume._id);
        try {
            const containerId = `resume-pdf-${resume._id}`;
            const element = document.getElementById(containerId);
            if (!element) { setDownloading(null); return; }

            // Open a print window with the resume HTML + fonts
            const printWindow = window.open('', '_blank', 'width=900,height=1200');
            if (!printWindow) {
                toast.error('Please allow popups to download PDF');
                setDownloading(null);
                return;
            }

            printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${resume.label || 'resume'}-${username}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: white; }
    @media print {
      @page { size: A4 portrait; margin: 0; }
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>${element.innerHTML}</body>
</html>`);
            printWindow.document.close();

            // Wait for fonts then trigger print
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                setTimeout(() => {
                    printWindow.close();
                    setDownloading(null);
                }, 1000);
            }, 1500);
        } catch (err) {
            console.error('PDF error:', err);
            toast.error('Download failed');
            setDownloading(null);
        }
    };

    return (
        <>
            <section
                id="resume"
                ref={sectionRef}
                style={{
                    position: 'relative', 
                    padding: '120px 5%',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(45, 106, 79, 0.02), var(--bg))'
                }}
            >
                {/* Section Header */}
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
                            Professional Profile
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
                        Interactive Resume
                    </h2>
                    
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '17px',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: 1.7,
                        margin: '0 auto'
                    }}>
                        A tailored representation of my professional experience, skills, and academic background. Click to expand or download.
                    </p>
                </div>

                {/* Presentation Stage */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
                    
                    {/* Glowing Backdrop */}
                    <div style={{
                        position: 'absolute',
                        top: '10%', left: '10%', right: '10%', bottom: '0',
                        background: 'var(--accent)',
                        filter: 'blur(100px)',
                        opacity: revealed ? 0.15 : 0,
                        transition: 'opacity 1.5s ease',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }} />

                    {/* Resume Document */}
                    {activeResume ? (
                        <div
                            onClick={() => { setPreviewResume(activeResume); setShowPreviewModal(true); }}
                            style={{
                                position: 'relative',
                                opacity: revealed ? 1 : 0,
                                transform: revealed ? 'translateY(0)' : 'translateY(50px)',
                                transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                zIndex: 5, 
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{
                                background: 'white', 
                                width: '794px',
                                transformOrigin: 'top center', 
                                transform: 'scale(0.45)',
                                margin: '0 auto', 
                                boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                                borderRadius: '6px', 
                                marginBottom: 'calc(-1123px * 0.55)',
                                overflow: 'hidden',
                                transition: 'transform 0.4s ease, box-shadow 0.4s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(0.47)';
                                e.currentTarget.style.boxShadow = '0 35px 65px rgba(0,0,0,0.2), 0 0 0 3px var(--accent)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(0.45)';
                                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)';
                            }}
                            >
                                <ResumePreview
                                    data={activeResume}
                                    templateId={activeResume?.templateId || 1}
                                    accentColor={activeResume?.accentColor || '#2D6A4F'}
                                    compact
                                />
                            </div>
                        </div>
                    ) : (
                        !readOnly && (
                            <div 
                                onClick={() => { setEditingResume(null); setShowBuilder(true); }}
                                style={{
                                    background: 'var(--surface)',
                                    border: '2px dashed var(--border)',
                                    borderRadius: '12px',
                                    padding: '40px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    zIndex: 5,
                                    width: '300px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📄</div>
                                <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>Create Your First Resume</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Click to build a professional resume.</p>
                            </div>
                        )
                    )}

                    {/* Floating Action Dock */}
                    {activeResume && (
                        <div style={{
                            position: 'relative', 
                            marginTop: '40px',
                            display: 'flex',
                            gap: '16px',
                            background: 'var(--surface)',
                            padding: '12px 24px',
                            borderRadius: '100px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                            border: '1px solid var(--border)',
                            zIndex: 10,
                            opacity: revealed ? 1 : 0,
                            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
                        }}>
                            {!readOnly && (
                                <button 
                                    className="btn-primary" 
                                    onClick={() => setShowEditSelector(true)} 
                                    style={{ padding: '12px 28px', gap: '8px' }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                                    </svg>
                                    Edit Resume
                                </button>
                            )}
                            <button 
                                className="btn-gold" 
                                onClick={handleDownloadClick} 
                                disabled={downloading !== null} 
                                style={{ padding: '12px 28px', gap: '8px' }}
                            >
                                {downloading === activeResume._id ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin">
                                        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                )}
                                {downloading === activeResume._id ? 'Generating...' : 'Download PDF'}
                            </button>
                            {!readOnly && (
                                <button 
                                    className="btn-ghost" 
                                    onClick={() => setShowAllResumes(true)} 
                                    style={{ padding: '12px 28px', gap: '8px' }}
                                >
                                    📋 Manage Resumes ({resumes.length}/3)
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Off-screen PDF containers for all resumes */}
            {resumes.map(resume => (
                <div key={resume._id} id={`resume-pdf-${resume._id}`} style={{ position: 'absolute', left: '-9999px', top: 0, width: '794px' }}>
                    <ResumePreview data={resume} templateId={resume.templateId || 1} accentColor={resume.accentColor || '#2D6A4F'} />
                </div>
            ))}

            {/* Manage Resumes Modal */}
            {showAllResumes && !readOnly && mounted && createPortal(
                <div onClick={() => setShowAllResumes(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26, 31, 46, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>My Resumes</h2>
                            <button onClick={() => setShowAllResumes(false)} className="btn-icon">×</button>
                        </div>

                        {resumes.map(resume => (
                            <div key={resume._id} style={{ border: `2px solid ${resume.isActive ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '16px', padding: '20px', marginBottom: '12px', position: 'relative' }}>
                                {resume.isActive && (
                                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent)', color: 'white', fontSize: '11px', padding: '2px 10px', borderRadius: '20px' }}>Active</span>
                                )}
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{resume.label}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                                    Template {resume.templateId} · Last updated {new Date(resume.updatedAt).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <button onClick={() => { setEditingResume(resume); setShowBuilder(true); setShowAllResumes(false); }} className="btn-primary" style={{ fontSize: '12px', padding: '6px 14px' }}>✏️ Edit</button>
                                    <button onClick={() => { setShowAllResumes(false); setConfirmDownloadResume(resume); }} disabled={downloading === resume._id} className="btn-gold" style={{ fontSize: '12px', padding: '6px 14px' }}>
                                        {downloading === resume._id ? '⏳' : '⬇ Download'}
                                    </button>
                                    <button onClick={() => { setPreviewResume(resume); setShowPreviewModal(true); }} className="btn-ghost" style={{ fontSize: '12px', padding: '6px 14px' }}>👁 Preview</button>
                                    {!resume.isActive && (
                                        <button onClick={() => handleSetActive(resume._id)} className="btn-outline" style={{ fontSize: '12px', padding: '6px 14px' }}>⭐ Set Active</button>
                                    )}
                                    {resumes.length > 1 && (
                                        <button onClick={() => handleDelete(resume._id)} style={{ fontSize: '12px', padding: '6px 14px', background: 'none', border: '1px solid var(--engine-red)', color: 'var(--engine-red)', borderRadius: '8px', cursor: 'pointer' }}>🗑 Delete</button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {resumes.length < 3 && (
                            <button onClick={() => { setEditingResume(null); setShowBuilder(true); setShowAllResumes(false); }} className="btn-outline" style={{ width: '100%', padding: '14px', fontSize: '14px', marginTop: '8px' }}>
                                + Create New Resume ({resumes.length}/3)
                            </button>
                        )}
                    </div>
                </div>,
                document.body
            )}

            {/* Preview Modal */}
            {showPreviewModal && previewResume && mounted && createPortal(
                <div onClick={() => setShowPreviewModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26, 31, 46, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '24px', position: 'relative' }}>
                        <button onClick={() => setShowPreviewModal(false)} className="btn-icon" style={{ position: 'absolute', top: '12px', right: '12px' }}>×</button>
                        <ResumePreview data={previewResume} templateId={previewResume.templateId || 1} accentColor={previewResume.accentColor || '#2D6A4F'} />
                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                    {!readOnly && (
                                        <button className="btn-primary" onClick={() => { setShowPreviewModal(false); setEditingResume(previewResume); setShowBuilder(true); }}>✏️ Edit Resume</button>
                                    )}
                                    <button className="btn-gold" onClick={() => { setShowPreviewModal(false); setConfirmDownloadResume(previewResume); }}>⬇ Download PDF</button>
                                </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Resume Builder */}
            {showBuilder && !readOnly && (
                <ResumeBuilder
                    resume={editingResume}
                    userProfilePic={userProfilePic}
                    onClose={() => { setShowBuilder(false); setEditingResume(null); }}
                    onSave={handleSave}
                />
            )}
            {/* Select Resume to Edit Modal */}
            {showEditSelector && !readOnly && mounted && createPortal(
                <div onClick={() => setShowEditSelector(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26, 31, 46, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>Select Resume to Edit</h3>
                            <button onClick={() => setShowEditSelector(false)} className="btn-icon">×</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {resumes.map(r => (
                                <button
                                    key={r._id}
                                    className="btn-outline"
                                    onClick={() => {
                                        setEditingResume(r);
                                        setShowBuilder(true);
                                        setShowEditSelector(false);
                                    }}
                                    style={{ width: '100%', padding: '14px', fontSize: '14px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'var(--surface)' }}
                                >
                                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.label}</span>
                                    {r.isActive && <span style={{ fontSize: '11px', background: 'var(--accent)', color: 'white', padding: '2px 10px', borderRadius: '20px' }}>Active</span>}
                                </button>
                            ))}
                            {resumes.length < 3 && (
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        setEditingResume(null);
                                        setShowBuilder(true);
                                        setShowEditSelector(false);
                                    }}
                                    style={{ width: '100%', padding: '14px', fontSize: '14px', marginTop: '8px', cursor: 'pointer' }}
                                >
                                    + Create New Resume ({resumes.length}/3)
                                </button>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
            {/* Download Confirmation Modal */}
            {confirmDownloadResume && mounted && createPortal(
                <div 
                    onClick={() => setConfirmDownloadResume(null)} 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(26, 31, 46, 0.4)', 
                        backdropFilter: 'blur(8px)', 
                        WebkitBackdropFilter: 'blur(8px)', 
                        zIndex: 99999, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        padding: '20px' 
                    }}
                >
                    <div 
                        onClick={e => e.stopPropagation()} 
                        style={{ 
                            background: 'var(--surface)', 
                            border: '1px solid var(--border)', 
                            borderRadius: '24px', 
                            padding: '40px', 
                            maxWidth: '420px', 
                            width: '100%', 
                            textAlign: 'center', 
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)' 
                        }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '22px', 
                            fontWeight: 700, 
                            color: 'var(--text)', 
                            margin: '0 0 12px'
                        }}>
                            Download Resume PDF?
                        </h3>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px', 
                            color: 'var(--text-muted)',
                            lineHeight: 1.6, 
                            marginBottom: '28px'
                        }}>
                            This will generate a high-quality PDF specifically tailored for printing or sharing.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button 
                                className="btn-ghost" 
                                onClick={() => setConfirmDownloadResume(null)}
                                style={{ padding: '10px 20px', fontSize: '14px' }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn-gold" 
                                onClick={() => {
                                    const resumeToDownload = confirmDownloadResume;
                                    setConfirmDownloadResume(null);
                                    handleDownload(resumeToDownload);
                                }}
                                style={{ padding: '10px 20px', fontSize: '14px' }}
                            >
                                Yes, Download
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
            {/* Select Resume to Download Modal */}
            {showDownloadSelector && mounted && createPortal(
                <div onClick={() => setShowDownloadSelector(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26, 31, 46, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>Select Resume to Download</h3>
                            <button onClick={() => setShowDownloadSelector(false)} className="btn-icon">×</button>
                        </div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                            Choose which resume you want to generate and download as a high-quality PDF:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {resumes.map(r => (
                                <button
                                    key={r._id}
                                    className="btn-outline"
                                    onClick={() => {
                                        setShowDownloadSelector(false);
                                        setConfirmDownloadResume(r);
                                    }}
                                    style={{ width: '100%', padding: '14px', fontSize: '14px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'var(--surface)' }}
                                >
                                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.label}</span>
                                    {r.isActive && <span style={{ fontSize: '11px', background: 'var(--accent)', color: 'white', padding: '2px 10px', borderRadius: '20px' }}>Active</span>}
                                </button>
                            ))}
                            <button 
                                className="btn-ghost" 
                                onClick={() => setShowDownloadSelector(false)}
                                style={{ width: '100%', padding: '12px', fontSize: '14px', marginTop: '8px' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
