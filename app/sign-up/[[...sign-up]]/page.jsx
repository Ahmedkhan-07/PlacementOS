import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FAF7F2',
            padding: '40px 20px',
        }}>
            <SignUp />
        </div>
    );
}
