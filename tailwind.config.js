module.exports = {
  purge: ['./**/*.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'brand-blue': '#3b82f6',
        'brand-teal': '#2dd4bf',
        'brand-yellow': '#eab308',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      scale: ['hover', 'focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
} 