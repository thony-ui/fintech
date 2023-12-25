/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
    },
    fontFamily: {
      'Roboto': ['Roboto', 'sans-serif'],
    },
    fontSize : {
      xs: "0.6rem",
      sm: '0.8rem',
      lg: "1.10rem",
      md: "0.9rem",
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': "4rem"
    },
  },
  plugins: [],
}

