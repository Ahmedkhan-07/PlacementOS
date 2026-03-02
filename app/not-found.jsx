import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FAF7F2',
            padding: '40px 20px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
        }}>
            <div>
                <div style={{ fontSize: '72px', marginBottom: '20px' }}>🔍</div>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '48px',
                    fontWeight: 700,
                    color: '#1C1C1C',
                    marginBottom: '12px',
                }}>
                    404
                </h1>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: '#6B6560',
                    marginBottom: '32px',
                }}>
                    This page doesn&apos;t exist.
                </p>
                <Link href="/">
                    <button className="btn-primary" style={{ padding: '14px 36px' }}>
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
