'use client';

export default function ExpiryBanner({ daysLeft, onUpgrade }) {
    if (daysLeft > 7 || daysLeft === null) return null;

    return (
        <div style={{
            background: 'rgba(243,156,18,0.1)',
            borderLeft: '4px solid #F39C12',
            borderRadius: '12px',
            padding: '16px 24px',
            margin: '20px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            position: 'relative',
            zIndex: 1,
        }}>
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#1C1C1C',
                margin: 0,
            }}>
                ⚠️ Your data will be cleared in <strong>{daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong>. Upgrade to keep it permanently.
            </p>
            <button
                onClick={onUpgrade}
                className="btn-gold"
                style={{ padding: '8px 20px', fontSize: '13px' }}
            >
                Upgrade Now →
            </button>
        </div>
    );
}
