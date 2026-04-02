'use client';

import ProfileHero from '@/components/dashboard/ProfileHero';
import AboutOverview from '@/components/dashboard/AboutOverview';
import SkillsArsenal from '@/components/dashboard/SkillsArsenal';
import EducationSection from '@/components/dashboard/EducationSection';
import ResumeSection from '@/components/dashboard/ResumeSection';
import TrainSection from '@/components/dashboard/TrainSection';
import CertificateTrain from '@/components/dashboard/CertificateTrain';
import AchievementBus from '@/components/dashboard/AchievementBus';
import ContactSection from '@/components/dashboard/ContactSection';

export default function PublicPortfolioClient({ user, resume, projects = [], certificates = [], achievements = [] }) {
    return (
        <main style={{ position: 'relative', zIndex: 1 }}>
            {/* Navbar - minimal */}
            <nav className="glass-navbar fixed top-0 left-0 right-0 z-50" style={{ padding: '14px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2D6A4F' }}>
                            PlacementOS
                        </span>
                    </a>
                    
                    {/* Anchor Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500 }}>
                        <a href="#about" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a>
                        <a href="#skills" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}>Skills</a>
                        <a href="#projects" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>Projects</a>
                        <a href="#education" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }); }}>Education</a>
                        <a href="#contact" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
                    </div>
                </div>
            </nav>

            {/* Profile Hero — no edit button */}
            <div style={{ paddingTop: '70px' }}>
                <ProfileHero user={user} />
            </div>

            {/* About / Overview */}
            <AboutOverview 
                user={user} 
                resume={resume} 
                projectsCount={projects?.length || 0} 
                certificatesCount={certificates?.length || 0} 
            />

            {/* Skills Arsenal */}
            <SkillsArsenal skills={[
                ...new Set([
                    ...(user?.skills || []),
                    ...(resume?.skills || []),
                ])
            ]} />

            {/* Education Section */}
            <EducationSection education={resume?.education || []} />

            {/* Resume Section — read-only (no onSaveResume → no Edit button) */}
            {resume && (
                <ResumeSection
                    resume={resume}
                    username={user.username}
                    readOnly
                />
            )}

            {/* Projects Train — read-only */}
            {projects.length > 0 && (
                <TrainSection
                    projects={projects}
                    readOnly
                />
            )}

            {/* Certificates Train — read-only */}
            {certificates.length > 0 && (
                <CertificateTrain
                    certificates={certificates}
                    readOnly
                />
            )}

            {/* Achievements Bus — read-only */}
            {achievements.length > 0 && (
                <AchievementBus
                    achievements={achievements}
                    readOnly
                />
            )}

            {/* Contact Section */}
            <ContactSection user={user} />
        </main>
    );
}
