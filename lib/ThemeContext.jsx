'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ dark: false, toggle: () => { } });

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    // On mount: read from localStorage and apply immediately
    useEffect(() => {
        const saved = localStorage.getItem('pos_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = saved ? saved === 'dark' : prefersDark;
        setDark(isDark);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, []);

    const toggle = () => {
        setDark(prev => {
            const next = !prev;
            localStorage.setItem('pos_theme', next ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
