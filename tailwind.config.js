/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./App.jsx",
        "./index.jsx",
        "./components/**/*.{js,jsx}",
        "./pages/**/*.{js,jsx}",
        "./services/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00488D',
                secondary: '#F7A801',
                accent: '#F7A801',
                surface: '#FFFFFF',
                background: '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'hover': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.3)',
            },
            animation: {
                fadeIn: 'fadeIn 0.4s ease-out forwards',
                slideUp: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                float: 'float 3s ease-in-out infinite',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                shimmer: 'shimmer 1.5s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                shimmer: {
                    '0%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                    '100%': { opacity: '1' },
                }
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            }
        },
    },
    plugins: [],
}
