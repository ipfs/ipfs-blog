const { normalize } = require('path')

export default {
  created() {
    if (typeof this.$ssrContext !== 'undefined') {
      const meta = this.$frontmatter.meta
      const og = meta && meta.find((m) => m.property === 'og:image')
      if (meta && og) {
        try {
          const assetPath = normalize(og.content).replace(/^\/|\/$/g, '')
          const imgPath = require('@source/assets/' + assetPath)
          const { pageMeta } = this.$ssrContext
          this.$ssrContext.pageMeta = pageMeta.replace(
            new RegExp(og.content, 'g'),
            imgPath
          )
        } catch (e) {
          throw new Error(`could not load og:image ${og.content}`)
        }
      }
    }
  },
}
