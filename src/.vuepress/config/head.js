const favicons = ['16x16', '32x32', '48x48'].map((size) => [
  'link',
  {
    rel: 'icon',
    type: 'image/png',
    sizes: size,
    href: `/favicon-${size}.png`,
  },
])

module.exports = [
  ['link', { rel: 'stylesheet', href: '/fonts.css' }],
  ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  [
    'link',
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#16161F' },
  ],
  [
    'link',
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
  ],
  ['meta', { name: 'theme-color', content: '#16161F' }],
  ['meta', { name: 'msapplication-TileColor', content: '#156ff7' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: 'Protocol Labs' }],
  ['meta', { name: 'application-name', content: 'Protocol Labs' }],
].concat(favicons)
