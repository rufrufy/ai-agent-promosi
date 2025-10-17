/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vibrant-pink': '#ff0080',
        'vibrant-purple': '#8b5cf6',
        'vibrant-blue': '#3b82f6',
        'vibrant-teal': '#06b6d4',
        'vibrant-green': '#10b981',
        'vibrant-orange': '#f59e0b',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        vibrant: {
          "primary": "#ff0080",
          "secondary": "#8b5cf6", 
          "accent": "#06b6d4",
          "neutral": "#2a323c",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#f87272",
        },
      },
      "light", "dark"
    ],
  },
}