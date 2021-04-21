const { reverse, sortBy } = require('lodash')

// configure this to an absolute url to enable a generated sitemap & blog RSS feeds
const CANONICAL_BASE = process.env.CANONICAL_BASE || ''
const IPFS_DEPLOY = process.env.IPFS_DEPLOY === 'true' || false
const SPEEDCURVE_ID = process.env.SPEEDCURVE_ID || ''

const themeConfigDefaults = {
  dateFormat: 'DD MMMM YYYY',
  socialLinks: [
    {
      text: 'Github',
      link: 'https://github.com/ipfs',
      icon: 'github-icon',
    },
    {
      text: 'YouTube',
      link: 'https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew',
      icon: 'youtube-icon',
    },
    {
      text: 'Twitter',
      link: 'http://twitter.com/ipfs',
      icon: 'twitter-icon',
    },
    {
      text: 'LinkedIn',
      link: 'https://www.linkedin.com/company/protocollabs/',
      icon: 'linkedin-icon',
    },
  ],
  footerLinks: [
    { text: 'Blog & news', link: '/' },
    { text: 'Press', link: 'https://ipfs.io/media/' },
    {
      text: 'Code of conduct',
      link: 'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
    },
    {
      text: 'Security',
      link:
        'https://github.com/ipfs/community/blob/master/CONTRIBUTING.md#security-issues',
    },
  ],
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
}

module.exports = {
  title: 'IPFS Blog & News',
  description:
    'All the latest information about the IPFS Project in one place: blog posts, release notes, videos, news coverage, and more.',
  locales: {
    '/': {
      lang: 'EN',
      title: 'IPFS Blog & News',
      description:
        'All the latest information about the IPFS Project in one place: blog posts, release notes, videos, news coverage, and more.',
    },
    '/zh-cn/': {
      lang: '中文',
      title: 'IPFS Blog & News',
      description:
        'ZH - All the latest information about the IPFS Project in one place: blog posts, release notes, videos, news coverage, and more.',
    },
  },
  shouldPrefetch: () => false,
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
      md.use(require('markdown-it-imsize'))
      md.use(require('markdown-it-image-lazy-loading'))
    },
  },
  themeConfig: {
    domain: CANONICAL_BASE,
    locales: {
      '/': themeConfigDefaults,
      '/zh-cn/': {
        ...themeConfigDefaults,
        footerLinks: [
          { text: 'Blog & news', link: '/zh-cn/' },
          { text: 'Press', link: 'https://ipfs.io/media/' },
          {
            text: 'Code of conduct',
            link:
              'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
          },
          {
            text: 'Security',
            link:
              'https://github.com/ipfs/community/blob/master/CONTRIBUTING.md#security-issues',
          },
        ],
        headerLinks: [
          { text: 'About', link: 'https://ipfs.io/#why' },
          { text: 'Install', link: 'https://ipfs.io/#install' },
          { text: 'Docs', link: 'https://docs.ipfs.io/' },
          { text: 'Team', link: 'https://ipfs.io/team' },
          { text: 'Blog', link: '/zh-cn' },
          { text: 'Help', link: 'https://ipfs.io/help' },
        ],
        mobileNavLinks: [
          { text: 'About', link: 'https://ipfs.io/#why' },
          { text: 'Install', link: 'https://ipfs.io/#install' },
          { text: 'Docs', link: 'https://docs.ipfs.io/' },
          { text: 'Team', link: 'https://ipfs.io/team' },
          { text: 'Blog', link: '/zh-cn/' },
          { text: 'Help', link: 'https://ipfs.io/help' },
        ],
      },
    },
  },
  plugins: [
    [require('./plugins/vuepress-plugin-speedcurve'), { id: SPEEDCURVE_ID }],
    ['@vuepress/last-updated'],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/ipfs-404.html',
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
    [require('./plugins/pageData')],
    [require('./plugins/vuepress-plugin-trigger-scroll')],
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
              file_name: 'index.xml',
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
          exclude: ['/image-crop/', '/ipfs-404.html'],
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
              title: 'Home',
              description: 'Blog, news & more',
            },
            pagination: {
              lengthPerPage: Number.MAX_SAFE_INTEGER,
            },
          },
          {
            id: 'blog_zh',
            dirname: '_blog_zh',
            path: '/zh-cn/',
            itemPermalink: '/zh-cn/:slug',
            layout: 'Blog',
            itemLayout: 'BlogPost',
            frontmatter: {
              title: 'Home',
              description: 'Blog, news & more',
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
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.header_image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.header_image
            : ($site.themeConfig.domain || '') + '/social-card.png',
        publishedAt: ($page) =>
          $page.frontmatter.date &&
          new Date($page.frontmatter.date).toISOString(),
        modifiedAt: ($page) =>
          $page.lastUpdated && new Date($page.lastUpdated).toISOString(),
      },
    ],
    [require('./plugins/vuepress-plugin-og-image')],
    ['vuepress-plugin-robots', { host: CANONICAL_BASE }],
    [
      '@vuepress/html-redirect',
      {
        countdown: 0,
      },
    ],
    'vuepress-plugin-chunkload-redirect',
    ['vuepress-plugin-ipfs', IPFS_DEPLOY],
  ],
  extraWatchFiles: ['.vuepress/config/head.js'],
  chainWebpack: (config, isServer) => {
    config.module.rules.delete('svg')

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.limit = -1
        return options
      })

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
  additionalPages: [
    {
      path: '/image-crop/',
      frontmatter: {
        layout: 'ImageCrop',
      },
    },
  ],
}
