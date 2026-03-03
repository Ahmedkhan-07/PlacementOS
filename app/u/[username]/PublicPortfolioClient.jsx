'use client';

import ProfileHero from '@/components/dashboard/ProfileHero';
import ResumeSection from '@/components/dashboard/ResumeSection';
import TrainSection from '@/components/dashboard/TrainSection';
import CertificateTrain from '@/components/dashboard/CertificateTrain';
import AchievementBus from '@/components/dashboard/AchievementBus';
import SocialLinks from '@/components/dashboard/SocialLinks';

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
                </div>
            </nav>

            {/* Profile Hero — no edit button */}
            <div style={{ paddingTop: '70px' }}>
                <ProfileHero user={user} />
            </div>

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

            {/* Social Links */}
            <SocialLinks user={user} />
        </main>
    );
}
