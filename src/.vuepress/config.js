const { reverse, sortBy } = require('lodash')
const authors = require('./config/authors')

// configure this to an absolute url to enable a generated sitemap & blog RSS feeds
const CANONICAL_BASE = process.env.CANONICAL_BASE || ''
const IPFS_DEPLOY = process.env.IPFS_DEPLOY === 'true' || false

module.exports = {
  title: 'IPFS Blog',
  description:
    'This is the IPFS Starlog, a series of communications about the IPFS Project.',
  domain: CANONICAL_BASE,
  authors,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'IPFS Blog',
      description:
        'This is the IPFS Starlog, a series of communications about the IPFS Project.',
    },
  },
  head: require('./config/head'),
  dest: './dist',
  markdown: {
    extendMarkdown: (md) => {
      md.set({
        breaks: true,
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist'))
    },
  },
  themeConfig: {
    dateFormat: 'DD MMMM YYYY',
    socialLinks: [
      {
        text: 'Twitter',
        link: 'https://twitter.com/protocollabs',
        icon: 'twitter-icon',
      },
      {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/company/protocollabs/',
        icon: 'linkedin-icon',
      },
      {
        text: 'YouTube',
        link: 'https://www.youtube.com/ProtocolLabs/',
        icon: 'youtube-icon',
      },
    ],
    footerLinks: [],
    footerLegal: '',
    headerLinks: [
      { text: 'About', link: 'https://ipfs.io/#why' },
      { text: 'Install', link: 'https://ipfs.io/#install' },
      { text: 'Docs', link: 'https://docs.ipfs.io/' },
      { text: 'Team', link: 'https://ipfs.io/team' },
      { text: 'Blog', link: '/' },
      { text: 'Help', link: 'https://ipfs.io/help' },
    ],
    mobileNavLinks: [
      { text: 'About', link: 'https://ipfs.io/#why' },
      { text: 'Install', link: 'https://ipfs.io/#install' },
      { text: 'Docs', link: 'https://docs.ipfs.io/' },
      { text: 'Team', link: 'https://ipfs.io/team' },
      { text: 'Blog', link: '/' },
      { text: 'Help', link: 'https://ipfs.io/help' },
    ],
  },
  plugins: [
    ['@vuepress/last-updated'],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404/',
      },
    ],
    [
      'vuepress-plugin-canonical',
      CANONICAL_BASE
        ? {
            baseURL: CANONICAL_BASE,
            stringExtension: true,
          }
        : false,
    ],
    [require('./plugins/pageData'), { authors }],
    [require('./plugins/vuepress-plugin-trigger-scroll')],
    // [require('./plugins/vuepress-plugin-ga-dnt'), { ga: 'UA-xxxxxx' }],
    ['vuepress-plugin-img-lazy'],
    [
      '@vuepress/blog',
      {
        feed: {
          canonical_base: CANONICAL_BASE,
          sort: (entries) => reverse(sortBy(entries, 'date')),
          feed_options: {},
          feeds: {
            rss2: {
              enable: true,
            },
            atom1: {
              enable: false,
            },
            json1: {
              enable: false,
            },
          },
        },
        sitemap: {
          hostname: CANONICAL_BASE,
          changefreq: 'weekly',
        },
        directories: [
          {
            id: 'blog',
            dirname: '_blog',
            path: '/',
            itemPermalink: '/:slug',
            layout: 'Blog',
            itemLayout: 'BlogPost',
            frontmatter: {
              title: 'Blog',
              description:
                'This is the IPFS Starlog, a series of communications about the IPFS Project.',
            },
            pagination: {
              lengthPerPage: Number.MAX_SAFE_INTEGER,
            },
          },
        ],
      },
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: ($page, $site) => $page.title || $site.title,
        description: ($page, $site) =>
          $page.frontmatter.description || $site.description,
        author: ($page) => $page.frontmatter.author,
        tags: ($page) => $page.frontmatter.tags,
        twitterCard: (_) => 'summary_large_image',
        type: ($page) =>
          ['_blog'].some((folder) => $page.regularPath.startsWith('/' + folder))
            ? 'article'
            : 'website',
        url: (_, $site, path) => ($site.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.domain || '') + $page.frontmatter.image
            : ($site.domain || '') + '/images/og-default.jpg',
        publishedAt: ($page) =>
          $page.frontmatter.date &&
          new Date($page.frontmatter.date).toISOString(),
        modifiedAt: ($page) =>
          $page.lastUpdated && new Date($page.lastUpdated).toISOString(),
        customMeta: (add, ctx) => {
          const { $site } = ctx
          if ($site.authors instanceof Map) {
            // select first object from the authors list
            const { twitter } = $site.authors.values().next().value
            add('twitter:site', twitter)
          }
        },
      },
    ],
    ['vuepress-plugin-robots', { host: CANONICAL_BASE }],
    [
      '@vuepress/html-redirect',
      {
        duration: 0,
      },
    ],
    ['vuepress-plugin-ipfs', IPFS_DEPLOY],
  ],
  extraWatchFiles: ['.vuepress/config/head.js', '.vuepress/config/authors.js'],
  chainWebpack: (config, isServer) => {
    config.module.rules.delete('svg')

    // prettier-ignore
    config.module
      .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
          .oneOf('svg-sprite')
            .include
              .add(/svg-icon/)
            .end()
            .use('svg-sprite-loader')
              .loader('svg-sprite-loader')
              .end()
            .use('svgo-loader')
              .loader('svgo-loader')
              .options({
                removeDimensions: true,
                removeAttrs: {
                  attrs: '*:(stroke|fill):((?!^none$).)*',
                },
              })
              .end()
            .end()
          .oneOf('svg-file')
            .use('file-loader')
              .loader('file-loader')
              .options({
                name: `assets/img/[name].[hash:8].[ext]`,
              })
            .end()
          .end()
  },
}
