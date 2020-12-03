const { path } = require('@vuepress/shared-utils')

// eslint-disable-next-line default-param-last
module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-ga-dnt',
  define() {
    const { siteConfig = {} } = context
    const ga = options.ga || siteConfig.ga
    const GA_ID = ga || false
    return { GA_ID }
  },

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
})
