const slug = require('slug')

module.exports = (options, context) => ({
  extendPageData($page) {
    const { frontmatter } = $page

    // author config
    const authorName = frontmatter.author
    if (typeof authorName === 'string') {
      const authorKey = slug(authorName, { lower: true })

      // setup author stub to keep templates happy
      const author = { name: authorName }

      // setup the page author object
      frontmatter.author = author
      frontmatter.authorKey = authorKey
    }

    // exclude a page from the feed & robots if excluded from sitemap
    if (frontmatter.sitemap && frontmatter.sitemap.exclude) {
      frontmatter.feed = {
        enable: false,
      }

      const noIndex = { name: 'robots', content: 'noindex' }
      if (Array.isArray(frontmatter.meta)) {
        frontmatter.meta.push(noIndex)
      } else {
        frontmatter.meta = [noIndex]
      }
    }
  },
})
