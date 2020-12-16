const { chalk } = require('@vuepress/shared-utils')
const slug = require('slug')

module.exports = (options, context) => ({
  extendPageData($page) {
    const { frontmatter, _filePath } = $page
    const { authors } = options

    // author config
    const authorName = frontmatter.author
    const authorAvatarUrl = frontmatter.avatarUrl

    if (typeof authorName === 'string') {
      const authorKey = slug(authorName, { lower: true })

      // setup author stub to keep templates happy
      let author = { name: authorName }

      if (authors.has(authorKey)) {
        author = authors.get(authorKey)
      } else if (authorAvatarUrl) {
        author.avatarUrl = authorAvatarUrl
      } else {
        console.error(
          `${chalk.red(
            'error'
          )} Could not find a configured author for ${chalk.cyan(
            authorName
          )} used in ${_filePath}. You need to add a new key in ${chalk.cyan(
            '.vuepress/config/authors.js'
          )} or set a frontmatter value for ${chalk.cyan('avatarUrl')}`
        )
      }
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
