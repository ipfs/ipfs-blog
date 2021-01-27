const { reverse, sortBy } = require('lodash')
const authors = require('./config/authors')

// configure this to an absolute url to enable a generated sitemap & blog RSS feeds
const CANONICAL_BASE = process.env.CANONICAL_BASE || ''
const IPFS_DEPLOY = process.env.IPFS_DEPLOY === 'true' || false

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
  domain: CANONICAL_BASE,
  authors,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'IPFS Blog & News',
      description:
        'All the latest information about the IPFS Project in one place: blog posts, release notes, videos, news coverage, and more.',
    },
    '/zh-cn/': {
      lang: 'zh-CN',
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
    },
  },
  themeConfig: {
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
