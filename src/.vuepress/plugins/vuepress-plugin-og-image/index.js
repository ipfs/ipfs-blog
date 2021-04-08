const path = require('path')

module.exports = {
  name: 'vuepress-plugin-og-image',
  clientRootMixin: path.resolve(__dirname, 'pageMeta-mixin.js'),
}
