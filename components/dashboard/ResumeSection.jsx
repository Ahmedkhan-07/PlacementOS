'use client';

import { useState, useEffect, useRef } from 'react';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ResumePreview from '@/components/resume/ResumePreview';

function CloudShape() {
    return (
        <div style={{ position: 'relative', width: '320px', height: '200px' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '320px', height: '130px', background: '#FFFFFF', borderRadius: '100px', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }} />
            <div style={{ position: 'absolute', bottom: '80px', left: '30px', width: '160px', height: '120px', background: '#FFFFFF', borderRadius: '50%', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} />
            <div style={{ position: 'absolute', bottom: '100px', left: '110px', width: '130px', height: '110px', background: '#FFFFFF', borderRadius: '50%', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} />
            <div style={{ position: 'absolute', bottom: '70px', left: '190px', width: '110px', height: '90px', background: '#FFFFFF', borderRadius: '50%', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} />
        </div>
    );
}

export default function ResumeSection({ resume, username, onSaveResume }) {
    const [revealed, setRevealed] = useState(false);
    const [buttonsVisible, setButtonsVisible] = useState(false);
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

    // Buttons appear after 2.6s (after clouds part at 2.5s)
    useEffect(() => {
        if (revealed) {
            const t = setTimeout(() => setButtonsVisible(true), 200);
            return () => clearTimeout(t);
        }
    }, [revealed]);

    const leftCloud = revealed ? 'translateY(-50%) translateX(-280px)' : 'translateY(-50%) translateX(0px)';
    const rightCloud = revealed ? 'translateY(-50%) translateX(280px)' : 'translateY(-50%) translateX(0px)';

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
                ref={sectionRef}
                style={{
                    position: 'relative', minHeight: '100vh',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', zIndex: 1, padding: '80px 40px',
                }}
            >
                {/* Section title — static, above the scene */}
                <div style={{ textAlign: 'center', zIndex: 6, marginBottom: '32px' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, color: '#1C1C1C' }}>
                        Your Resume
                    </h2>
                </div>

                {/* Cloud + Resume scene */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {/* LEFT CLOUD — Edit Resume */}
                    <div style={{
                        position: 'absolute', left: '50%', top: '50%',
                        marginLeft: '-320px',
                        transform: leftCloud, transition: 'transform 2.5s ease-in-out',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '320px', zIndex: 6,
                    }}>
                        <CloudShape />
                        <button
                            className="btn-primary"
                            onClick={() => setShowBuilder(true)}
                            style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                opacity: buttonsVisible ? 1 : 0,
                                transition: 'opacity 0.5s ease',
                                //pointerEvents: buttonsVisible ? 'auto' : 'none',
                                fontSize: '15px', padding: '10px 20px', whiteSpace: 'nowrap',
                            }}
                        >
                            ✏️ Edit Resume
                        </button>
                    </div>

                    {/* RIGHT CLOUD — Download Resume */}
                    <div style={{
                        position: 'absolute', left: '50%', top: '50%',
                        marginLeft: '0px',
                        transform: rightCloud, transition: 'transform 2.5s ease-in-out',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '320px', zIndex: 6,
                    }}>
                        <CloudShape />
                        <button
                            className="btn-gold"
                            onClick={() => setShowDownloadConfirm(true)}
                            disabled={downloading}
                            style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                opacity: buttonsVisible ? 1 : 0,
                                transition: 'opacity 0.5s ease',
                                //pointerEvents: buttonsVisible ? 'auto' : 'none',
                                fontSize: '15px', padding: '10px 20px', whiteSpace: 'nowrap',
                            }}
                        >
                            {downloading ? '⏳ Generating...' : '⬇ Download Resume'}
                        </button>
                    </div>

                    {/* RESUME PAPER — rises from below, click to preview */}
                    <div
                        onClick={() => setShowPreviewModal(true)}
                        style={{
                            opacity: revealed ? 1 : 0,
                            transform: revealed ? 'translateY(0)' : 'translateY(60px)',
                            transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
                            zIndex: 5, cursor: 'pointer',
                        }}
                    >
                        <div style={{
                            background: 'white', width: '794px',
                            transformOrigin: 'top center', transform: 'scale(0.35)',
                            marginTop: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                            borderRadius: 4, marginBottom: 'calc(-1123px * 0.65)',
                        }}>
                            <ResumePreview
                                data={resume}
                                templateId={resume?.templateId || 1}
                                accentColor={resume?.accentColor || '#2D6A4F'}
                                compact
                            />
                        </div>
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
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 70,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '20px',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#FFFFFF', borderRadius: '20px',
                            padding: '40px 48px', maxWidth: '420px', width: '100%',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                        }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '22px', fontWeight: 700,
                            color: '#1C1C1C', marginBottom: '10px',
                        }}>
                            Download Resume PDF?
                        </h3>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px', color: '#6B6560',
                            lineHeight: 1.6, marginBottom: '28px',
                        }}>
                            This will generate and download your resume as a PDF file.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                className="btn-ghost"
                                onClick={() => setShowDownloadConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-gold"
                                onClick={handleDownload}
                            >
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
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 60,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '20px',
                    }}
                    onClick={() => setShowPreviewModal(false)}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#FFFFFF', borderRadius: '16px',
                            maxWidth: '800px', width: '100%',
                            maxHeight: '90vh', overflow: 'auto',
                            padding: '24px', position: 'relative',
                        }}
                    >
                        <button
                            onClick={() => setShowPreviewModal(false)}
                            className="btn-icon"
                            style={{ position: 'absolute', top: '12px', right: '12px' }}
                        >
                            ×
                        </button>
                        <ResumePreview
                            data={resume}
                            templateId={resume?.templateId || 1}
                            accentColor={resume?.accentColor || '#2D6A4F'}
                        />
                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                className="btn-primary"
                                onClick={() => { setShowPreviewModal(false); setShowBuilder(true); }}
                            >
                                ✏️ Edit Resume
                            </button>
                            <button
                                className="btn-gold"
                                onClick={() => { setShowPreviewModal(false); setShowDownloadConfirm(true); }}
                            >
                                ⬇ Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resume Builder */}
            {showBuilder && (
                <ResumeBuilder
                    resume={resume}
                    onClose={() => setShowBuilder(false)}
                    onSave={onSaveResume}
                />
            )}
        </>
    );
}
