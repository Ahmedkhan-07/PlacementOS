'use client';

import { useState, useEffect } from 'react';
import ResumePreview from '@/components/resume/ResumePreview';
import toast from 'react-hot-toast';

const STEPS = ['Personal Info', 'Summary', 'Education', 'Skills', 'Projects', 'Experience', 'Achievements', 'Hobbies'];
const DEGREES = ["Bachelor's", "Master's", 'PhD', 'Diploma', 'High School', 'Other'];
const YEARS = Array.from({ length: 31 }, (_, i) => String(2000 + i));
const ACCENT_COLORS = ['#2D6A4F', '#1B4332', '#C0392B', '#2C3E50', '#8E44AD', '#E67E22'];

export default function ResumeBuilder({ resume, onClose, onSave }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        templateId: resume?.templateId || 1,
        accentColor: resume?.accentColor || '#2D6A4F',
        personalInfo: resume?.personalInfo || {},
        summary: resume?.summary || '',
        education: resume?.education || [],
        skills: resume?.skills || [],
        projects: resume?.projects || [],
        experience: resume?.experience || [],
        achievements: resume?.achievements || [],
        hobbies: resume?.hobbies || [],
    });
    const [saving, setSaving] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [originalText, setOriginalText] = useState(null);
    const [skillInput, setSkillInput] = useState('');
    const [hobbyInput, setHobbyInput] = useState('');
    const [suggestedSkills, setSuggestedSkills] = useState([]);

    useEffect(() => {
        const esc = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc);
    }, [onClose]);

    const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));
    const updatePI = (key, val) => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }));

    const aiEnhance = async (text, context, onResult) => {
        if (!text?.trim()) return;
        setEnhancing(true);
        setOriginalText(text);
        try {
            const res = await fetch('/api/ai-enhance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, context, skills: context === 'skills' ? text : undefined }),
            });
            const d = await res.json();
            if (d.enhanced) onResult(d.enhanced);
        } catch {
            toast.error('AI enhance failed');
        } finally {
            setEnhancing(false);
        }
    };

    const suggestSkills = async () => {
        setEnhancing(true);
        try {
            const res = await fetch('/api/ai-enhance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: '', context: 'skills', skills: data.skills.join(',') }),
            });
            const d = await res.json();
            if (d.enhanced) setSuggestedSkills(d.enhanced.split(',').map(s => s.trim()).filter(Boolean));
        } catch {
            toast.error('Skill suggestion failed');
        } finally {
            setEnhancing(false);
        }
    };

    const addListItem = (key, item) => update(key, [...data[key], item]);
    const removeListItem = (key, idx) => update(key, data[key].filter((_, i) => i !== idx));
    const updateListItem = (key, idx, field, val) => {
        const items = [...data[key]];
        items[idx] = { ...items[idx], [field]: val };
        update(key, items);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const result = await res.json();
                toast.success('Resume saved! ✅');
                onSave(result.resume);
                onClose();
            }
        } catch {
            toast.error('Save failed');
        } finally {
            setSaving(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0: return (
                <div>
                    <h3 style={stepTitle}>Personal Information</h3>
                    {['name', 'email', 'phone', 'location', 'linkedinUrl', 'githubUrl', 'websiteUrl'].map(f => (
                        <div key={f} style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).replace('Url', ' URL')}</label>
                            <input className="fancy-input" value={data.personalInfo[f] || ''} onChange={e => updatePI(f, e.target.value)} />
                        </div>
                    ))}
                </div>
            );
            case 1: return (
                <div>
                    <h3 style={stepTitle}>Professional Summary</h3>
                    <div style={{ position: 'relative' }}>
                        <textarea className="fancy-textarea" rows={6} value={data.summary} onChange={e => update('summary', e.target.value)}
                            placeholder="Write a brief summary of your professional background and skills..." />
                        <button onClick={() => aiEnhance(data.summary, 'professional_summary', t => update('summary', t))}
                            disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px 14px', fontSize: '12px' }}>
                            {enhancing ? '⏳' : '✨ AI Enhance'}
                        </button>
                    </div>
                    {originalText && <button onClick={() => { update('summary', originalText); setOriginalText(null); }}
                        style={{ background: 'none', border: 'none', color: '#2D6A4F', fontSize: '12px', cursor: 'pointer', marginTop: '8px' }}>↩ Revert</button>}
                </div>
            );
            case 2: return (
                <div>
                    <h3 style={stepTitle}>Education</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Education {i + 1}</span>
                                <button onClick={() => removeListItem('education', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            {['institution', 'field', 'grade', 'description'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                                    <input className="fancy-input" value={edu[f] || ''} onChange={e => updateListItem('education', i, f, e.target.value)} />
                                </div>
                            ))}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Degree</label>
                                <select className="fancy-input" value={edu.degree || ''} onChange={e => updateListItem('education', i, 'degree', e.target.value)}>
                                    <option value="">Select</option>
                                    {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Start Year</label>
                                    <select className="fancy-input" value={edu.startYear || ''} onChange={e => updateListItem('education', i, 'startYear', e.target.value)}>
                                        <option value="">Year</option>
                                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>End Year</label>
                                    <select className="fancy-input" value={edu.endYear || ''} onChange={e => updateListItem('education', i, 'endYear', e.target.value)}>
                                        <option value="">Year</option>
                                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('education', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Education</button>
                </div>
            );
            case 3: return (
                <div>
                    <h3 style={stepTitle}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {data.skills.map((s, i) => (
                            <span key={i} className="tag-chip">{s}<span className="tag-chip-remove" onClick={() => update('skills', data.skills.filter((_, j) => j !== i))}>×</span></span>
                        ))}
                    </div>
                    <input className="fancy-input" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); const s = skillInput.trim(); if (s && !data.skills.includes(s)) { update('skills', [...data.skills, s]); } setSkillInput(''); } }}
                        placeholder="Type a skill + Enter" style={{ marginBottom: '12px' }} />
                    <button onClick={suggestSkills} disabled={enhancing} className="btn-gold" style={{ padding: '8px 18px', fontSize: '12px' }}>
                        {enhancing ? '⏳' : '✨ Suggest Skills'}
                    </button>
                    {suggestedSkills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                            {suggestedSkills.map((s, i) => (
                                <button key={i} onClick={() => { if (!data.skills.includes(s)) update('skills', [...data.skills, s]); setSuggestedSkills(prev => prev.filter((_, j) => j !== i)); }}
                                    className="btn-outline" style={{ padding: '6px 14px', fontSize: '12px' }}>{s}</button>
                            ))}
                        </div>
                    )}
                </div>
            );
            case 4: return (
                <div>
                    <h3 style={stepTitle}>Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Project {i + 1}</span>
                                <button onClick={() => removeListItem('projects', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            {['title', 'githubUrl', 'demoUrl'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).replace('Url', ' URL')}</label>
                                    <input className="fancy-input" value={proj[f] || ''} onChange={e => updateListItem('projects', i, f, e.target.value)} />
                                </div>
                            ))}
                            <div style={{ marginBottom: '10px', position: 'relative' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={3} value={proj.description || ''} onChange={e => updateListItem('projects', i, 'description', e.target.value)} />
                                <button onClick={() => aiEnhance(proj.description, 'project_description', t => updateListItem('projects', i, 'description', t))}
                                    disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '24px', right: '8px', padding: '4px 10px', fontSize: '11px' }}>✨</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('projects', { techStack: [] })} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Project</button>
                </div>
            );
            case 5: return (
                <div>
                    <h3 style={stepTitle}>Work Experience</h3>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Experience {i + 1}</span>
                                <button onClick={() => removeListItem('experience', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            {['company', 'role', 'startDate', 'endDate'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                                    <input className="fancy-input" value={exp[f] || ''} onChange={e => updateListItem('experience', i, f, e.target.value)} />
                                </div>
                            ))}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '13px', color: '#6B6560' }}>
                                <input type="checkbox" checked={exp.current || false} onChange={e => updateListItem('experience', i, 'current', e.target.checked)} />
                                Currently Working
                            </label>
                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={3} value={exp.description || ''} onChange={e => updateListItem('experience', i, 'description', e.target.value)} />
                                <button onClick={() => aiEnhance(exp.description, 'experience', t => updateListItem('experience', i, 'description', t))}
                                    disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '24px', right: '8px', padding: '4px 10px', fontSize: '11px' }}>✨</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('experience', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Experience</button>
                </div>
            );
            case 6: return (
                <div>
                    <h3 style={stepTitle}>Achievements & Awards</h3>
                    {data.achievements.map((ach, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Achievement {i + 1}</span>
                                <button onClick={() => removeListItem('achievements', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Title</label>
                                <input className="fancy-input" value={ach.title || ''} onChange={e => updateListItem('achievements', i, 'title', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '10px', position: 'relative' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={2} value={ach.description || ''} onChange={e => updateListItem('achievements', i, 'description', e.target.value)} />
                                <button onClick={() => aiEnhance(ach.description, 'achievement', t => updateListItem('achievements', i, 'description', t))}
                                    disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '24px', right: '8px', padding: '4px 10px', fontSize: '11px' }}>✨</button>
                            </div>
                            <div>
                                <label style={labelStyle}>Year</label>
                                <input className="fancy-input" value={ach.year || ''} onChange={e => updateListItem('achievements', i, 'year', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('achievements', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Achievement</button>
                </div>
            );
            case 7: return (
                <div>
                    <h3 style={stepTitle}>Hobbies & Interests</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {data.hobbies.map((h, i) => (
                            <span key={i} className="tag-chip" style={{ background: 'rgba(107,101,96,0.1)', color: '#6B6560' }}>
                                {h}<span className="tag-chip-remove" onClick={() => update('hobbies', data.hobbies.filter((_, j) => j !== i))}>×</span>
                            </span>
                        ))}
                    </div>
                    <input className="fancy-input" value={hobbyInput} onChange={e => setHobbyInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const h = hobbyInput.trim(); if (h && !data.hobbies.includes(h)) update('hobbies', [...data.hobbies, h]); setHobbyInput(''); } }}
                        placeholder="Type a hobby + Enter" />
                </div>
            );
            default: return null;
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: '#FAF7F2', zIndex: 60,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
            {/* Top Bar */}
            <div style={{
                background: '#FFFFFF', borderBottom: '1px solid #E8E0D4', padding: '12px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{ height: '6px', background: '#E8E0D4', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${((step + 1) / 8) * 100}%`,
                            background: '#2D6A4F',
                            transition: 'width 0.3s ease',
                            borderRadius: '3px'
                        }} />
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B6560', marginTop: '4px' }}>
                        Step {step + 1} of 8 — {STEPS[step]}
                    </p>
                </div>
                <button onClick={onClose} className="btn-ghost" style={{ marginLeft: '16px', padding: '8px 16px', fontSize: '12px' }}>
                    💾 Save & Exit
                </button>
            </div>

            {/* Step Navigation Pills */}
            <div style={{
                display: 'flex', gap: '6px', flexWrap: 'wrap',
                padding: '10px 24px', borderBottom: '1px solid #E8E0D4',
                background: '#FAFAF8',
            }}>
                {STEPS.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setStep(i)}
                        style={{
                            padding: '5px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: step === i ? 600 : 400,
                            cursor: 'pointer',
                            border: step === i ? 'none' : '1px solid #E8E0D4',
                            background: step === i ? '#2D6A4F' : '#FFFFFF',
                            color: step === i ? '#FFFFFF' : '#6B6560',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Left: Form */}
                <div style={{ flex: 1, overflow: 'auto', padding: '32px 28px', paddingBottom: '100px' }}>
                    {renderStep()}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', gap: '12px' }}>
                        {step > 0 && (
                            <button onClick={() => setStep(step - 1)} className="btn-ghost">← Back</button>
                        )}
                        <div style={{ marginLeft: 'auto' }}>
                            {step < 7 ? (
                                <button onClick={() => setStep(step + 1)} className="btn-primary">Save & Next →</button>
                            ) : (
                                <button onClick={handleSave} disabled={saving} className="btn-primary">
                                    {saving ? '⏳ Saving...' : '✅ Save Resume'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Live Preview */}
                <div style={{
                    flex: 1, overflow: 'auto', background: '#FFFFFF', borderLeft: '1px solid #E8E0D4',
                    padding: '20px', display: 'flex', flexDirection: 'column',
                }}>
                    {/* Template Switcher */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {[1, 2, 3, 4, 5].map(id => (
                            <button
                                key={id}
                                onClick={() => update('templateId', id)}
                                style={{
                                    padding: '8px 16px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
                                    background: data.templateId === id ? '#2D6A4F' : '#F0EBE3',
                                    color: data.templateId === id ? '#fff' : '#1C1C1C',
                                    border: 'none', fontWeight: 500, transition: 'all 0.2s ease',
                                }}
                            >
                                T{id}
                            </button>
                        ))}
                        <span style={{ fontSize: '11px', color: '#6B6560', marginLeft: '8px' }}>Accent:</span>
                        {ACCENT_COLORS.map(c => (
                            <button
                                key={c}
                                onClick={() => update('accentColor', c)}
                                style={{
                                    width: '24px', height: '24px', borderRadius: '50%', background: c,
                                    border: data.accentColor === c ? '3px solid #1C1C1C' : '2px solid #E8E0D4',
                                    cursor: 'pointer', transition: 'all 0.2s ease',
                                }}
                            />
                        ))}
                    </div>

                    {/* Preview — A4 scaled to fit */}
                    <div style={{
                        width: '794px',
                        transformOrigin: 'top left',
                        transform: 'scale(0.55)',
                        marginBottom: '-400px',
                        flexShrink: 0,
                    }}>
                        <ResumePreview data={data} templateId={data.templateId} accentColor={data.accentColor} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const stepTitle = { fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#1C1C1C', marginBottom: '24px' };
const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '6px' };
