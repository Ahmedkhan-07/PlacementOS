import LegalLayout from '@/components/shared/LegalLayout';
import Link from 'next/link';

export const metadata = {
    title: 'Shipping & Delivery Policy — PlacementOS',
    description: 'PlacementOS is now a free platform.',
};

export default function ShippingPolicy() {
    return (
        <LegalLayout title="Shipping & Delivery Policy" lastUpdated="April 2, 2026">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#2D6A4F', marginBottom: '20px' }}>
                    No Longer Applicable
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B6560', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 32px' }}>
                    As PlacementOS is a fully digital platform with no physical products, and premium features are now unlocked for <strong>FREE</strong> via sharing, shipping and delivery policies are not applicable.
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
