/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        blue:{
          500:'#009CFB'
        },
        red:{
          500:'#F70A60'
        },
        green:{
          500:'#22B85E'
        },
        primary: {
          50: '#FFFFFF',
          100: '#EFFCFF',
          300: '#E8E8E8',
          400: '#D9D9D9',
          500: '#676161',
          600: '#000000'
        },
        secondary: {
          50: '#FFFFFF',
          100: '#D9D9D9',
          200:'#A1A1AA',
          300:'#A9A9A9',
          450:'#3E3E45',
          400:'#262629',
          500: '#27272A',
          600:'#000000'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      xs: '300px',
      s: '480px',
      sm: '640px',
      md: '768px',
      lg: '960px',
      l: '991px',
      xl: '1200px',
      xlg: '1440px',
      xxlg: '2000px'
    },
    scale: {
      0: '0',
      25: '.25',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      100: '1',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
      225: '2.25',
      250: '2.5',
      300: '3'
    }
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
