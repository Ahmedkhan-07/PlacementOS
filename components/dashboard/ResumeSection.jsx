'use client';

import { useState, useEffect, useRef } from 'react';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ResumePreview from '@/components/resume/ResumePreview';

export default function ResumeSection({ resume, username, onSaveResume, readOnly = false }) {
    const [revealed, setRevealed] = useState(false);
    const [showBuilder, setShowBuilder] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const sectionRef = useRef(null);

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

    const handleDownload = () => {
        setShowDownloadConfirm(false);
        setDownloading(true);
        try {
            const source = document.getElementById('resume-pdf-container');
            if (!source) { setDownloading(false); return; }

            // Open a print window with the resume HTML + fonts
            const printWindow = window.open('', '_blank', 'width=900,height=1200');
            printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${username || 'resume'}-resume</title>
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
<body>${source.innerHTML}</body>
</html>`);
            printWindow.document.close();

            // Wait for fonts then trigger print
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                setTimeout(() => {
                    printWindow.close();
                    setDownloading(false);
                }, 1000);
            }, 1500);
        } catch (err) {
            console.error('PDF error:', err);
            setDownloading(false);
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
                    <div
                        onClick={() => setShowPreviewModal(true)}
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
                            transform: 'scale(0.45)', // Slightly larger for better visibility
                            margin: '0 auto', 
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                            borderRadius: '6px', 
                            marginBottom: 'calc(-1123px * 0.55)', // adjust for 0.45 scale
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
                                data={resume}
                                templateId={resume?.templateId || 1}
                                accentColor={resume?.accentColor || '#2D6A4F'}
                                compact
                            />
                        </div>
                    </div>

                    {/* Floating Action Dock */}
                    <div style={{
                        position: 'relative', // Use relative to sit below the card cleanly, or slightly overlap
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
                                onClick={() => setShowBuilder(true)} 
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
                            onClick={() => setShowDownloadConfirm(true)} 
                            disabled={downloading} 
                            style={{ padding: '12px 28px', gap: '8px' }}
                        >
                            {downloading ? (
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
                            {downloading ? 'Generating...' : 'Download PDF'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Off-screen PDF source — html2canvas captures this */}
            {resume && (
                <div id="resume-pdf-container" style={{
                    position: 'fixed',
                    left: '-9999px',
                    top: 0,
                    width: '794px',
                    overflow: 'visible',
                    zIndex: -1,
                }}>
                    <ResumePreview
                        data={resume}
                        templateId={resume?.templateId || 1}
                        accentColor={resume?.accentColor || '#2D6A4F'}
                    />
                </div>
            )}

            {/* Download Confirmation Modal */}
            {showDownloadConfirm && (
                <div
                    onClick={() => setShowDownloadConfirm(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                        zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '20px',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'var(--surface)', borderRadius: '24px',
                            padding: '40px 48px', maxWidth: '420px', width: '100%',
                            textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '24px', fontWeight: 700,
                            color: 'var(--text)', marginBottom: '12px',
                        }}>
                            Download Resume PDF?
                        </h3>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px', color: 'var(--text-muted)',
                            lineHeight: 1.6, marginBottom: '32px',
                        }}>
                            This will generate a high-quality PDF specifically tailored for printing or sharing.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button className="btn-ghost" onClick={() => setShowDownloadConfirm(false)}>
                                Cancel
                            </button>
                            <button className="btn-gold" onClick={handleDownload} disabled={downloading}>
                                Yes, Download
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Preview Modal */}
            {showPreviewModal && (
                <div
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                        zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '40px',
                    }}
                    onClick={() => setShowPreviewModal(false)}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className="card"
                        style={{
                            background: 'var(--surface)', borderRadius: '16px',
                            maxWidth: '900px', width: '100%',
                            maxHeight: '90vh', overflow: 'auto',
                            padding: '32px', position: 'relative',
                        }}
                    >
                        <button
                            onClick={() => setShowPreviewModal(false)}
                            className="btn-icon"
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                        >
                            ×
                        </button>
                        
                        <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
                             <ResumePreview
                                data={resume}
                                templateId={resume?.templateId || 1}
                                accentColor={resume?.accentColor || '#2D6A4F'}
                            />
                        </div>

                        <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            {!readOnly && (
                                <button
                                    className="btn-primary"
                                    onClick={() => { setShowPreviewModal(false); setShowBuilder(true); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                                    </svg>
                                    Edit Resume
                                </button>
                            )}
                            <button
                                className="btn-gold"
                                onClick={() => { setShowPreviewModal(false); setShowDownloadConfirm(true); }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resume Builder */}
            {!readOnly && showBuilder && (
                <ResumeBuilder
                    resume={resume}
                    onClose={() => setShowBuilder(false)}
                    onSave={onSaveResume}
                />
            )}
        </>
    );
}
