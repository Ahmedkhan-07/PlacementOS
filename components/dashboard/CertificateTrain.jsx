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
            background: 'radial-gradient(circle at 35% 35%, #4a4a4a, #1a1a1a 70%)',
            border: '2px solid #222',
            boxShadow: '0 4px 10px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.06)',
            position: 'relative',
            animation: 'spin 1.2s linear infinite',
        }}>
            {/* Spokes */}
            {[0, 45, 90, 135].map(a => (
                <div key={a} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '44%', height: '1.5px',
                    background: 'rgba(255,255,255,0.05)',
                    transformOrigin: 'left center',
                    transform: `translateY(-50%) rotate(${a}deg)`,
                }} />
            ))}
            {/* Center Cap */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '32%', height: '32%',
                background: 'radial-gradient(circle at 30% 30%,#D4A017,#8B6200)',
                borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                boxShadow: '0 0 4px rgba(212,160,23,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                border: '1px solid rgba(0,0,0,0.2)',
            }} />
        </div>
    );
}

/* ─── Locomotive Engine (faces LEFT) ────────────────────────────────── */
function CertEngine() {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, flexDirection: 'row-reverse' }}>
            {/* Heavy Coupler (right end) */}
            <div style={{ width: '18px', height: '6px', background: 'linear-gradient(180deg,#333,#1a1a1a)', borderRadius: '4px', alignSelf: 'center', marginBottom: '18px', boxShadow: '0 4px 8px rgba(0,0,0,0.8)' }} />

            <div style={{ position: 'relative', width: '320px', height: '260px' }}>

                {/* Smoke System (Mirrored) */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                        position: 'absolute', top: `${-30 - i * 22}px`, right: `${40 + i * 10}px`,
                        width: `${16 + i * 10}px`, height: `${16 + i * 10}px`,
                        background: `radial-gradient(circle, rgba(200,200,200,${0.3 - i * 0.05}) 0%, rgba(80,80,80,0) 75%)`,
                        borderRadius: '50%', filter: `blur(${4 + i * 2.5}px)`,
                        animation: 'smokeRise 3.5s ease-out infinite reverse',
                        animationDelay: `${i * 0.4}s`,
                    }} />
                ))}

                {/* Heavy Cast-Iron Stack */}
                <div style={{
                    position: 'absolute', top: '-10px', right: '32px',
                    width: '24px', height: '45px',
                    background: 'linear-gradient(90deg, #0a0a0a 0%, #202020 30%, #0a0a0a 100%)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)',
                }}>
                    <div style={{ position: 'absolute', top: '-8px', right: '-6px', width: '36px', height: '10px', background: '#050505', borderRadius: '5px 5px 2px 2px', borderBottom: '1px solid #1a1a1a' }} />
                </div>

                {/* Massive Boiler Assembly */}
                <div style={{
                    position: 'absolute', bottom: '30px', right: '65px', width: '220px', height: '115px',
                    background: 'linear-gradient(175deg, #222 0%, #151515 45%, #050505 100%)',
                    borderRadius: '50px 8px 6px 6px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '5px', right: '20px', left: '50px', height: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', filter: 'blur(3px)' }} />
                    <div style={{ position: 'absolute', top: '22px', left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, #333, #666, #333)', opacity: 0.3 }} />
                    
                    {[25, 75, 125, 175].map((x, i) => (
                        <div key={i} style={{ position: 'absolute', bottom: '20px', right: `${x}px`, width: '3px', height: '80px', background: 'rgba(0,0,0,0.5)', boxShadow: '-1px 0 0 rgba(255,255,255,0.02)' }} />
                    ))}
                    
                    {/* Steam Dome */}
                    <div style={{ position: 'absolute', top: '-25px', right: '60px', width: '65px', height: '35px', background: 'linear-gradient(180deg,#1a1a1a,#0a0a0a)', borderRadius: '50% 50% 0 0', boxShadow: 'inset 0 5px 8px rgba(255,255,255,0.05),0 4px 6px rgba(0,0,0,0.5)' }} />
                </div>

                {/* Command Cab */}
                <div style={{
                    position: 'absolute', bottom: '30px', right: '0px',
                    width: '85px', height: '155px',
                    background: 'linear-gradient(155deg, #222, #111, #050505)',
                    borderRadius: '10px 10px 6px 6px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.05)',
                    overflow: 'hidden'
                }}>
                    {/* Golden Window Outlining */}
                    <div style={{ position: 'absolute', top: '15px', right: '15px', width: '35px', height: '40px', background: '#020202', borderRadius: '4px', border: '1.5px solid #8B6200', boxShadow: 'inset 0 0 10px rgba(139,98,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', height: '1px', background: 'rgba(139,98,0,0.2)' }} />
                    </div>
                </div>

                {/* Pilot (Front End Facing Left) */}
                <div style={{
                    position: 'absolute', bottom: '30px', left: '0px',
                    width: '40px', height: '115px',
                    background: 'linear-gradient(-90deg, #0a0a0a, #1a1a1a)',
                    borderRadius: '15px 0 6px 15px',
                }}>
                    <div style={{ position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)', width: '22px', height: '22px', background: 'radial-gradient(circle, #fff, #ffe0e0 40%, #ff8c00)', borderRadius: '50%', boxShadow: '0 0 30px 15px rgba(255,140,0,0.3), 0 0 70px 30px rgba(255,140,0,0.05)' }} />
                </div>

                {/* Underframe Skirting */}
                <div style={{ position: 'absolute', bottom: '18px', left: '5px', right: '0px', height: '15px', background: 'linear-gradient(180deg,#1a1a1a,#000)', borderRadius: '6px', boxShadow: '0 3px 6px rgba(0,0,0,0.6)' }} />

                {/* Bogies */}
                <div style={{ position: 'absolute', bottom: '-8px', right: '16px', display: 'flex', gap: '18px' }}><Wheel size={34} /><Wheel size={34} /></div>
                <div style={{ position: 'absolute', bottom: '-8px', left: '22px', display: 'flex', gap: '18px' }}><Wheel size={34} /><Wheel size={34} /></div>

                {/* Drive Rod */}
                <div style={{ position: 'absolute', bottom: '12px', right: '35px', left: '40px', height: '8px', background: 'linear-gradient(180deg,#555,#222,#111)', borderRadius: '5px', boxShadow: '0 3px 6px rgba(0,0,0,0.7)', border: '1.2px solid #1a1a1a' }} />
            </div>
        </div>
    );
}

/* ─── Flatcar + Floating Certificate Card ───────────────────────────── */
function CertCar({ certificate, isActive, onClick, index }) {
    const displayIndex = (index + 1).toString().padStart(2, '0');
    const watermarkText = (certificate.issuer || certificate.name.split(' ')[0]).toUpperCase();

    const formatDate = (d) => {
        if (!d) return '';
        try { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); } catch { return ''; }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, flexDirection: 'row-reverse' }}>
            <div style={{ position: 'relative', width: '310px' }}>

                {/* ── PREMIUM CERTIFICATE CARD ───────────────────────────────── */}
                <div
                    onClick={onClick}
                    className="card"
                    style={{
                        margin: '0 8px 18px',
                        background: isActive
                            ? 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)'
                            : 'var(--surface)',
                        borderRadius: '20px',
                        border: isActive
                            ? '2.5px solid var(--gold)'
                            : '1.5px solid var(--border)',
                        boxShadow: isActive
                            ? '0 20px 50px rgba(201, 162, 58, 0.15), inset 0 1px 1px rgba(255,255,255,0.05)'
                            : '0 12px 30px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        padding: '24px',
                        height: '240px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        userSelect: 'none',
                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        transform: isActive ? 'translateY(-10px)' : 'translateY(0)',
                    }}
                    onMouseEnter={(e) => {
                        if (!isActive) {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.borderColor = 'var(--gold)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(201, 162, 58, 0.12)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isActive) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.05)';
                        }
                    }}
                >
                    {/* Top Right: Large Number (Mirrored) */}
                    <div style={{ 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: '28px', 
                        fontWeight: 900, 
                        color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                        opacity: isActive ? 1 : 0.6,
                        marginBottom: '10px',
                        textAlign: 'right'
                    }}>
                        {displayIndex}
                    </div>

                    {/* Middle: Cert Title with Watermark */}
                    <div style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        position: 'relative'
                    }}>
                        {/* Faded Background Text */}
                        <div style={{
                            position: 'absolute',
                            fontSize: '60px',
                            fontWeight: 900,
                            letterSpacing: '0.05em',
                            color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                            opacity: isActive ? 0.04 : 0.02,
                            textAlign: 'center',
                            zIndex: 0,
                            pointerEvents: 'none',
                            textTransform: 'uppercase',
                        }}>
                            {watermarkText}
                        </div>

                        {/* Actual Title */}
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '22px',
                            fontWeight: 800,
                            color: 'var(--text)',
                            textAlign: 'center',
                            margin: 0,
                            zIndex: 1,
                            position: 'relative',
                            lineHeight: 1.2
                        }}>
                            {certificate.name}
                        </h3>
                    </div>

                    {/* Bottom: Info Section ────────────────────────── */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: 'auto' }}>
                        <p style={{ 
                            fontFamily: "'Inter', sans-serif", 
                            fontSize: '10px', 
                            fontWeight: 900, 
                            color: 'var(--gold)', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            margin: '0 0 10px 0'
                        }}>
                            Registered Credential
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ 
                                width: '32px', height: '32px', borderRadius: '8px', 
                                background: 'var(--gold)', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '14px', border: '1px solid var(--border)',
                                opacity: 0.1
                            }}>🏆</div>
                            <div>
                                <p style={{ 
                                    fontFamily: "'Inter', sans-serif", 
                                    fontSize: '13px', 
                                    color: 'var(--text)', 
                                    margin: 0,
                                    fontWeight: 700,
                                    lineHeight: 1
                                }}>
                                    {certificate.issuer}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <p style={{ 
                                        fontFamily: "'Inter', sans-serif", 
                                        fontSize: '11px', 
                                        color: 'var(--text-muted)', 
                                        margin: '2px 0 0 0'
                                    }}>
                                        Verified Achievement
                                    </p>
                                    {certificate.credentialUrl && (
                                        <a 
                                            href={certificate.credentialUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ 
                                                fontSize: '10px', 
                                                color: 'var(--gold)', 
                                                textDecoration: 'none', 
                                                fontWeight: 800,
                                                letterSpacing: '0.05em',
                                                borderBottom: '1.5px solid var(--gold)',
                                                marginTop: '2px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            VERIFY ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Golden Sheen */}
                    {isActive && (
                        <div style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: 'radial-gradient(circle at center, rgba(212,160,23,0.03) 0%, transparent 70%)', 
                            pointerEvents: 'none' 
                        }} />
                    )}
                </div>

                {/* Industrial Flatcar Deck */}
                <div style={{
                    height: '24px', margin: '0 4px',
                    background: 'linear-gradient(180deg,#1e2c1e 0%,#121e12 60%,#080f08 100%)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.05)',
                    position: 'relative',
                    border: '1px solid #060a06',
                }}>
                    {[25, 65, 105, 145, 185, 225, 265].map(x => (
                        <div key={x} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: '1.5px', background: 'rgba(0,0,0,0.3)', boxShadow: '0.5px 0 0 rgba(255,255,255,0.03)' }} />
                    ))}
                </div>

                {/* Industrial Wheel trucks */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 25px', marginTop: '2px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}><Wheel size={24} /><Wheel size={24} /></div>
                    <div style={{ display: 'flex', gap: '10px' }}><Wheel size={24} /><Wheel size={24} /></div>
                </div>
            </div>

            {/* Heavy Coupler */}
            <div style={{ width: '16px', height: '5px', background: 'linear-gradient(180deg,#2a2a2a,#0a0a0a)', borderRadius: '3px', alignSelf: 'center', marginBottom: '22px', boxShadow: '0 2px 6px rgba(0,0,0,0.8)' }} />
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
        ref.current.scrollLeft = scrollLeftPos.current - (e.pageX - ref.current.offsetLeft - startX.current) * 1.8;
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

    useEffect(() => {
        if (!scrollRef.current || certificates.length === 0) return;
        if (scrollRef.current.scrollLeft === 0) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
        autoScrollRef.current = setInterval(() => {
            if (!scrollRef.current || selectedCert || isDraggingRef.current) return;
            const el = scrollRef.current;
            if (el.scrollLeft <= 0) { el.scrollLeft = el.scrollWidth; }
            else { el.scrollLeft -= 0.9; }
        }, 30);
        return () => clearInterval(autoScrollRef.current);
    }, [certificates.length, selectedCert]);

    const isDraggingRef = useRef(false);
    const handleMouseDown = (e) => { isDraggingRef.current = false; onMouseDown(e); };
    const handleMouseMove = (e) => { isDraggingRef.current = true; onMouseMove(e); };
    const handleMouseUp = () => { onMouseUp(); setTimeout(() => { isDraggingRef.current = false; }, 80); };

    const handleCarClick = c => {
        if (isDraggingRef.current) return;
        setSelectedCert(c);
    };

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
            <section id="certificates" style={{ padding: '80px 0 100px', position: 'relative', zIndex: 1, background: 'var(--bg)', transition: 'background 0.4s ease' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', padding: '0 40px' }}>
                    <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '38px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>Certificates</h2>
                    {!readOnly && (
                        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '12px 28px', fontSize: '13px' }}>+ Add Certificate</button>
                    )}
                </div>

                {certificates.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 48px', fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--text-muted)', background: 'var(--surface)', border: '1px dashed var(--border)', margin: '0 40px', borderRadius: '24px' }}>
                        No certificates yet. Click <strong style={{ color: 'var(--accent)' }}>+ Add Certificate</strong> to start your train journey.
                    </div>
                ) : (
                    <div style={{ position: 'relative', cursor: 'grab' }}>
                        
                        {/* High-Depth Ballast/Track Bed */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px', background: 'linear-gradient(180deg, #322618 0%, #1a1208 50%, #050402 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(100,80,50,0.4) 1px, transparent 1px)', backgroundSize: '6px 6px', opacity: 0.8 }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(50,40,20,0.6) 1.5px, transparent 1.5px)', backgroundSize: '11px 11px', backgroundPosition: '3px 3px' }} />
                        </div>

                        {/* Heavy Oak Sleepers */}
                        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', gap: '22px', overflow: 'hidden', padding: '0 8px' }}>
                            {Array.from({ length: 100 }).map((_, i) => (
                                <div key={i} style={{ flexShrink: 0, width: '13px', height: '36px', background: 'linear-gradient(90deg, #3a2918, #4d3827, #3a2918)', borderRadius: '1px', boxShadow: '0 3px 6px rgba(0,0,0,0.8)', border: '1px solid rgba(0,0,0,0.4)' }} />
                            ))}
                        </div>

                        {/* Cold-Rolled Steel Rails */}
                        <div style={{ position: 'absolute', bottom: '38px', left: 0, right: 0, height: '8px', background: 'linear-gradient(180deg, #44505c 0%, #a4b0bc 20%, #e8f0f8 45%, #a4b0bc 70%, #303a44 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.7)', inset: '0 1px 1px rgba(255,255,255,0.2)' }} />
                        <div style={{ position: 'absolute', bottom: '18px', left: 0, right: 0, height: '8px', background: 'linear-gradient(180deg, #44505c 0%, #a4b0bc 20%, #e8f0f8 45%, #a4b0bc 70%, #303a44 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.7)', inset: '0 1px 1px rgba(255,255,255,0.2)' }} />

                        {/* Scrollable Assemblage — Mirror Layout */}
                        <div
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{ display: 'flex', alignItems: 'flex-end', overflowX: 'auto', overflowY: 'visible', paddingRight: 80, paddingLeft: 80, paddingBottom: 65, paddingTop: 40, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div style={{ flexShrink: 0, width: '120px' }} />
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
                @keyframes levitate { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
                @keyframes smokeRise { 
                    0%{transform:translateY(0) scale(0.6); opacity:0} 
                    20%{opacity:0.6}
                    100%{transform:translateY(-60px) scale(3.5); opacity:0} 
                }
                @keyframes spin { from{transform:rotate(360deg)} to{transform:rotate(0)} }
                #certificates::-webkit-scrollbar { display: none; }
            `}</style>
        </>
    );
}
