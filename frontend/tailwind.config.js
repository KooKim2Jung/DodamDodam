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
      },
      fontSize: {
        'basic-size': '2.5rem',
        'input-size': '1.4rem',
      },
      backgroundImage: {
        'signup-image': "url(/public/image/dodam_signup.png)",
        'basic-image': "url(/public/image/dodam_basic.png)"
      },
      backgroundSize: {
        'signup-image': "58%",
        'basic-image': "40%"
      }
    },
  },
  plugins: [],
}

