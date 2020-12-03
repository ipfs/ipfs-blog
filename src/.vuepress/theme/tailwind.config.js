const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1440 }
const theme = {
  extend: {
    spacing: {
      '15px': '15px',
      '58px': '58px',
      '120px': '120px',
      '140px': '140px',
      '180px': '180px',
      '240px': '240px',
    },
    screens: Object.fromEntries(
      Object.entries(breakpoints).map(([k, v]) => [k, `${v}px`])
    ),
    letterSpacing: {
      tight: '-0.01em',
      loose: '0.01em',
    },
    lineHeight: {
      120: '1.2',
      125: '1.25',
      130: '1.3',
      140: '1.4',
      150: '1.5',
    },
    maxWidth: {
      '1/6': '16.666667%',
      '1/5': '20%',
      '1/4': '25%',
      '1/3': '33.33%',
    },
    zIndex: {
      '-1': '-1',
      '-10': '-10',
    },
    minHeight: {
      500: '500px',
    },
    rotate: {
      5: '5deg',
    },
    fontSize: {
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
      22: '1.375rem',
      24: '1.5rem',
      28: '1.75rem',
      30: '1.875rem',
      35: '2.1875rem',
      36: '2.25rem',
      50: '3.125rem',
    },
    opacity: {
      60: '.6',
    },
    colors: {
      webBlue: '#156FF7',
      deepBlue: '#002256',
      plBlack: '#16161F',
      blueGreen: '#3e9096',
      gray: {
        dark: '#707175',
        default: '#d1d1d6',
        light: '#f5f6f7',
        pale: '#edf0f4',
      },
    },
    borderColor: {
      'gray-dark': '#707175',
      'gray-default': '#d1d1d6',
    },
    textColor: {
      primary: '#16161F',
    },
    transitionDuration: {
      2000: '2000ms',
    },
    gridTemplateColumns: {
      '2-offset-left': 'repeat(1, minmax(0, 1fr) minmax(0, 2fr))',
      '2-offset-right': 'repeat(1, minmax(0, 2fr) minmax(0, 1fr))',
    },
  },
  fontFamily: {
    sans: ['aileron', 'sans-serif'],
    serif: ['source-serif-pro', 'serif'],
  },
  textStyles: (theme) => ({
    h1: {
      fontFamily: theme('fontFamily.sans'),
      lineHeight: theme('lineHeight.120'),
      fontWeight: theme('fontWeight.semibold'),
      letterSpacing: theme('letterSpacing.tight'),
      fontSize: theme('fontSize.35'),
      '@screen sm': {
        fontSize: theme('fontSize.50'),
      },
    },
    h2: {
      fontSize: theme('fontSize.30'),
      lineHeight: theme('lineHeight.120'),
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.bold'),
      letterSpacing: theme('letterSpacing.tight'),
      '@screen sm': {
        fontSize: theme('fontSize.36'),
        lineHeight: theme('lineHeight.125'),
      },
    },
    h3: {
      fontFamily: theme('fontFamily.serif'),
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.24'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.30'),
      },
    },
    h4: {
      fontFamily: theme('fontFamily.serif'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.24'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.28'),
        lineHeight: theme('lineHeight.140'),
      },
    },
    h5: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.18'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.22'),
      },
    },
    p1: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.16'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.18'),
        lineHeight: theme('lineHeight.140'),
      },
    },
    'p1-serif': {
      fontFamily: theme('fontFamily.serif'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.16'),
      lineHeight: theme('lineHeight.150'),
      letterSpacing: theme('letterSpacing.tight'),
      '@screen sm': {
        fontSize: theme('fontSize.18'),
      },
    },
    p2: {
      fontFamily: theme('fontFamily.serif'),
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.18'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
    },
    p3: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.16'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.140'),
    },
    p4: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.12'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.150'),
    },
    cta: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.16'),
      lineHeight: theme('lineHeight.130'),
      letterSpacing: theme('letterSpacing.loose'),
    },
    link: {
      fontWeight: theme('fontWeight.bold'),
      color: theme('colors.webBlue'),
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    rich: {
      extends: 'p1-serif',
      h1: {
        extends: 'h1',
      },
      h2: {
        extends: 'h2',
      },
      h3: {
        extends: 'h3',
      },
      h4: {
        extends: 'h4',
      },
      h5: {
        extends: 'h5',
      },
      h6: {
        extends: 'h6',
      },
      a: {
        extends: 'link',
      },
      blockquote: {
        extends: 'h4',
      },
    },
  }),
}

module.exports = {
  breakpoints,
  theme,
  variants: {
    margin: ['responsive', 'first', 'last'],
    scale: ['group-hover', 'hover'],
    rotate: ['group-hover'],
    opacity: ['group-hover', 'responsive'],
  },
  plugins: [
    require('tailwindcss-typography')({ componentPrefix: 'type-' }),
    require('./tailwind.gradients'),
  ],
}
