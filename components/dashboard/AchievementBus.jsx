'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import AchievementDetailPanel from '@/components/panels/AchievementDetailPanel';
import AddAchievementModal from '@/components/modals/AddAchievementModal';
import EditAchievementModal from '@/components/modals/EditAchievementModal';

/* ─── Realistic Bus Tire ─────────────────────────────────────────────── */
function Tire({ size = 40 }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 36% 30%, #2e2e2e, #080808)',
            border: '3px solid #141414',
            boxShadow: '0 4px 14px rgba(0,0,0,0.85), inset 0 1px 2px rgba(255,255,255,0.05)',
            position: 'relative',
        }}>
            {/* Rim ring */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '58%', height: '58%', borderRadius: '50%',
                background: 'radial-gradient(circle at 36% 34%, #6e6e6e, #222)',
                border: '1.5px solid #444',
            }}>
                {/* 5 lug nuts */}
                {[0, 72, 144, 216, 288].map(a => (
                    <div key={a} style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: '5px', height: '5px', background: '#aaa',
                        borderRadius: '50%',
                        transform: `rotate(${a}deg) translate(6px,-2.5px)`,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }} />
                ))}
                {/* Hub cap */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '24%', height: '24%', borderRadius: '50%', background: 'linear-gradient(135deg,#d0d0d0,#888)', boxShadow: '0 0 3px rgba(0,0,0,0.4)' }} />
            </div>
        </div>
    );
}

/* ─── Single Complete Bus ────────────────────────────────────────────── */
function SingleBus({ achievement, isActive, onClick, index }) {
    const busColor = [
        { body: '#0d2b45', stripe: 'rgba(30,160,255,0.9)', glow: 'rgba(30,150,255,0.6)', dest: '#00aaff' },
        { body: '#1a0d2e', stripe: 'rgba(160,80,255,0.9)', glow: 'rgba(140,60,255,0.6)', dest: '#aa44ff' },
        { body: '#0d2e1a', stripe: 'rgba(30,210,100,0.9)', glow: 'rgba(20,200,90,0.6)', dest: '#00cc60' },
        { body: '#2e1a0d', stripe: 'rgba(255,140,30,0.9)', glow: 'rgba(240,120,20,0.6)', dest: '#ff8800' },
        { body: '#2e0d0d', stripe: 'rgba(255,60,60,0.9)', glow: 'rgba(240,40,40,0.6)', dest: '#ff2222' },
    ][index % 5];

    const BUS_W = 300;
    const BUS_H = 92;

    return (
        <div
            onClick={onClick}
            style={{
                flexShrink: 0, marginRight: '32px',
                position: 'relative', cursor: 'pointer', userSelect: 'none',
                width: `${BUS_W}px`,
            }}
        >
            {/* ── Full bus body ── */}
            <div style={{
                position: 'relative', width: BUS_W, height: BUS_H,
                background: `linear-gradient(175deg, ${busColor.body} 0%, #080c14 100%)`,
                borderRadius: '14px 24px 6px 6px',
                boxShadow: isActive
                    ? `0 0 0 2px ${busColor.dest}, 0 8px 32px ${busColor.glow}, 0 16px 48px rgba(0,0,0,0.6)`
                    : `0 8px 28px rgba(0,0,0,0.6)`,
                transition: 'box-shadow 0.3s',
                overflow: 'hidden',
            }}>

                {/* Roof curvature highlight */}
                <div style={{ position: 'absolute', top: 0, left: '12px', right: 0, height: '3px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)', borderRadius: '3px 3px 0 0' }} />

                {/* ── LED accent stripe ── */}
                <div style={{ position: 'absolute', top: '18px', left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,transparent 0%,${busColor.stripe} 20%,${busColor.stripe} 80%,transparent 100%)`, boxShadow: `0 0 12px 3px ${busColor.glow}` }} />

                {/* ── Destination board (front top) ── */}
                <div style={{
                    position: 'absolute', top: '4px', right: '14px',
                    width: '90px', height: '13px',
                    background: 'linear-gradient(90deg,#020a02,#041204)',
                    borderRadius: '3px',
                    border: '1px solid rgba(0,255,80,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    <span style={{ fontFamily: "'Courier New', monospace", fontSize: '6.5px', fontWeight: 700, color: '#00e060', letterSpacing: '0.14em', textShadow: `0 0 8px rgba(0,220,80,0.9)`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '86px', padding: '0 3px' }}>
                        {achievement.title.toUpperCase()}
                    </span>
                </div>

                {/* ── CINEMATIC PANORAMIC WINDOW ── */}
                <div style={{
                    position: 'absolute', top: '22px', left: '70px', right: '12px', height: '58px',
                    border: isActive ? `1.5px solid ${busColor.stripe}` : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    boxShadow: isActive ? `0 0 18px 4px ${busColor.glow}, inset 0 0 12px rgba(0,0,0,0.4)` : 'inset 0 0 8px rgba(0,0,0,0.5)',
                    transition: 'border 0.3s, box-shadow 0.3s',
                }}>
                    {/* Full-bleed image backdrop */}
                    {achievement.imageUrl ? (
                        <img src={achievement.imageUrl} alt={achievement.title}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isActive ? 0.75 : 0.55, transition: 'opacity 0.3s' }} />
                    ) : (
                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${busColor.body},rgba(0,0,0,0.8))` }} />
                    )}

                    {/* Gradient text backdrop */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.55) 35%,rgba(0,0,0,0.75) 100%)' }} />

                    {/* Text overlay */}
                    <div style={{ position: 'absolute', inset: 0, padding: '7px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3px' }}>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.97)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2, textShadow: '0 1px 6px rgba(0,0,0,0.9)', margin: 0 }}>{achievement.title}</p>
                        {achievement.description && (
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '8px', color: isActive ? busColor.dest : 'rgba(255,255,255,0.55)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textShadow: '0 1px 4px rgba(0,0,0,0.8)', letterSpacing: '0.02em' }}>{achievement.description}</p>
                        )}
                    </div>

                    {/* Window glass glare */}
                    <div style={{ position: 'absolute', top: '3px', left: '5px', width: '3px', height: '12px', background: 'rgba(255,255,255,0.18)', borderRadius: '2px', transform: 'skewX(-8deg)' }} />
                    <div style={{ position: 'absolute', top: '3px', left: '11px', width: '1.5px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', transform: 'skewX(-8deg)' }} />
                </div>

                {/* ── Front cab section ── */}
                <div style={{
                    position: 'absolute', top: '0', left: '0', width: '68px', height: '100%',
                    background: `linear-gradient(170deg,${busColor.body},rgba(0,0,0,0.4))`,
                    borderRadius: '14px 0 0 6px',
                    borderRight: `1px solid rgba(255,255,255,0.06)`,
                }}>
                    {/* Windshield */}
                    <div style={{
                        position: 'absolute', top: '22px', left: '6px', right: '6px', height: '44px',
                        background: 'linear-gradient(160deg,rgba(100,180,255,0.18),rgba(40,100,220,0.08))',
                        border: '1px solid rgba(100,180,255,0.22)',
                        borderRadius: '3px',
                        boxShadow: isActive ? `inset 0 0 12px ${busColor.glow}` : 'none',
                    }}>
                        <div style={{ position: 'absolute', top: '5px', left: '5px', width: '5px', height: '16px', background: 'rgba(255,255,255,0.14)', borderRadius: '2px', transform: 'skewX(-8deg)' }} />
                    </div>
                    {/* DRL / headlight strip */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '4px', right: '4px', height: '4px', background: `linear-gradient(90deg,${busColor.stripe})`, borderRadius: '3px', boxShadow: `0 0 10px 2px ${busColor.glow}` }} />
                    {/* Main headlight */}
                    <div style={{ position: 'absolute', bottom: '2px', left: '6px', width: '24px', height: '8px', background: 'linear-gradient(180deg,rgba(255,240,180,0.9),rgba(255,200,60,0.5))', borderRadius: '3px 3px 2px 2px', boxShadow: '0 0 18px 5px rgba(255,210,80,0.5),0 0 40px 12px rgba(255,210,80,0.22)' }} />
                    {/* Side mirror */}
                    <div style={{ position: 'absolute', top: '26px', left: '-10px', width: '12px', height: '8px', background: 'linear-gradient(180deg,#1e2030,#10121e)', borderRadius: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
                </div>

                {/* ── Lower body stripe ── */}
                <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, height: '8px', background: `linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.7))` }}>
                    <div style={{ position: 'absolute', top: '3px', left: '70px', right: '14px', height: '1.5px', background: `linear-gradient(90deg,transparent,${busColor.stripe},transparent)`, opacity: 0.5 }} />
                </div>
            </div>

            {/* ── Chassis / axle bar ── */}
            <div style={{ height: '8px', background: 'linear-gradient(180deg,#0c0c0c,#050505)', margin: '0 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.7)' }} />

            {/* ── Tires ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: '2px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <Tire size={38} />
                    <Tire size={38} />
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <Tire size={38} />
                    <Tire size={38} />
                </div>
            </div>
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
export default function AchievementBus({ achievements, onRefreshAchievements, readOnly = false }) {
    const [selectedAch, setSelectedAch] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAch, setEditingAch] = useState(null);
    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);
    const submittingRef = useRef(false);
    const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll(scrollRef);

    useEffect(() => {
        if (!scrollRef.current || achievements.length === 0) return;
        autoScrollRef.current = setInterval(() => {
            if (!scrollRef.current || selectedAch) return;
            const el = scrollRef.current;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) { el.scrollLeft = 0; }
            else { el.scrollLeft += 0.8; }
        }, 30);
        return () => clearInterval(autoScrollRef.current);
    }, [achievements.length, selectedAch]);

    const handleCardClick = a => setSelectedAch(a);
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
            <section style={{ padding: '80px 0 100px', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', padding: '0 40px' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, color: '#1C1C1C' }}>Achievements</h2>
                    {!readOnly && (
                        <button onClick={() => setShowAddModal(true)} className="btn-primary">+ Add Achievement</button>
                    )}
                </div>

                {achievements.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 48px', fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B6560' }}>
                        No achievements yet. Click <strong style={{ color: '#2D6A4F' }}>+ Add Achievement</strong> to get started.
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        {/* Road surface */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px', background: 'linear-gradient(180deg,#181818,#0c0c0c)' }}>
                            <div style={{ position: 'absolute', top: '4px', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.08)' }} />
                            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', gap: '28px', overflow: 'hidden', padding: '0 20px' }}>
                                {Array.from({ length: 100 }).map((_, i) => (
                                    <div key={i} style={{ flexShrink: 0, width: '26px', height: '3px', background: 'rgba(255,220,0,0.3)', borderRadius: '2px' }} />
                                ))}
                            </div>
                            <div style={{ position: 'absolute', bottom: '4px', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.08)' }} />
                        </div>

                        {/* Scrollable row of buses */}
                        <div
                            ref={scrollRef}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                            style={{
                                display: 'flex', alignItems: 'flex-end',
                                overflowX: 'auto', overflowY: 'visible',
                                paddingLeft: 48, paddingBottom: 48, paddingTop: 20,
                                cursor: 'grab',
                                scrollbarWidth: 'none', msOverflowStyle: 'none',
                            }}
                        >
                            {achievements.map((a, i) => (
                                <SingleBus
                                    key={a._id}
                                    achievement={a}
                                    index={i}
                                    isActive={selectedAch?._id === a._id}
                                    onClick={() => handleCardClick(a)}
                                />
                            ))}
                            <div style={{ flexShrink: 0, width: '60px' }} />
                        </div>
                    </div>
                )}
            </section>

            <AchievementDetailPanel
                achievement={selectedAch}
                isOpen={!!selectedAch}
                onClose={handleClosePanel}
                onEdit={!readOnly ? () => { setEditingAch(selectedAch); setSelectedAch(null); } : undefined}
                onDelete={selectedAch && !readOnly ? () => handleDelete(selectedAch) : undefined}
                readOnly={readOnly}
            />
            {!readOnly && (
                <AddAchievementModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onAchievementAdded={handleAchAdded}
                />
            )}
            <EditAchievementModal
                isOpen={!!editingAch}
                onClose={() => setEditingAch(null)}
                achievement={editingAch}
                onAchievementUpdated={() => { setEditingAch(null); onRefreshAchievements?.(); }}
            />
        </>
    );
}
