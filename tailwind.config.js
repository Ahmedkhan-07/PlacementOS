/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                bg: '#FAF7F2',
                surface: '#FFFFFF',
                text: '#1C1C1C',
                'text-muted': '#6B6560',
                accent: '#2D6A4F',
                'accent-dark': '#1B4332',
                gold: '#C9A23A',
                'gold-light': '#F0C96B',
                border: '#E8E0D4',
                success: '#52B788',
                'engine-red': '#C0392B',
                'engine-red-dark': '#922B21',
                warning: '#F39C12',
                skeleton: '#F0EBE3',
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
