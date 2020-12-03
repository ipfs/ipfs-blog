const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.bg-gradient-1': {
      background: 'linear-gradient(311.2deg, #1a1c49 41.59%, #367ce4 121.07%)',
    },
    '.bg-gradient-2': {
      background: 'linear-gradient(323.03deg, #1f6ce0 20.31%, #4df185 118.99%)',
    },
    '.bg-gradient-3': {
      background: 'linear-gradient(104.24deg, #1a74fc -4.4%, #4ef286 112.23%)',
    },
    '.bg-gradient-4': {
      background: 'linear-gradient(294.43deg, #0819ae 10.18%, #2166cd 100%)',
    },
    '.bg-gradient-5': {
      background: 'linear-gradient(287.44deg, #2166cd 10.18%, #0819ae 100%)',
    },
    '.bg-gradient-6': {
      background: 'linear-gradient(to bottom,#041727 0,#062b3f 100%)',
    },
  }

  addUtilities(newUtilities, ['responsive', 'hover'])
})
