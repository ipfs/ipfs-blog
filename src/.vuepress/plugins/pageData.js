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

    if (frontmatter.type) {
      frontmatter.type = {
        name: frontmatter.type,
        slug: slug(frontmatter.type),
      }
    }

    if (typeof frontmatter.author === 'string') {
      frontmatter.author = frontmatter.author
        .split(/,|and|&/)
        .map((author) => ({ name: author.trim(), slug: slug(author) }))
    }

    if (frontmatter.tags) {
      frontmatter.tags = frontmatter.tags.map((tag) => ({
        name: tag,
        slug: slug(tag),
      }))
    }

    if (frontmatter.data) {
      frontmatter.data.forEach((subPage) => {
        if (subPage.tags) {
          subPage.tags = subPage.tags.map((tag) => ({
            name: tag,
            slug: slug(tag),
          }))
        }

        // set links has hidden (future publishes, etc)
        if (shouldBeHidden(subPage)) {
          subPage.hidden = true
        }
      })
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
  },
})
