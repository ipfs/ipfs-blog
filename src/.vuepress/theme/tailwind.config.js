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
    lineClamp: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
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
      28: '7rem',
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
      blueGreen: '#34797D',
      blueGreenScreen: '#66989a',
      blueGreenLight: '#6bc4ce',
      aquaMuted: '#9ad4db',
      charcoalMuted: '#7f8491',
      gray: {
        dark: '#707175',
        DEFAULT: '#d1d1d6',
        light: '#f5f6f7',
        pale: '#edf0f4',
        background: '#f1f3f2',
        muted: '#D8DBE1',
      },
    },
    borderColor: {
      'gray-dark': '#707175',
      'gray-default': '#d1d1d6',
    },
    borderOpacity: {
      10: '0.1',
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
    sans: ['inter', 'sans-serif'],
    serif: ['source-serif-pro', 'serif'],
    display: ['montserrat', 'sans-serif'],
  },
  textStyles: (theme) => ({
    h1: {
      fontFamily: theme('fontFamily.display'),
      lineHeight: theme('lineHeight.120'),
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.tight'),
      fontSize: theme('fontSize.35'),
      '@screen lg': {
        fontSize: theme('fontSize.50'),
      },
    },
    h2: {
      fontSize: theme('fontSize.28'),
      lineHeight: theme('lineHeight.120'),
      fontFamily: theme('fontFamily.display'),
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.tight'),
      '@screen sm': {
        fontSize: theme('fontSize.34'),
        lineHeight: theme('lineHeight.120'),
      },
    },
    h3: {
      fontFamily: theme('fontFamily.display'),
      fontWeight: theme('fontWeight.medium'),
      fontSize: theme('fontSize.20'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.27'),
      },
    },
    h4: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.18'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.18'),
        lineHeight: theme('lineHeight.140'),
      },
    },
    h5: {
      fontFamily: theme('fontFamily.display'),
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.16'),
      letterSpacing: theme('letterSpacing.tight'),
      lineHeight: theme('lineHeight.130'),
      '@screen sm': {
        fontSize: theme('fontSize.16'),
      },
    },
    p1: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.15'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.140'),
      '@screen sm': {
        fontSize: theme('fontSize.15'),
        lineHeight: theme('lineHeight.150'),
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
      fontFamily: theme('fontFamily.display'),
      fontWeight: theme('fontWeight.medium'),
      fontSize: theme('fontSize.16'),
      letterSpacing: theme('letterSpacing.tight'),
      lineHeight: theme('lineHeight.140'),
    },
    p4: {
      fontFamily: theme('fontFamily.sans'),
      fontWeight: theme('fontWeight.normal'),
      fontSize: theme('fontSize.12'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.150'),
    },
    link: {
      fontWeight: theme('fontWeight.bold'),
      color: theme('colors.blueGreen'),
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    rich: {
      extends: 'p1',
      color: theme('textColor.primary'),
      '> * + *': {
        marginTop: '1.5em',
      },
      'h1:hover .header-anchor, h2:hover .header-anchor, h3:hover .header-anchor, h4:hover .header-anchor, h5:hover .header-anchor, h6:hover .header-anchor': {
        opacity: 1,
      },
      'li + li': {
        marginTop: '1em',
      },
      'li > ul, li > ol': {
        paddingTop: '1.25rem',
      },
      h1: {
        extends: 'h2',
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
        transition: 'all',
        transitionDuration: theme('transitionDuration.200'),
        color: theme('textColor.blueGreen'),
        '&.header-anchor': {
          fontSize: '0.85em',
          marginLeft: '-0.87em',
          paddingRight: '0.23em',
          marginTop: '0.125em',
          opacity: 0,
          float: 'left',
        },
        '&.header-anchor:hover': {
          textDecoration: 'underline',
        },
      },
      'b, strong': {
        fontWeight: theme('fontWeight.bold'),
      },
      'i, em': {
        fontStyle: 'italic',
      },
      blockquote: {
        extends: 'h4',
        color: theme('textColor.black'),
        paddingLeft: theme('padding.8'),
        position: 'relative',
      },
      ul: {
        listStyleType: 'disc',
        paddingLeft: '1.25rem',
      },
      ol: {
        listStyleType: 'decimal',
        paddingLeft: '1.25rem',
      },
      img: {
        margin: '0 auto',
      },
      'img + span > .icon.outbound': {
        display: 'none',
      },
      pre: {
        padding: '1.25rem 1.5rem',
        backgroundColor: '#0e2333',
        borderRadius: '6px',
        overflowX: 'auto',
        '> code': {
          padding: '0',
          backgroundColor: 'transparent',
          borderRadius: '0',
          color: '#fff',
          fontSize: '0.85em',
          whiteSpace: 'unset',
          wordBreak: 'unset',
        },
      },
      code: {
        margin: '0',
        padding: '0.15rem 0.3rem',
        backgroundColor: 'rgba(27, 31, 35, 0.05)',
        borderRadius: '3px',
        color: 'rgba(51, 51, 51, 0.8)',
        fontSize: '0.85em',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
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
    opacity: ['group-hover', 'responsive', 'hover'],
  },
  plugins: [
    require('tailwindcss-typography')({ componentPrefix: 'type-' }),
    require('./tailwind.gradients'),
    require('tailwindcss-line-clamp'),
  ],
}
