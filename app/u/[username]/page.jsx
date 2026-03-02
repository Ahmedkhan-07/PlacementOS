import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Resume from '@/models/Resume';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Achievement from '@/models/Achievement';
import PublicPortfolioClient from './PublicPortfolioClient';

export async function generateMetadata({ params }) {
    await connectDB();
    const user = await User.findOne({ username: params.username }).lean();
    if (!user) return { title: 'Not Found' };
    return {
        title: `${user.name || user.username} — Portfolio | PlacementOS`,
        description: user.bio || `${user.name || user.username}'s professional portfolio`,
        openGraph: {
            title: `${user.name || user.username} — Portfolio`,
            description: user.bio || `Professional portfolio on PlacementOS`,
            images: user.profilePicUrl ? [user.profilePicUrl] : [],
        },
    };
}

export default async function PublicPortfolio({ params }) {
    await connectDB();
    const user = await User.findOne({ username: params.username }).lean();

    if (!user) return notFound();

    if (!user.isPublic) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '120px 40px',
                textAlign: 'center',
            }}>
                <div>
                    <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔒</div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '32px', fontWeight: 700,
                        color: '#1C1C1C', marginBottom: '12px',
                    }}>
                        This portfolio is private
                    </h1>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '16px', color: '#6B6560', marginBottom: '32px',
                    }}>
                        The owner hasn&apos;t made this portfolio public yet.
                    </p>
                    <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                        Create Your Own →
                    </a>
                </div>
            </div>
        );
    }

    // Fetch all data for the user
    const [resume, projects, certificates, achievements] = await Promise.all([
        Resume.findOne({ userId: user.clerkId }).lean(),
        Project.find({ userId: user.clerkId }).sort({ order: 1, createdAt: -1 }).lean(),
        Certificate.find({ userId: user.clerkId }).sort({ order: 1, createdAt: -1 }).lean(),
        Achievement.find({ userId: user.clerkId }).sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    // Serialize MongoDB data (convert ObjectIds and dates to strings)
    const serialized = {
        user: JSON.parse(JSON.stringify(user)),
        resume: resume ? JSON.parse(JSON.stringify(resume)) : null,
        projects: JSON.parse(JSON.stringify(projects)),
        certificates: JSON.parse(JSON.stringify(certificates)),
        achievements: JSON.parse(JSON.stringify(achievements)),
    };

    return <PublicPortfolioClient {...serialized} />;
}
