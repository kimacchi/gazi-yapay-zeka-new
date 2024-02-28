const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "light-blue": "#8ecae6",
        "sea-blue": "#219ebc",
        "dark-blue": "#023047",
        "light-orange": "#ffb703",
        "dark-orange": "#fb8500",
        "background": "#001219",
        "background-secondary": "#003233",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        "celebration-bg": 'linear-gradient(298deg, rgba(36,20,41,1) 0%, rgba(23,23,23,1) 100%);'
      },
      fontFamily: {
        Roboto: ["Roboto Mono", "monospace", "sans-serif"],
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
