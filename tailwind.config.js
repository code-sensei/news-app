/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-content': 'linear-gradient(180deg, rgba(27, 12, 3, 0.8) 100%, rgba(0, 0, 0, 0) 100%);'
      },
      colors: {
        light: '#F7F7F7',
        main: '#2B1C12',
        'grey': '#97928E',
        background: '#E5E5E5'
      },
      fontFamily: {
        'main': ['Kanit', 'san-serif']
      },
      fontSize: {
        'headline-title': ['20px', {
          lineHeight: '32px'
        }]
      }
    },
  },
  plugins: [],
}
