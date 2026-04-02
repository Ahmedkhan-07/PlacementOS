import LegalLayout from '@/components/shared/LegalLayout';
import Link from 'next/link';

export const metadata = {
    title: 'Refund & Cancellation Policy — PlacementOS',
    description: 'PlacementOS is now a free platform.',
};

export default function RefundPolicy() {
    return (
        <LegalLayout title="Refund & Cancellation Policy" lastUpdated="April 2, 2026">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#2D6A4F', marginBottom: '20px' }}>
                    No Longer Applicable
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B6560', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 32px' }}>
                    PlacementOS has transitioned to a <strong>FREE</strong> platform. Premium features are now unlocked by sharing the platform with others rather than through paid subscriptions. 
                    As no payments are collected, this refund and cancellation policy is no longer active.
                </p>
                <Link href="/" style={{ 
                    display: 'inline-block', 
                    background: '#2D6A4F', 
                    color: '#fff', 
                    padding: '12px 24px', 
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontWeight: 600
                }}>
                    Back to Home
                </Link>
            </div>
        </LegalLayout>
    );
}
