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

    // The public portfolio is accessible if the URL is shared. 
    // We removed the strict `!user.isPublic` check so it doesn't block by default.

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
