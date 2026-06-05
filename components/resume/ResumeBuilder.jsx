'use client';

import { useState, useEffect } from 'react';
import ResumePreview from '@/components/resume/ResumePreview';
import toast from 'react-hot-toast';

const STEPS = [
    'Personal Info', 
    'Professional Summary', 
    'Education', 
    'Technical Skills', 
    'Projects', 
    'Work & Internship Experience', 
    'Certifications', 
    'Achievements', 
    'Leadership & Extracurriculars', 
    'Languages', 
    'Interests', 
    'References'
];
const DEGREES = ["Bachelor's", "Master's", 'PhD', 'Diploma', 'High School', 'Other'];
const YEARS = Array.from({ length: 31 }, (_, i) => String(2000 + i));
const ACCENT_COLORS = ['#2D6A4F', '#1B4332', '#C0392B', '#2C3E50', '#8E44AD', '#E67E22'];

export default function ResumeBuilder({ resume, userProfilePic, onClose, onSave }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        templateId: resume?.templateId || 1,
        accentColor: resume?.accentColor || '#2D6A4F',
        personalInfo: {
            ...resume?.personalInfo,
            profilePicUrl: resume?.personalInfo?.profilePicUrl || userProfilePic || '',
        },
        showProfilePic: resume?.showProfilePic !== false,
        summary: resume?.summary || '',
        education: resume?.education || [],
        skills: resume?.skills || [],
        projects: resume?.projects || [],
        experience: resume?.experience || [],
        certifications: resume?.certifications || [],
        achievements: resume?.achievements || [],
        leadership: resume?.leadership || [],
        languages: resume?.languages || [],
        interests: resume?.interests || [],
        hobbies: resume?.hobbies || [],
        references: resume?.references || '',
        skillsText: resume?.skillsText || '',
    });
    const [saving, setSaving] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [originalText, setOriginalText] = useState(null);
    const [skillInput, setSkillInput] = useState('');
    const [hobbyInput, setHobbyInput] = useState('');
    const [langInput, setLangInput] = useState('');
    const [interestInput, setInterestInput] = useState('');
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#FAFAF8', border: '1px solid #E8E0D4', borderRadius: '12px', marginBottom: '24px' }}>
                        <div>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 600, color: '#1C1C1C', display: 'block', marginBottom: '2px' }}>Display Profile Picture</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B6560' }}>Show your portfolio profile picture on the resume header</span>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                checked={data.showProfilePic !== false} 
                                onChange={e => update('showProfilePic', e.target.checked)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute', inset: 0,
                                background: data.showProfilePic !== false ? data.accentColor : '#E8E0D4',
                                borderRadius: '24px', transition: 'all 0.25s ease',
                                display: 'flex', alignItems: 'center', padding: '2px'
                            }}>
                                <span style={{
                                    width: '20px', height: '20px', background: 'white',
                                    borderRadius: '50%', transition: 'all 0.25s ease',
                                    transform: data.showProfilePic !== false ? 'translateX(22px)' : 'translateX(0)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }} />
                            </span>
                        </label>
                    </div>
                    {['name', 'email', 'phone', 'location', 'linkedinUrl', 'githubUrl', 'leetcodeUrl', 'portfolioUrl'].map(f => (
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
                    <datalist id="degrees-list">
                        {['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'Intermediate', 'SSC', "Bachelor's", "Master's", 'PhD', 'Diploma', 'High School'].map(d => <option key={d} value={d} />)}
                    </datalist>
                    <datalist id="years-list">
                        {YEARS.map(y => <option key={y} value={y} />)}
                    </datalist>
                    {data.education.map((edu, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Education {i + 1}</span>
                                <button onClick={() => removeListItem('education', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            
                            {/* Degree / Qualification name */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Degree / Qualification name (e.g., B.Tech, Intermediate, SSC)</label>
                                <input className="fancy-input" list="degrees-list" value={edu.degree || ''} onChange={e => updateListItem('education', i, 'degree', e.target.value)} placeholder="e.g. B.Tech" />
                            </div>

                            {/* Specialization / Stream */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Specialization / Stream (e.g., Artificial Intelligence, MPC, etc.)</label>
                                <input className="fancy-input" value={edu.field || ''} onChange={e => updateListItem('education', i, 'field', e.target.value)} placeholder="e.g. Artificial Intelligence" />
                            </div>

                            {/* Institution name */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Institution name (College / School name)</label>
                                <input className="fancy-input" value={edu.institution || ''} onChange={e => updateListItem('education', i, 'institution', e.target.value)} placeholder="e.g. College / School name" />
                            </div>

                            {/* University / Board */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>University / Board (e.g., JNTUA, BIEAP, BSEAP etc.)</label>
                                <input className="fancy-input" value={edu.university || ''} onChange={e => updateListItem('education', i, 'university', e.target.value)} placeholder="e.g. JNTUA" />
                            </div>

                            {/* Year of passing / Start Year */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Start Year</label>
                                    <input className="fancy-input" list="years-list" value={edu.startYear || ''} onChange={e => updateListItem('education', i, 'startYear', e.target.value)} placeholder="Year" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Year of passing (e.g., 2026, 2022 etc.)</label>
                                    <input className="fancy-input" list="years-list" value={edu.endYear || ''} onChange={e => updateListItem('education', i, 'endYear', e.target.value)} placeholder="Year" />
                                </div>
                            </div>

                             {/* Score Type & Score Value */}
                             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                 <div style={{ width: '30%' }}>
                                     <label style={labelStyle}>Score Type</label>
                                     <select className="fancy-input" value={edu.gradeType || 'CGPA'} onChange={e => updateListItem('education', i, 'gradeType', e.target.value)}>
                                         <option value="CGPA">CGPA</option>
                                         <option value="Percentage">Percentage</option>
                                         <option value="GPA">GPA</option>
                                         <option value="Marks">Marks</option>
                                         <option value="Grade">Grade</option>
                                     </select>
                                 </div>
                                 <div style={{ flex: 1 }}>
                                     <label style={labelStyle}>Your Score</label>
                                     <input className="fancy-input" value={edu.grade || ''} onChange={e => updateListItem('education', i, 'grade', e.target.value)} placeholder={edu.gradeType === 'Percentage' ? 'e.g. 95%' : edu.gradeType === 'CGPA' ? 'e.g. 9.2' : edu.gradeType === 'GPA' ? 'e.g. 3.8 / 4.0' : edu.gradeType === 'Marks' ? 'e.g. 920 / 1000' : 'e.g. A+'} />
                                 </div>
                             </div>

                            {/* Description */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={2} value={edu.description || ''} onChange={e => updateListItem('education', i, 'description', e.target.value)} placeholder="Extra details..." />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('education', { gradeType: 'CGPA' })} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Education</button>
                </div>
            );
            case 3: return (
                <div>
                    <h3 style={stepTitle}>Technical Skills</h3>
                    <p style={{ fontSize: '13px', color: '#6B6560', marginBottom: '12px' }}>
                        Write your skills in any format. Example: Languages: JavaScript, Python | Frontend: React, Next.js
                    </p>
                    <textarea
                        className="fancy-textarea"
                        rows={10}
                        value={data.skillsText || ''}
                        onChange={e => update('skillsText', e.target.value)}
                        placeholder="Languages: JavaScript, TypeScript, Python&#10;Frontend: React, Next.js, Tailwind CSS&#10;Backend: Node.js, Express.js&#10;Databases: MongoDB, PostgreSQL&#10;Tools: Git, Docker, Postman"
                    />
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
                            {['title', 'startDate', 'endDate', 'githubUrl', 'demoUrl'].map(f => (
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
                    <h3 style={stepTitle}>Work & Internship Experience</h3>
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
                    <h3 style={stepTitle}>Certifications</h3>
                    {(data.certifications || []).map((cert, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Certification {i + 1}</span>
                                <button onClick={() => removeListItem('certifications', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Title</label>
                                <input className="fancy-input" value={cert.title || ''} onChange={e => updateListItem('certifications', i, 'title', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Issuer / Description</label>
                                <textarea className="fancy-textarea" rows={2} value={cert.description || ''} onChange={e => updateListItem('certifications', i, 'description', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Year</label>
                                <input className="fancy-input" value={cert.year || ''} onChange={e => updateListItem('certifications', i, 'year', e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Certificate URL</label>
                                <input className="fancy-input" value={cert.url || ''} onChange={e => updateListItem('certifications', i, 'url', e.target.value)} placeholder="https://certificate-link.com" />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('certifications', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Certification</button>
                </div>
            );
            case 7: return (
                <div>
                    <h3 style={stepTitle}>Achievements</h3>
                    {(data.achievements || []).map((ach, i) => (
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
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Year</label>
                                <input className="fancy-input" value={ach.year || ''} onChange={e => updateListItem('achievements', i, 'year', e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Certificate URL</label>
                                <input className="fancy-input" value={ach.url || ''} onChange={e => updateListItem('achievements', i, 'url', e.target.value)} placeholder="https://certificate-link.com" />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('achievements', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Achievement</button>
                </div>
            );
            case 8: return (
                <div>
                    <h3 style={stepTitle}>Leadership & Extracurricular Activities</h3>
                    {(data.leadership || []).map((lead, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Activity {i + 1}</span>
                                <button onClick={() => removeListItem('leadership', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                            </div>
                            {['role', 'organization', 'startDate', 'endDate'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                                    <input className="fancy-input" value={lead[f] || ''} onChange={e => updateListItem('leadership', i, f, e.target.value)} />
                                </div>
                            ))}
                            <div>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={3} value={lead.description || ''} onChange={e => updateListItem('leadership', i, 'description', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('leadership', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Activity</button>
                </div>
            );
            case 9: return (
                <div>
                    <h3 style={stepTitle}>Languages</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {(data.languages || []).map((l, i) => (
                            <span key={i} className="tag-chip" style={{ background: 'rgba(107,101,96,0.1)', color: '#6B6560' }}>
                                {l}<span className="tag-chip-remove" onClick={() => update('languages', data.languages.filter((_, j) => j !== i))}>×</span>
                            </span>
                        ))}
                    </div>
                    <input className="fancy-input" value={langInput} onChange={e => setLangInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const l = langInput.trim(); if (l && !data.languages.includes(l)) update('languages', [...(data.languages || []), l]); setLangInput(''); } }}
                        placeholder="Type a language + Enter" />
                </div>
            );
            case 10: return (
                <div>
                    <h3 style={stepTitle}>Interests</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {(data.interests || []).map((interest, i) => (
                            <span key={i} className="tag-chip" style={{ background: 'rgba(107,101,96,0.1)', color: '#6B6560' }}>
                                {interest}<span className="tag-chip-remove" onClick={() => update('interests', data.interests.filter((_, j) => j !== i))}>×</span>
                            </span>
                        ))}
                    </div>
                    <input className="fancy-input" value={interestInput} onChange={e => setInterestInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const val = interestInput.trim(); if (val && !data.interests.includes(val)) update('interests', [...(data.interests || []), val]); setInterestInput(''); } }}
                        placeholder="Type an interest + Enter" />
                </div>
            );
            case 11: return (
                <div>
                    <h3 style={stepTitle}>References (Optional)</h3>
                    <textarea className="fancy-textarea" rows={6} value={data.references || ''} onChange={e => update('references', e.target.value)}
                        placeholder="E.g. Professional references available upon request..." />
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
                            width: `${((step + 1) / 12) * 100}%`,
                            background: '#2D6A4F',
                            transition: 'width 0.3s ease',
                            borderRadius: '3px'
                        }} />
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B6560', marginTop: '4px' }}>
                        Step {step + 1} of 12 — {STEPS[step]}
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
                            {step < 11 ? (
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
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(id => (
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
