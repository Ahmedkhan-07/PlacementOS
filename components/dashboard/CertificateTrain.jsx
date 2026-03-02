'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import CertificateDetailPanel from '@/components/panels/CertificateDetailPanel';
import AddCertificateModal from '@/components/modals/AddCertificateModal';
import EditCertificateModal from '@/components/modals/EditCertificateModal';

/* ─── Wheel ─────────────────────────────────────────────────────────── */
function Wheel({ size = 26 }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 38% 32%, #4a4a4a, #111)',
            border: '2px solid #2a2a2a',
            boxShadow: '0 4px 10px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.06)',
            position: 'relative',
            animation: 'spin 1.1s linear infinite',
        }}>
            {[0, 45, 90, 135].map(a => (
                <div key={a} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '42%', height: '1.5px',
                    background: 'rgba(110,110,110,0.7)',
                    transformOrigin: 'left center',
                    transform: `translateY(-50%) rotate(${a}deg)`,
                }} />
            ))}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '30%', height: '30%',
                background: 'radial-gradient(circle,#D4A017,#8B6200)',
                borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                boxShadow: '0 0 4px rgba(212,160,23,0.5)',
            }} />
        </div>
    );
}

/* ─── Locomotive Engine (faces LEFT — mirror of projects train) ──────── */
function CertEngine() {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, flexDirection: 'row-reverse' }}>
            <div style={{ position: 'relative', width: '250px', height: '170px' }}>

                {/* Smoke (from stack on right since mirrored) */}
                {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{
                        position: 'absolute', top: `${-18 - i * 18}px`, right: `${30 + i * 7}px`,
                        width: `${10 + i * 6}px`, height: `${10 + i * 6}px`,
                        background: `rgba(150,150,150,${0.55 - i * 0.12})`,
                        borderRadius: '50%', filter: `blur(${2 + i * 1.5}px)`,
                        animation: 'smokeRise 2.8s ease-out infinite',
                        animationDelay: `${i * 0.6}s`,
                    }} />
                ))}

                {/* Stack */}
                <div style={{
                    position: 'absolute', top: '-24px', right: '26px',
                    width: '18px', height: '28px',
                    background: 'linear-gradient(180deg,#111,#1e1e1e)',
                    borderRadius: '2px 2px 0 0',
                }}>
                    <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '28px', height: '7px', background: '#111', borderRadius: '4px 4px 0 0' }} />
                </div>

                {/* Main hood */}
                <div style={{
                    position: 'absolute', bottom: '30px', right: '60px', width: '162px', height: '78px',
                    background: 'linear-gradient(175deg,#1a2a1a 0%,#0f1a0f 55%,#070e07 100%)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}>
                    {/* Gold stripe */}
                    <div style={{ position: 'absolute', top: '14px', left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,#B8860B,#F5C518,#DAA520,#F5C518,#B8860B)' }} />
                    {/* Hatch panels */}
                    {[12, 44, 76, 108].map((x, i) => (
                        <div key={i} style={{ position: 'absolute', top: '26px', left: `${x}px`, width: '22px', height: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2px' }} />
                    ))}
                    {/* Dome */}
                    <div style={{ position: 'absolute', top: '-16px', right: '42px', width: '48px', height: '20px', background: 'linear-gradient(180deg,#1e3020,#142214)', borderRadius: '50% 50% 0 0', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.06)' }} />
                </div>

                {/* Cab (right side, mirrored) */}
                <div style={{
                    position: 'absolute', bottom: '30px', right: '0px',
                    width: '65px', height: '95px',
                    background: 'linear-gradient(155deg,#1e341e,#122012,#070e07)',
                    borderRadius: '5px 5px 0 0',
                    boxShadow: '0 6px 22px rgba(0,0,0,0.7)',
                }}>
                    <div style={{ position: 'absolute', top: '10px', left: '7px', right: '7px', height: '34px', background: 'linear-gradient(180deg,rgba(90,200,130,0.22),rgba(30,110,60,0.12))', border: '1.5px solid rgba(90,200,130,0.28)', borderRadius: '3px', boxShadow: 'inset 0 0 10px rgba(90,200,130,0.15)' }}>
                        <div style={{ position: 'absolute', top: '5px', left: '5px', width: '7px', height: '14px', background: 'rgba(255,255,255,0.18)', borderRadius: '1px', transform: 'skewX(-8deg)' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: '34px', left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg,#F5C518,transparent)' }} />
                    {/* Headlights */}
                    <div style={{ position: 'absolute', bottom: '18px', right: '8px', width: '13px', height: '13px', background: 'radial-gradient(circle,#fffbe0,#F5C518)', borderRadius: '50%', boxShadow: '0 0 14px 5px rgba(245,197,24,0.75),0 0 32px 10px rgba(245,197,24,0.3)' }} />
                    <div style={{ position: 'absolute', bottom: '18px', left: '8px', width: '10px', height: '10px', background: 'radial-gradient(circle,#fff,rgba(245,197,24,0.8))', borderRadius: '50%', boxShadow: '0 0 10px 3px rgba(245,197,24,0.6)' }} />
                </div>

                {/* Nose (left side) */}
                <div style={{ position: 'absolute', bottom: '30px', left: '0px', width: '22px', height: '78px', background: 'linear-gradient(270deg,#070e07,#102010)', borderRadius: '6px 0 0 0' }}>
                    <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', width: '14px', height: '14px', background: 'radial-gradient(circle,#fffbe0,#F5C518)', borderRadius: '50%', boxShadow: '0 0 18px 6px rgba(245,197,24,0.9),0 0 50px 16px rgba(245,197,24,0.4)' }} />
                </div>

                {/* Underframe */}
                <div style={{ position: 'absolute', bottom: '24px', left: '0px', right: '4px', height: '8px', background: 'linear-gradient(180deg,#0a1a0a,#040904)', borderRadius: '0 0 2px 2px' }} />

                {/* Wheel bogies */}
                <div style={{ position: 'absolute', bottom: '-2px', left: '8px', display: 'flex', gap: '12px' }}>
                    <Wheel size={26} /><Wheel size={26} />
                </div>
                <div style={{ position: 'absolute', bottom: '-2px', right: '14px', display: 'flex', gap: '12px' }}>
                    <Wheel size={26} /><Wheel size={26} />
                </div>

                {/* Connecting rod */}
                <div style={{ position: 'absolute', bottom: '11px', left: '22px', right: '28px', height: '3px', background: 'linear-gradient(90deg,#333,#555,#333)', borderRadius: '2px' }} />
            </div>

            {/* Coupler (left side) */}
            <div style={{ width: '14px', height: '5px', background: 'linear-gradient(180deg,#4a4a4a,#252525)', borderRadius: '3px', alignSelf: 'center', marginBottom: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.6)' }} />
        </div>
    );
}

/* ─── Flatcar + Floating Certificate Card ───────────────────────────── */
function CertCar({ certificate, isActive, onClick, index }) {
    const formatDate = (d) => {
        if (!d) return '';
        try { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); } catch { return ''; }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, flexDirection: 'row-reverse' }}>
            <div style={{ position: 'relative', width: '264px' }}>

                {/* ── PREMIUM CERT CARD ─────────────────────────────────── */}
                <div
                    onClick={onClick}
                    style={{
                        margin: '0 8px 14px',
                        background: isActive
                            ? 'linear-gradient(135deg,rgba(30,22,5,0.97),rgba(50,36,8,0.95))'
                            : 'linear-gradient(135deg,rgba(18,14,4,0.95),rgba(30,22,8,0.93))',
                        backdropFilter: 'blur(22px)',
                        WebkitBackdropFilter: 'blur(22px)',
                        borderRadius: '20px',
                        border: isActive
                            ? '1.5px solid rgba(245,215,110,0.75)'
                            : '1.5px solid rgba(201,162,58,0.38)',
                        boxShadow: isActive
                            ? '0 -14px 45px rgba(212,160,23,0.55), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,215,110,0.15)'
                            : '0 -8px 30px rgba(201,162,58,0.2), 0 10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
                        cursor: 'pointer', overflow: 'hidden',
                        animation: 'levitate 3.2s ease-in-out infinite',
                        animationDelay: `${index * 0.5}s`,
                        transition: 'border-color 0.35s, box-shadow 0.35s, background 0.35s',
                        userSelect: 'none',
                        display: 'flex', height: '126px', position: 'relative',
                    }}
                >
                    {/* ── Image/thumbnail — full height, fades right ── */}
                    <div style={{ width: '104px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                        {(certificate.fileUrl || certificate.thumbnailUrl) ? (
                            <img
                                src={certificate.thumbnailUrl || certificate.fileUrl}
                                alt={certificate.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.8 }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#2a1a02,#5c3a0a,#B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🏆</div>
                        )}
                        {/* Right-edge fade */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent 35%,rgba(18,14,4,0.96))' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px', background: 'linear-gradient(180deg,transparent,rgba(0,0,0,0.65))' }} />
                        {/* Gold shimmer top bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: isActive ? 'linear-gradient(90deg,#DAA520,#FFD700,#DAA520)' : 'linear-gradient(90deg,#8a6c00,#C9A23A,#8a6c00)', boxShadow: isActive ? '0 0 10px rgba(255,215,0,0.9)' : '0 0 6px rgba(201,162,58,0.5)' }} />
                    </div>

                    {/* ── Right: label + name + issuer + date ── */}
                    <div style={{ flex: 1, padding: '13px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', overflow: 'hidden' }}>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '8px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: isActive ? 'rgba(245,215,110,0.9)' : 'rgba(201,162,58,0.7)', margin: 0 }}>CERTIFICATE</p>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '13.5px', fontWeight: 700, color: 'rgba(255,255,255,0.95)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2, letterSpacing: '-0.01em', textShadow: '0 1px 8px rgba(0,0,0,0.7)', margin: 0 }}>{certificate.name}</p>
                        {certificate.issuer && (
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '10px', color: isActive ? '#FFD700' : '#C9A23A', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textShadow: isActive ? '0 0 10px rgba(255,215,0,0.6)' : 'none' }}>{certificate.issuer}</p>
                        )}
                        {certificate.dateIssued && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '1px 8px', background: 'rgba(201,162,58,0.15)', border: '1px solid rgba(201,162,58,0.3)', borderRadius: '100px', width: 'fit-content' }}>
                                <span style={{ fontSize: '8px' }}>📅</span>
                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '9px', color: 'rgba(201,162,58,0.85)', fontWeight: 600 }}>{formatDate(certificate.dateIssued)}</span>
                            </span>
                        )}
                    </div>

                    {/* Corner shine */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: 'radial-gradient(circle at top right,rgba(255,215,0,0.08),transparent 70%)', pointerEvents: 'none' }} />
                    {/* Levitation glow */}
                    <div style={{ position: 'absolute', bottom: '-12px', left: '10%', right: '10%', height: '14px', background: isActive ? 'rgba(212,160,23,0.55)' : 'rgba(201,162,58,0.3)', filter: 'blur(12px)', borderRadius: '50%' }} />
                </div>

                {/* Steel flatcar deck */}
                <div style={{
                    height: '22px',
                    background: 'linear-gradient(180deg,#1e2c1e 0%,#121e12 55%,#080f08 100%)',
                    borderRadius: '3px 3px 0 0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                    position: 'relative',
                }}>
                    {[20, 50, 80, 110, 140, 170, 200].map(x => (
                        <div key={x} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: '1px', background: 'rgba(255,255,255,0.04)' }} />
                    ))}
                    <div style={{ position: 'absolute', top: '5px', left: '8px', right: '8px', height: '3px', background: 'linear-gradient(90deg,#2d3e2d,#4a604a,#2d3e2d)', borderRadius: '2px' }} />
                </div>

                {/* Wheel trucks */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 18px' }}>
                    <div style={{ display: 'flex', gap: '9px' }}><Wheel size={21} /><Wheel size={21} /></div>
                    <div style={{ display: 'flex', gap: '9px' }}><Wheel size={21} /><Wheel size={21} /></div>
                </div>
            </div>

            {/* Coupler */}
            <div style={{ width: '12px', height: '4px', background: 'linear-gradient(180deg,#444,#222)', borderRadius: '2px', alignSelf: 'center', marginBottom: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }} />
        </div>
    );
}

/* ─── Drag scroll hook ───────────────────────────────────────────────── */
function useDragScroll(ref) {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeftPos = useRef(0);
    const onMouseDown = useCallback((e) => {
        isDragging.current = true;
        startX.current = e.pageX - ref.current.offsetLeft;
        scrollLeftPos.current = ref.current.scrollLeft;
        ref.current.style.cursor = 'grabbing';
    }, [ref]);
    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        ref.current.scrollLeft = scrollLeftPos.current - (e.pageX - ref.current.offsetLeft - startX.current) * 1.5;
    }, [ref]);
    const onMouseUp = useCallback(() => {
        isDragging.current = false;
        if (ref.current) ref.current.style.cursor = 'grab';
    }, [ref]);
    return { onMouseDown, onMouseMove, onMouseUp };
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function CertificateTrain({ certificates, onRefreshCertificates, readOnly = false }) {
    const [selectedCert, setSelectedCert] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);
    const submittingRef = useRef(false);
    const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll(scrollRef);

    // Certificates train auto-scrolls right-to-left (engine is at the right end)
    useEffect(() => {
        if (!scrollRef.current || certificates.length === 0) return;
        // Start at the far right so engine is visible first
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        autoScrollRef.current = setInterval(() => {
            if (!scrollRef.current || selectedCert) return;
            const el = scrollRef.current;
            if (el.scrollLeft <= 0) { el.scrollLeft = el.scrollWidth; }
            else { el.scrollLeft -= 0.8; }
        }, 30);
        return () => clearInterval(autoScrollRef.current);
    }, [certificates.length, selectedCert]);

    const handleCarClick = c => setSelectedCert(c);
    const handleClosePanel = () => setSelectedCert(null);
    const handleDelete = async (cert) => {
        try {
            const res = await fetch(`/api/certificates?id=${cert._id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            toast.success('Certificate deleted');
            handleClosePanel();
            onRefreshCertificates?.();
        } catch { toast.error('Could not delete certificate.'); }
    };
    const handleCertAdded = () => {
        if (submittingRef.current) return;
        submittingRef.current = true;
        setShowAddModal(false);
        onRefreshCertificates?.();
        setTimeout(() => { submittingRef.current = false; }, 800);
    };

    return (
        <>
            <section style={{ padding: '80px 0 130px', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', padding: '0 40px' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, color: '#1C1C1C' }}>Certificates</h2>
                    {!readOnly && <button onClick={() => setShowAddModal(true)} className="btn-gold">+ Add Certificate</button>}
                </div>

                {certificates.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 48px', fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B6560' }}>
                        No certificates yet. Click <strong style={{ color: '#B8860B' }}>+ Add Certificate</strong> to get started.
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        {/* Ballast bed */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '62px', background: 'linear-gradient(180deg,#2e2010 0%,#1a1208 60%,#0c0905 100%)' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(90,65,30,0.55) 1px,transparent 1px)', backgroundSize: '7px 7px' }} />
                        </div>

                        {/* Sleepers */}
                        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', gap: '20px', overflow: 'hidden', padding: '0 8px' }}>
                            {Array.from({ length: 120 }).map((_, i) => (
                                <div key={i} style={{ flexShrink: 0, width: '11px', height: '34px', background: 'linear-gradient(90deg,#3a2918,#5c4232,#3a2918)', borderRadius: '2px', boxShadow: '0 3px 6px rgba(0,0,0,0.6)' }} />
                            ))}
                        </div>

                        {/* Rails */}
                        <div style={{ position: 'absolute', bottom: '34px', left: 0, right: 0, height: '8px', background: 'linear-gradient(180deg,#7a8a9a 0%,#b8c8d8 25%,#e8f0f8 50%,#b8c8d8 75%,#6a7a8a 100%)', boxShadow: '0 3px 10px rgba(0,0,0,0.6)' }} />
                        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, height: '8px', background: 'linear-gradient(180deg,#7a8a9a 0%,#b8c8d8 25%,#e8f0f8 50%,#b8c8d8 75%,#6a7a8a 100%)', boxShadow: '0 3px 10px rgba(0,0,0,0.6)' }} />

                        {/* Scrollable train — engine at right end, cars scroll left */}
                        <div
                            ref={scrollRef}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                            style={{ display: 'flex', alignItems: 'flex-end', overflowX: 'auto', overflowY: 'visible', paddingRight: 60, paddingLeft: 60, paddingBottom: 62, paddingTop: 24, cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div style={{ flexShrink: 0, width: '80px' }} />
                            {certificates.map((c, i) => (
                                <CertCar key={c._id} certificate={c} index={i} isActive={selectedCert?._id === c._id} onClick={() => handleCarClick(c)} />
                            ))}
                            <CertEngine />
                        </div>
                    </div>
                )}
            </section>

            <CertificateDetailPanel certificate={selectedCert} isOpen={!!selectedCert} onClose={handleClosePanel} onEdit={!readOnly ? () => { setEditingCert(selectedCert); setSelectedCert(null); } : undefined} onDelete={selectedCert && !readOnly ? () => handleDelete(selectedCert) : undefined} readOnly={readOnly} />
            {!readOnly && <AddCertificateModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onCertificateAdded={handleCertAdded} />}
            <EditCertificateModal isOpen={!!editingCert} onClose={() => setEditingCert(null)} certificate={editingCert} onCertificateUpdated={() => { setEditingCert(null); onRefreshCertificates?.(); }} />

            <style>{`
                @keyframes levitate { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-11px)} }
                @keyframes smokeRise { 0%{transform:translateY(0) scale(1);opacity:0.65} 100%{transform:translateY(-45px) scale(2.8);opacity:0} }
                @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
            `}</style>
        </>
    );
}
