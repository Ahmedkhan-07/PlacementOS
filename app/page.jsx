import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Features />
            <CTASection />
            <Footer />
        </main>
    );
}
