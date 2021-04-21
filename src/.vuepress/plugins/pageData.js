const slug = require('slug')
const dayjs = require('dayjs')

function shouldBeHidden(frontmatter) {
  const isDateInFuture = (date) => dayjs(new Date(date)).isAfter(dayjs())
  let shouldHide = frontmatter.hidden || false

  // sitemap config
  if (frontmatter.sitemap) {
    shouldHide = shouldHide || frontmatter.sitemap.exclude
  }

  // scheduled posts
  // see auto-publishing of scheduled posts here: https://github.com/ipfs/ipfs-blog/issues/147
  if (
    !shouldHide &&
    frontmatter.permalink && // permalink is unique to posts
    frontmatter.date
  ) {
    shouldHide = shouldHide || isDateInFuture(frontmatter.date)
  }

  // scheduled links (path is unique to links)
  if (!shouldHide && frontmatter.path && frontmatter.publish_date) {
    shouldHide = shouldHide || isDateInFuture(frontmatter.publish_date)
  }

  return shouldHide
}

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

    // exclude hidden pages (sitemap config, future publishes, etc)
    if (shouldBeHidden(frontmatter)) {
      frontmatter.feed = {
        enable: false,
      }

      const noIndex = { name: 'robots', content: 'noindex' }
      if (Array.isArray(frontmatter.meta)) {
        frontmatter.meta.push(noIndex)
      } else {
        frontmatter.meta = [noIndex]
      }

      frontmatter.hidden = true
      $page.hidden = true
    }

    // set links has hidden (future publishes, etc)
    if (frontmatter.data) {
      frontmatter.data.forEach((item) => {
        if (shouldBeHidden(item)) {
          item.hidden = true
        }
      })
    }
  },
})
