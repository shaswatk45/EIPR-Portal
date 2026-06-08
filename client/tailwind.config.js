/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        'mono-sm': ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      spacing: {
        'gutter': '16px',
      },
      scale: {
        '102': '1.02',
        '115': '1.15',
      },
      colors: {
        primary: {
          50: '#fef8e6',
          100: '#fdf1cc',
          200: '#fbe399',
          300: '#f9d466',
          400: '#f7c633',
          500: '#ffb700', // Cyber Amber
          600: '#e6a500',
          700: '#cc9200',
          800: '#b38000',
          900: '#996d00',
        },
        secondary: {
          50: '#fff3eb',
          100: '#ffe7d6',
          200: '#ffcead',
          300: '#ffb685',
          400: '#ff9d5c',
          500: '#ff6b00', // Cyber Orange
          600: '#e66000',
          700: '#cc5500',
          800: '#b34a00',
          900: '#994000',
        },
        surface: {
          DEFAULT: '#08080a', // Deep Charcoal
          dim: '#040405',
          bright: '#1e1e24',
          container: {
            lowest: '#020203',
            low: '#0b0b0e',
            DEFAULT: '#121216',
            high: '#1a1a1f',
            highest: '#282830',
          }
        },
        outline: {
          DEFAULT: '#52525b',
          variant: '#282830',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        slate: {
          750: '#1a1a1f',
          850: '#0b0b0e',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #000000 0%, #080510 50%, #000000 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
    },
  },
  plugins: [],
}
