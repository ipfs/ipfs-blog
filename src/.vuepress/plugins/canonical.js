//                                                         👇 ensure one trailing slash is present
const normalizePath = (path) => path.replace('/_blog', '').replace(/\/*$/, '/')

module.exports = ({ CANONICAL_BASE } = {}) => ({
  name: 'vuepress-default-canonical',
  extendPageData({ frontmatter, path }) {
    // If no canonicalUrl is explicitly defined in the frontmatter, construct it from the permaLink or $page.path
    if (!frontmatter.canonicalUrl && CANONICAL_BASE) {
      frontmatter.canonicalUrl =
        CANONICAL_BASE + normalizePath(frontmatter.permalink || path || '')
    }
  },
})
