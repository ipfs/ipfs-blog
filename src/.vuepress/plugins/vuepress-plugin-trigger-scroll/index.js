const path = require('path')

module.exports = {
  name: 'vuepress-plugin-trigger-scroll',
  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
}
