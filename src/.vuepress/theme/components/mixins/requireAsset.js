import { isExternal } from '@theme/util'
const { normalize, isAbsolute } = require('path')

export default {
  methods: {
    requireAsset: function (assetPath) {
      // bail if assetPath doesn't exist
      if (!assetPath) return ''

      // if a url or absolute path simply return the asset link
      if (isExternal(assetPath)) return assetPath

      if (isAbsolute(assetPath)) {
        const fullPath = normalize(assetPath).replace(/^\/|\/$/g, '')
        try {
          return require('@source/assets/' + fullPath)
        } catch (e) {
          console.error('Could not load asset: ', fullPath)
          return ''
        }
      }
    },
  },
}
