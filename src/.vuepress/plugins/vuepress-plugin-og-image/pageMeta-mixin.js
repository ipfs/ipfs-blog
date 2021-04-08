const { normalize } = require('path')

export default {
  created() {
    if (typeof this.$ssrContext !== 'undefined') {
      const meta = this.$frontmatter.meta
      const og = meta && meta.find((m) => m.property === 'og:image')
      if (meta && og) {
        const ogPath = new URL(og.content, 'http://locahost').pathname
        const assetPath = normalize(ogPath).replace(/^\/|\/$/g, '')
        try {
          const imgPath = require('@source/assets/' + assetPath)
          const { pageMeta } = this.$ssrContext
          this.$ssrContext.pageMeta = pageMeta.replace(
            new RegExp(ogPath, 'g'),
            imgPath
          )
        } catch (e) {
          throw new Error(`could not load og:image ${ogPath}`)
        }
      }
    }
  },
}
