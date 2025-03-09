module.exports = {
  purge: ['./**/*.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'brand-primary': '#406b86',
        'brand-secondary': '#9cbcc6',
        'brand-accent': '#eb8445',
        'brand-highlight': '#a4485e',
        'brand-light': '#faf2e9',
        'brand-neutral': '#e4c5af',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#406b86',
        'secondary': '#9cbcc6',
        'accent': '#eb8445',
        'highlight': '#a4485e',
        'light': '#faf2e9',
        'neutral': '#e4c5af',
      }),
      textColor: theme => ({
        ...theme('colors'),
        'primary': '#406b86',
        'secondary': '#9cbcc6',
        'accent': '#eb8445',
        'highlight': '#a4485e',
        'light': '#faf2e9',
        'neutral': '#e4c5af',
      }),
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