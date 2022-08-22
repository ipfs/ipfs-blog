module.exports = (options, context) => ({
  name: 'vuepress-default-canonical',
  extendPageData($page) {
    const { frontmatter } = $page
    // If no canonicalUrl is explictly defined in the Frontmatter, add it based on the permaLink
    if (!frontmatter.canonicalUrl && frontmatter.permalink) {
      frontmatter.canonicalUrl = `${$page?._context?.themeConfig?.domain}${frontmatter.permalink}`
      return
    }

    if (!frontmatter.permalink && $page._permalink) {
      // Set the canonical URL to theme pages (which don't have a frontmatter permalink)
      frontmatter.canonicalUrl = `${$page?._context?.themeConfig?.domain}`
    }
  },
})
