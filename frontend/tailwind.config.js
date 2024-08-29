/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gamja': ['"Gamja Flower"', 'cursive'],
      },
      colors: {
        primary: '#FEFAED',
        secondary: '#FEEBA4',
        tertiay: '#FFF1C5',
        borderColor: 'rgb(127, 91, 61)',
      },
      boxShadow: {
        custom1: '0 0 0 3px rgb(254, 232, 147)',
        custom2: '0 0 0 3px rgb(127, 91, 61)',
      },
      fontSize: {
        'basic-size': '2.5rem',
        'middle-size': '1.4rem',
        'title-size': '9rem',
        'small-size': '1.2rem',
      },
      backgroundImage: {
        'basic-image': "url(/public/images/dodam_basic.png)",
      },
      animation: {
        'translate-right-dodam': 'translateRightDodam 1s ease-in-out forwards',
        'translate-left-dodam': 'translateLeftDodam 1s ease-in-out forwards',
        'translate-dodam': 'translateDodam 1s ease-in-out forwards',
      },
      keyframes: {
        translateRightDodam: {
          '0%': { transform: 'translateX(-6rem)' }, 
          '100%': { transform: 'translateX(0rem)' }, 
        },
        translateLeftDodam: {
          '0%': { transform: 'translateX(6rem)' }, 
          '100%': { transform: 'translateX(0rem)' }, 
        },
      },
    },
  },
  plugins: [],
}

