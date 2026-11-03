/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Paleta Atelier Éclosion: dorado y burdeos tomados del logo oficial;
      // neutros cálidos para dar protagonismo a las fotos de las joyas.
      colors: {
        ivoire: '#FAF6F0',
        porcelaine: '#FFFDF9',
        lin: '#F1E9DD',
        sable: '#E6DACA',
        grege: '#D9CCBB',
        encre: '#1F1A17',
        taupe: '#6E625A',
        'taupe-clair': '#9A8E84',
        or: '#BC7C1C',
        'or-pale': '#EED9B6',
        bordeaux: '#570A04',
        erreur: '#B3261E',
      },
      fontFamily: {
        serif: ['CormorantGaramond-Regular'],
        'serif-medium': ['CormorantGaramond-Medium'],
        'serif-italic': ['CormorantGaramond-Italic'],
        sans: ['Jost-Regular'],
        'sans-light': ['Jost-Light'],
        'sans-medium': ['Jost-Medium'],
      },
    },
  },
  plugins: [],
};
