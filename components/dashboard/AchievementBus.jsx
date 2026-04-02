'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import AchievementDetailPanel from '@/components/panels/AchievementDetailPanel';
import AddAchievementModal from '@/components/modals/AddAchievementModal';
import EditAchievementModal from '@/components/modals/EditAchievementModal';

/* ─── Realistic Bus Tire ─────────────────────────────────────────────── */
function Tire({ size = 42 }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 35% 35%, #333 0%, #111 75%, #000 100%)',
            border: '3px solid #1a1a1a',
            boxShadow: '0 6px 12px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.05)',
            position: 'relative',
        }}>
            {/* Hub */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '60%', height: '60%', borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #555 0%, #222 65%, #111 100%)',
                border: '1px solid #333',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
            }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '30%', height: '30%', borderRadius: '50%', background: '#444', border: '1px solid #111' }} />
            </div>
        </div>
    );
}

/* ─── Pod Car (for each Achievement) ────────────────────────────────── */
function BusCar({ achievement, index, isActive, onClick }) {
    const displayIndex = (index + 1).toString().padStart(2, '0');
    const watermarkText = (achievement.issuer || 'AWARD').toUpperCase();

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                    onClick={onClick}
                    className="card"
                    style={{
                        margin: '0 8px 0',
                        background: isActive
                            ? 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)'
                            : 'var(--surface)',
                        borderRadius: '24px',
                        border: isActive
                            ? '2px solid var(--accent)'
                            : '1.5px solid var(--border)',
                        boxShadow: isActive
                            ? '0 20px 50px rgba(59,130,246,0.15), inset 0 1px 1px rgba(255,255,255,0.05)'
                            : '0 12px 30px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        padding: '28px',
                        height: '340px',
                        width: '310px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        userSelect: 'none',
                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        transform: isActive ? 'translateY(-14px)' : 'translateY(0)',
                    }}
                    onMouseEnter={(e) => {
                        if (!isActive) {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(59,130,246,0.1)';
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
                    {/* Interior Detailing */}
                    <div style={{ 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: '32px', 
                        fontWeight: 900, 
                        color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                        opacity: isActive ? 1 : 0.6,
                        marginBottom: '15px'
                    }}>
                        {displayIndex}
                    </div>

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            fontSize: '52px',
                            fontWeight: 900,
                            letterSpacing: '0.05em',
                            color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                            opacity: isActive ? 0.05 : 0.02,
                            textAlign: 'center',
                            zIndex: 0,
                            pointerEvents: 'none',
                            textTransform: 'uppercase',
                            filter: 'blur(1px)'
                        }}>
                            {watermarkText}
                        </div>

                        <h3 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '21px',
                            fontWeight: 800,
                            color: 'var(--text)',
                            textAlign: 'center',
                            margin: 0,
                            letterSpacing: '-0.03em',
                            textTransform: 'uppercase',
                            zIndex: 1,
                            position: 'relative',
                            lineHeight: 1.2,
                            textShadow: isActive ? '0 0 20px rgba(59,130,246,0.1)' : 'none'
                        }}>
                            {achievement.title}
                        </h3>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '22px', marginTop: 'auto' }}>
                        <p style={{ 
                            fontFamily: "'Inter', sans-serif", 
                            fontSize: '11px', 
                            fontWeight: 900, 
                            color: 'var(--accent)', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            margin: '0 0 10px 0'
                        }}>
                            Milestone Logged
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', opacity: 0.8 }} />
                            <p style={{ 
                                fontFamily: "'Inter', sans-serif", 
                                fontSize: '14px', 
                                color: 'var(--text)', 
                                margin: 0,
                                fontWeight: 700
                            }}>
                                {achievement.date ? new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Verified Award'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cyber Chassis / Base Under individual pod */}
                <div style={{ 
                    width: '280px', height: '18px', 
                    background: 'linear-gradient(180deg, #1e293b 0%, #020617 100%)', 
                    borderRadius: '4px 4px 12px 12px', 
                    marginTop: '2px',
                    border: '1px solid rgba(59,130,246,0.1)',
                    position: 'relative',
                    boxShadow: isActive ? '0 10px 20px rgba(59,130,246,0.2)' : 'none'
                }}>
                    <div style={{ position: 'absolute', bottom: '4px', left: '20px', width: '30px', height: '2px', background: isActive ? 'var(--accent)' : 'transparent', filter: 'blur(2px)' }} />
                    <div style={{ position: 'absolute', bottom: '4px', right: '20px', width: '30px', height: '2px', background: isActive ? 'var(--accent)' : 'transparent', filter: 'blur(2px)' }} />
                </div>

                {/* Ground Clearance Tires */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '240px', marginTop: '4px', marginBottom: '18px' }}>
                    <Tire size={34} />
                    <Tire size={34} />
                </div>
            </div>

            {/* Magnetic Coupling Link */}
            <div style={{ 
                width: '18px', height: '5px', 
                background: 'linear-gradient(90deg, #1e293b, var(--accent))', 
                alignSelf: 'center', marginBottom: '36px',
                opacity: 0.4
            }} />
        </div>
    );
}

/* ─── Main AchievementBus Component ─────────────────────────────────── */
export default function AchievementBus({ achievements, onRefreshAchievements, readOnly = false }) {
    const [selectedAch, setSelectedAch] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAch, setEditingAch] = useState(null);
    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);
    const submittingRef = useRef(false);

    // Modern Drag Scroll Hook Logic
    const useDragScroll = () => {
        const [isDown, setIsDown] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollLeft, setScrollLeft] = useState(0);

        const onMouseDown = (e) => {
            setIsDown(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        };
        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            scrollRef.current.scrollLeft = scrollLeft - walk;
        };
        const onMouseUp = () => setIsDown(false);
        return { onMouseDown, onMouseMove, onMouseUp };
    };

    const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll();
    const isDraggingRef = useRef(false);
    const handleMouseDown = (e) => { isDraggingRef.current = false; onMouseDown(e); };
    const handleMouseMove = (e) => { isDraggingRef.current = true; onMouseMove(e); };
    const handleMouseUp = () => { onMouseUp(); setTimeout(() => { isDraggingRef.current = false; }, 80); };

    useEffect(() => {
        if (!scrollRef.current || selectedAch) return;
        autoScrollRef.current = setInterval(() => {
            if (!scrollRef.current || selectedAch || isDraggingRef.current) return;
            const el = scrollRef.current;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) { el.scrollLeft = 0; }
            else { el.scrollLeft += 0.8; }
        }, 30);
        return () => clearInterval(autoScrollRef.current);
    }, [achievements.length, selectedAch]);

    const handleCardClick = (a) => {
        if (isDraggingRef.current) return;
        setSelectedAch(a);
    };

    const handleClosePanel = () => setSelectedAch(null);
    const handleDelete = async (ach) => {
        try {
            const res = await fetch(`/api/achievements?id=${ach._id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            toast.success('Achievement deleted');
            handleClosePanel();
            onRefreshAchievements?.();
        } catch { toast.error('Could not delete achievement.'); }
    };

    const handleAchAdded = () => {
        if (submittingRef.current) return;
        submittingRef.current = true;
        setShowAddModal(false);
        onRefreshAchievements?.();
        setTimeout(() => { submittingRef.current = false; }, 800);
    };

    return (
        <>
            <section id="achievements" style={{ padding: '80px 0 100px', position: 'relative', zIndex: 1, background: 'var(--bg)', transition: 'background 0.4s ease' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', padding: '0 40px' }}>
                    <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '38px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>Achievements</h2>
                    {!readOnly && (
                        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '12px 28px', fontSize: '13px' }}>+ Add Achievement</button>
                    )}
                </div>

                {achievements.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 48px', fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--text-muted)', background: 'var(--surface)', border: '1px dashed var(--border)', margin: '0 40px', borderRadius: '24px' }}>
                        No achievements yet. Click <strong style={{ color: 'var(--accent)' }}>+ Add Achievement</strong> to launch your pods.
                    </div>
                ) : (
                    <div style={{ position: 'relative', cursor: 'grab' }}>
                        
                        {/* Cinematic Cyber Road ─────────────────────────── */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(180deg, #050505 0%, #111 60%, #000 100%)', boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.8)' }}>
                            {/* Scanning Grid / Laser Guideline */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.6, boxShadow: '0 0 20px var(--accent)' }} />
                            
                            {/* Dynamic Lane Markers */}
                            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', gap: '80px', overflow: 'hidden', padding: '0 40px' }}>
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div key={i} style={{ flexShrink: 0, width: '60px', height: '3px', background: 'rgba(59,130,246,0.15)', borderRadius: '2px', boxShadow: '0 0 10px rgba(59,130,246,0.1)' }} />
                                ))}
                            </div>
                        </div>

                        {/* Scrollable Road for Pods */}
                        <div
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{
                                display: 'flex', alignItems: 'flex-end',
                                overflowX: 'auto', overflowY: 'visible',
                                paddingLeft: 80, paddingBottom: 60, paddingTop: 40,
                                scrollbarWidth: 'none', msOverflowStyle: 'none',
                            }}
                        >
                            {/* ── HYPER-ENGINE NOSE POD ────────────────────── */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, marginRight: '12px' }}>
                                <div style={{ 
                                    position: 'relative', width: '280px', height: '200px', 
                                    background: 'linear-gradient(145deg, #1e293b, #020617)', 
                                    borderRadius: '120px 40px 15px 15px', 
                                    border: '2px solid rgba(59,130,246,0.2)', 
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 2px 5px rgba(255,255,255,0.05)',
                                    overflow: 'hidden'
                                }}>
                                    {/* High-Tech Cockpit Glass */}
                                    <div style={{ 
                                        position: 'absolute', top: '20px', left: '40px', width: '160px', height: '80px', 
                                        background: 'linear-gradient(180deg, rgba(59,130,246,0.3) 0%, rgba(15,23,42,0.8) 100%)', 
                                        borderRadius: '60px 15px 8px 8px', 
                                        border: '1.5px solid rgba(59,130,246,0.4)',
                                        boxShadow: 'inset 0 0 20px rgba(59,130,246,0.2)'
                                    }}>
                                        {/* Internal HUD Glow */}
                                        <div style={{ position: 'absolute', top: '15px', left: '20px', width: '30px', height: '2px', background: 'var(--accent)', opacity: 0.6, boxShadow: '0 0 10px var(--accent)' }} />
                                    </div>

                                    {/* Neon Headlight Fins */}
                                    <div style={{ position: 'absolute', bottom: '40px', left: '-5px', width: '40px', height: '4px', background: '#3b82f6', boxShadow: '0 0 20px #3b82f6', borderRadius: '0 2px 2px 0' }} />
                                    <div style={{ position: 'absolute', bottom: '55px', left: '-5px', width: '30px', height: '4px', background: '#3b82f6', boxShadow: '0 0 20px #3b82f6', borderRadius: '0 2px 2px 0', opacity: 0.7 }} />

                                    {/* Side Ventilation Grills */}
                                    <div style={{ position: 'absolute', bottom: '30px', right: '40px', display: 'flex', gap: '4px' }}>
                                        {[1,2,3,4].map(i => <div key={i} style={{ width: '4px', height: '25px', background: 'rgba(0,0,0,0.4)', borderRadius: '1px' }} />)}
                                    </div>

                                    {/* Red Status Light */}
                                    <div style={{ position: 'absolute', top: '15px', right: '15px', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444', animation: 'levitate 2s infinite ease-in-out' }} />

                                    {/* Structural Panel Lines */}
                                    <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
                                    
                                    {/* Tiny Ground Clearance Wheels */}
                                    <div style={{ position: 'absolute', bottom: '-8px', left: '60px' }}><Tire size={36} /></div>
                                    <div style={{ position: 'absolute', bottom: '-8px', right: '60px' }}><Tire size={36} /></div>
                                </div>

                                {/* Magnetic Coupling Arm */}
                                <div style={{ 
                                    width: '28px', height: '6px', 
                                    background: 'linear-gradient(90deg, #1e293b, var(--accent))', 
                                    boxShadow: '0 0 10px var(--accent)',
                                    alignSelf: 'center', marginBottom: '32px' 
                                }} />
                            </div>

                            {achievements.map((a, i) => (
                                <BusCar
                                    key={a._id || i}
                                    achievement={a}
                                    index={i}
                                    isActive={selectedAch?._id === a._id}
                                    onClick={() => handleCardClick(a)}
                                />
                            ))}
                            <div style={{ flexShrink: 0, width: '150px' }} />
                        </div>
                    </div>
                )}
            </section>

            <AchievementDetailPanel achievement={selectedAch} isOpen={!!selectedAch} onClose={handleClosePanel} onEdit={!readOnly ? () => { setEditingAch(selectedAch); setSelectedAch(null); } : undefined} onDelete={selectedAch && !readOnly ? () => handleDelete(selectedAch) : undefined} readOnly={readOnly} />
            {!readOnly && <AddAchievementModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAchievementAdded={handleAchAdded} />}
            <EditAchievementModal isOpen={!!editingAch} onClose={() => setEditingAch(null)} achievement={editingAch} onAchievementUpdated={() => { setEditingAch(null); onRefreshAchievements?.(); }} />

            <style>{`
                #achievements::-webkit-scrollbar { display: none; }
                @keyframes levitate { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
            `}</style>
        </>
    );
}
