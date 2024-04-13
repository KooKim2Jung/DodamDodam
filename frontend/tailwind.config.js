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
      },
      fontSize: {
        'basic-size': '2.5rem',
        'middle-size': '1.4rem',
        'title-size': '9rem',
        'small-size': '1.2rem',
      },
      backgroundImage: {
        'signup-image': "url(/public/image/dodam_signup.png)",
        'basic-image': "url(/public/image/dodam_basic.png)"
      },
      backgroundSize: {
        'signup-image': '58%',
      },
    },
  },
  plugins: [],
}

