import { isExternal } from '@theme/util'
const { normalize, isAbsolute } = require('path')

export default {
  methods: {
    requireAsset: function (assetPath, ctx = this.$page.regularPath) {
      // bail if assetPath doesn't exist
      if (!assetPath) return ''

      // if a url or absolute path simply return the asset link
      if (isExternal(assetPath)) return assetPath
      if (isAbsolute(assetPath)) return this.withBase(assetPath)

      const fullPath = normalize(ctx + assetPath).replace(/^\/|\/$/g, '')
      try {
        return require('@source/' + fullPath)
      } catch (e) {
        console.error('could not load asset: ', fullPath)
        return ''
      }
    },
    withBase: function (path = '') {
      const { $withBase } = this.$root
      return path.charAt(0) === '/' ? $withBase.call(this, path) : path
    },
  },
}
