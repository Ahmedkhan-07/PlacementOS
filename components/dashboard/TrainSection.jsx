'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import ProjectDetailPanel from '@/components/panels/ProjectDetailPanel';
import AddProjectModal from '@/components/modals/AddProjectModal';
import EditProjectModal from '@/components/modals/EditProjectModal';

/* ─── Wheel ─────────────────────────────────────────────────────────── */
function Wheel({ size = 28 }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 35% 35%, #4a4a4a, #1a1a1a 70%)',
            border: '2px solid #222',
            boxShadow: '0 4px 12px rgba(0,0,0,0.85), inset 0 1px 2px rgba(255,255,255,0.08)',
            position: 'relative',
            animation: 'spin 1.2s linear infinite',
        }}>
            {/* Spokes */}
            {[0, 45, 90, 135].map(a => (
                <div key={a} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '44%', height: '2px',
                    background: 'rgba(255,255,255,0.05)',
                    transformOrigin: 'left center',
                    transform: `translateY(-50%) rotate(${a}deg)`,
                }} />
            ))}
            {/* Center Cap */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '32%', height: '32%',
                background: 'radial-gradient(circle at 30% 30%, #D4A017, #8B6200)',
                borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                boxShadow: '0 0 6px rgba(212,160,23,0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
                border: '1px solid rgba(0,0,0,0.3)',
            }} />
        </div>
    );
}

/* ─── Locomotive Engine (faces RIGHT) ───────────────────────────────── */
function Engine() {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
            {/* Heavy Coupler (left end) */}
            <div style={{ width: '18px', height: '6px', background: 'linear-gradient(180deg, #333, #1a1a1a)', borderRadius: '4px', alignSelf: 'center', marginBottom: '18px', boxShadow: '0 4px 8px rgba(0,0,0,0.8)' }} />

            <div style={{ position: 'relative', width: '320px', height: '260px' }}>

                {/* Highly Realistic Smoke System (Scaled up) */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                        position: 'absolute', top: `${-30 - i * 22}px`, left: `${40 + i * 10}px`,
                        width: `${16 + i * 10}px`, height: `${16 + i * 10}px`,
                        background: `radial-gradient(circle, rgba(200,200,200,${0.6 - i * 0.08}) 0%, rgba(120,120,120,0) 75%)`,
                        borderRadius: '50%', filter: `blur(${4 + i * 2.5}px)`,
                        animation: 'smokeRise 3.5s ease-out infinite',
                        animationDelay: `${i * 0.4}s`,
                    }} />
                ))}

                {/* Heavy Cast-Iron Stack */}
                <div style={{
                    position: 'absolute', top: '-10px', left: '32px',
                    width: '24px', height: '45px',
                    background: 'linear-gradient(90deg, #0a0a0a 0%, #2a2a2a 30%, #0a0a0a 100%)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)',
                }}>
                    <div style={{ position: 'absolute', top: '-8px', left: '-6px', width: '36px', height: '10px', background: '#050505', borderRadius: '5px 5px 2px 2px', borderBottom: '1px solid #1a1a1a' }} />
                </div>

                {/* Massive Boiler Assembly */}
                <div style={{
                    position: 'absolute', bottom: '30px', left: '65px', width: '220px', height: '115px',
                    background: 'linear-gradient(175deg, #2a2a2a 0%, #1a1a1a 45%, #0a0a0a 100%)',
                    borderRadius: '8px 50px 6px 6px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '5px', left: '20px', right: '50px', height: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', filter: 'blur(3px)' }} />
                    <div style={{ position: 'absolute', top: '22px', left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, #444, #888, #444)', opacity: 0.3 }} />
                    
                    {/* Structural Rivet Bands */}
                    {[25, 75, 125, 175].map((x, i) => (
                        <div key={i} style={{
                            position: 'absolute', bottom: '20px', left: `${x}px`,
                            width: '3px', height: '80px',
                            background: 'rgba(0,0,0,0.5)',
                            boxShadow: '1px 0 0 rgba(255,255,255,0.02)',
                        }} />
                    ))}
                    
                    {/* Steam Dome */}
                    <div style={{
                        position: 'absolute', top: '-25px', left: '60px',
                        width: '65px', height: '35px',
                        background: 'linear-gradient(180deg, #1e2434, #121622)',
                        borderRadius: '50% 50% 0 0',
                        boxShadow: 'inset 0 5px 8px rgba(255,255,255,0.05), 0 4px 6px rgba(0,0,0,0.5)',
                    }} />
                </div>

                {/* Command Cab (Industrial Box Shape) */}
                <div style={{
                    position: 'absolute', bottom: '30px', left: '0px',
                    width: '85px', height: '155px',
                    background: 'linear-gradient(155deg, #222a3a, #151a25, #0a0e14)',
                    borderRadius: '10px 10px 6px 6px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.06)',
                    border: '1.2px solid rgba(255,255,255,0.02)',
                }}>
                    {/* Cab Windows */}
                    <div style={{
                        position: 'absolute', top: '15px', left: '10px', right: '10px', height: '55px',
                        background: 'linear-gradient(180deg, rgba(80,120,200,0.15), rgba(20,40,80,0.05))',
                        border: '2px solid #0a0a0a',
                        borderRadius: '5px',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
                    }}>
                        <div style={{ position: 'absolute', top: '5px', left: '10px', width: '15px', height: '30px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', transform: 'skewX(-15deg)', filter: 'blur(1.5px)' }} />
                    </div>
                </div>

                {/* Pilot / Cowcatcher (Front End Facing Right) */}
                <div style={{
                    position: 'absolute', bottom: '30px', right: '0px',
                    width: '40px', height: '115px',
                    background: 'linear-gradient(90deg, #07090e, #151a25)',
                    borderRadius: '0 15px 15px 6px',
                }}>
                    {/* Iconic Central Headlight */}
                    <div style={{ position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)', width: '22px', height: '22px', background: 'radial-gradient(circle, #fff, #fffbe0 40%, #ffd000)', borderRadius: '50%', boxShadow: '0 0 30px 15px rgba(255,210,50,0.5), 0 0 70px 30px rgba(255,210,50,0.15)' }} />
                </div>

                {/* Heavy Underframe Skirting */}
                <div style={{ position: 'absolute', bottom: '18px', left: '0px', right: '5px', height: '15px', background: 'linear-gradient(180deg,#0a0e14,#000)', borderRadius: '0 0 6px 6px', boxShadow: '0 3px 6px rgba(0,0,0,0.6)' }}>
                    {[15, 55, 95, 135, 175, 215, 255, 295].map(x => (
                        <div key={x} style={{ position: 'absolute', top: '4px', left: `${x}px`, width: '12px', height: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5px' }} />
                    ))}
                </div>

                {/* Extra Heavy Wheel Bogies */}
                <div style={{ position: 'absolute', bottom: '-8px', left: '16px', display: 'flex', gap: '18px' }}>
                    <Wheel size={34} /><Wheel size={34} />
                </div>
                <div style={{ position: 'absolute', bottom: '-8px', right: '22px', display: 'flex', gap: '18px' }}>
                    <Wheel size={34} /><Wheel size={34} />
                </div>

                {/* Main Connecting Drive Rod */}
                <div style={{ position: 'absolute', bottom: '12px', left: '35px', right: '40px', height: '8px', background: 'linear-gradient(180deg, #555 0%, #222 50%, #111 100%)', borderRadius: '5px', boxShadow: '0 3px 6px rgba(0,0,0,0.7)', border: '1.2px solid #1a1a1a' }} />
            </div>
        </div>
    );
}

/* ─── Flatcar + Realistic Project Card ──────────────────────────────── */
function TrainCar({ project, isActive, onClick, index }) {
    const displayIndex = (index + 1).toString().padStart(2, '0');
    
    // Extract first word or short code for background watermark
    const watermarkText = project.title.split(' ')[0].toUpperCase();

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '310px' }}>

                {/* ── PREMIUM PROJECT CARD (Styled per Image) ────────────────── */}
                <div
                    onClick={onClick}
                    className="card"
                    style={{
                        margin: '0 8px 15px',
                        background: isActive
                            ? 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)'
                            : 'var(--surface)',
                        borderRadius: '24px',
                        border: isActive
                            ? '2px solid var(--accent)'
                            : '1.5px solid var(--border)',
                        boxShadow: isActive
                            ? '0 20px 50px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.05)'
                            : '0 8px 20px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        padding: '28px',
                        height: '380px',
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
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 106, 79, 0.12)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isActive) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)';
                        }
                    }}
                >
                    {/* Top Left: Large Index */}
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

                    {/* Middle: Title with Watermark */}
                    <div style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            fontSize: '60px',
                            fontWeight: 900,
                            letterSpacing: '0.05em',
                            color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                            opacity: isActive ? 0.04 : 0.02,
                            textAlign: 'center',
                            zIndex: 0,
                            pointerEvents: 'none',
                            textTransform: 'uppercase'
                        }}>
                            {watermarkText}
                        </div>

                        <h3 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '22px',
                            fontWeight: 800,
                            color: 'var(--text)',
                            textAlign: 'center',
                            margin: 0,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase',
                            zIndex: 1,
                            position: 'relative',
                            lineHeight: 1.2
                        }}>
                            {project.title}
                        </h3>
                    </div>

                    {/* Bottom: Project Info Section ────────────────────────── */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '22px', marginTop: 'auto' }}>
                        <p style={{ 
                            fontFamily: "'Inter', sans-serif", 
                            fontSize: '11px', 
                            fontWeight: 900, 
                            color: 'var(--accent)', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            margin: '0 0 10px 0',
                            opacity: 0.9
                        }}>
                            Project Specification
                        </p>
                        <p style={{ 
                            fontFamily: "'Inter', sans-serif", 
                            fontSize: '14px', 
                            color: 'var(--text)', 
                            margin: 0,
                            lineHeight: 1.6,
                            opacity: 0.75,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {project.description}
                        </p>
                    </div>

                    {/* Subtle Hover Glow */}
                    {isActive && (
                        <div style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.03) 0%, transparent 60%)', 
                            pointerEvents: 'none' 
                        }} />
                    )}
                </div>

                {/* Industrial Flatcar Deck */}
                <div style={{
                    height: '24px', margin: '0 4px',
                    background: 'linear-gradient(180deg, #1e1e24 0%, #121216 60%, #08080a 100%)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.05)',
                    position: 'relative',
                    border: '1px solid #101014'
                }}>
                    {[20, 60, 100, 140, 180, 220, 260].map(x => (
                        <div key={x} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: '1.5px', background: 'rgba(0,0,0,0.3)', boxShadow: '0.5px 0 0 rgba(255,255,255,0.03)' }} />
                    ))}
                </div>

                {/* Industrial Wheel Trucks */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 25px', marginTop: '2px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}><Wheel size={24} /><Wheel size={24} /></div>
                    <div style={{ display: 'flex', gap: '10px' }}><Wheel size={24} /><Wheel size={24} /></div>
                </div>
            </div>

            {/* Heavy Coupler */}
            <div style={{ width: '18px', height: '6px', background: 'linear-gradient(180deg, #2a2a2a, #0a0a0a)', borderRadius: '4px', alignSelf: 'center', marginBottom: '22px', boxShadow: '0 2px 6px rgba(0,0,0,0.8)' }} />
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
export default function TrainSection({ projects, onRefreshProjects, readOnly = false }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);
    const submittingRef = useRef(false);
    const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll(scrollRef);

    useEffect(() => {
        if (!scrollRef.current || projects.length === 0) return;
        autoScrollRef.current = setInterval(() => {
            if (!scrollRef.current || selectedProject || isDraggingRef.current) return;
            const el = scrollRef.current;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) { el.scrollLeft = 0; }
            else { el.scrollLeft += 0.9; }
        }, 30);
        return () => clearInterval(autoScrollRef.current);
    }, [projects.length, selectedProject]);

    const isDraggingRef = useRef(false);
    const handleMouseDown = (e) => { isDraggingRef.current = false; onMouseDown(e); };
    const handleMouseMove = (e) => { isDraggingRef.current = true; onMouseMove(e); };
    const handleMouseUp = () => { onMouseUp(); setTimeout(() => { isDraggingRef.current = false; }, 80); };

    const handleCarClick = p => {
        if (isDraggingRef.current) return;
        setSelectedProject(p);
    };
    const handleClosePanel = () => setSelectedProject(null);
    const handleDelete = async (project) => {
        try {
            const res = await fetch(`/api/projects?id=${project._id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            toast.success('Project deleted');
            handleClosePanel();
            onRefreshProjects?.();
        } catch { toast.error('Could not delete project.'); }
    };
    const handleProjectAdded = () => {
        if (submittingRef.current) return;
        submittingRef.current = true;
        setShowAddModal(false);
        onRefreshProjects?.();
        setTimeout(() => { submittingRef.current = false; }, 800);
    };

    return (
        <>
            <section id="projects" style={{ padding: '80px 0 100px', position: 'relative', zIndex: 1, background: 'var(--bg)', transition: 'background 0.4s ease' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', padding: '0 40px' }}>
                    <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '38px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>Projects</h2>
                    {!readOnly && (
                        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '12px 28px', fontSize: '13px' }}>+ Add Project</button>
                    )}
                </div>

                {projects.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 48px', fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--text-muted)', background: 'var(--surface)', border: '1px dashed var(--border)', margin: '0 40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                        No projects yet. Click <strong style={{ color: 'var(--accent)' }}>+ Add Project</strong> to start your train journey.
                    </div>
                ) : (
                    <div style={{ position: 'relative', cursor: 'grab' }}>
                        
                        {/* Realistic High-Depth Ballast/Track Bed */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px',
                            background: 'linear-gradient(180deg, #322618 0%, #1a1208 50%, #050402 100%)',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                        }}>
                            {/* Gravel texture layers */}
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(100,80,50,0.4) 1px, transparent 1px)', backgroundSize: '6px 6px', opacity: 0.8 }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(50,40,20,0.6) 1.5px, transparent 1.5px)', backgroundSize: '11px 11px', backgroundPosition: '3px 3px' }} />
                        </div>

                        {/* Heavy Oak Sleepers/Ties */}
                        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', gap: '22px', overflow: 'hidden', padding: '0 8px' }}>
                            {Array.from({ length: 100 }).map((_, i) => (
                                <div key={i} style={{ 
                                    flexShrink: 0, width: '13px', height: '36px', 
                                    background: 'linear-gradient(90deg, #3a2918, #4d3827, #3a2918)', 
                                    borderRadius: '1px', 
                                    boxShadow: '0 3px 6px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(0,0,0,0.4)',
                                }} />
                            ))}
                        </div>

                        {/* Cold-Rolled Steel Rails */}
                        <div style={{ position: 'absolute', bottom: '38px', left: 0, right: 0, height: '8px', background: 'linear-gradient(180deg, #44505c 0%, #a4b0bc 20%, #e8f0f8 45%, #a4b0bc 70%, #303a44 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2)' }} />
                        <div style={{ position: 'absolute', bottom: '18px', left: 0, right: 0, height: '8px', background: 'linear-gradient(180deg, #44505c 0%, #a4b0bc 20%, #e8f0f8 45%, #a4b0bc 70%, #303a44 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2)' }} />

                        {/* Rail Side Depth */}
                        <div style={{ position: 'absolute', bottom: '34px', left: 0, right: 0, height: '4px', background: 'rgba(0,0,0,0.6)', filter: 'blur(1px)' }} />
                        <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, height: '4px', background: 'rgba(0,0,0,0.6)', filter: 'blur(1px)' }} />

                        {/* Scrollable train assemblage */}
                        <div
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{ display: 'flex', alignItems: 'flex-end', overflowX: 'auto', overflowY: 'visible', paddingLeft: 80, paddingBottom: 65, paddingTop: 40, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <Engine />
                            {projects.map((p, i) => (
                                <TrainCar key={p._id} project={p} index={i} isActive={selectedProject?._id === p._id} onClick={() => handleCarClick(p)} />
                            ))}
                            <div style={{ flexShrink: 0, width: '120px' }} />
                        </div>
                    </div>
                )}
            </section>

            <ProjectDetailPanel
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={handleClosePanel}
                onEdit={!readOnly ? () => { setEditingProject(selectedProject); setSelectedProject(null); } : undefined}
                onDelete={selectedProject && !readOnly ? () => handleDelete(selectedProject) : undefined}
                readOnly={readOnly}
            />
            {!readOnly && <AddProjectModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onProjectAdded={handleProjectAdded} />}
            <EditProjectModal
                isOpen={!!editingProject}
                onClose={() => setEditingProject(null)}
                project={editingProject}
                onProjectUpdated={() => { setEditingProject(null); onRefreshProjects?.(); }}
            />

            <style>{`
                @keyframes levitate { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
                @keyframes smokeRise { 
                    0%{transform:translateY(0) scale(0.6); opacity:0} 
                    20%{opacity:0.6}
                    100%{transform:translateY(-60px) scale(3.5); opacity:0} 
                }
                @keyframes spin { from{transform:rotate(360deg)} to{transform:rotate(0)} }
                #projects::-webkit-scrollbar { display: none; }
            `}</style>
        </>
    );
}
