const favicons = require('favicons')
const path = require('path')
const fs = require('fs-extra')

const source = path.resolve(__dirname, 'favicon.svg') // Source image(s). `string`, `buffer` or array of `string`
const buildDir = path.resolve(__dirname, 'build')

const configuration = {
  path: '/', // Path for overriding default icons path. `string`
  appName: 'Protocol Labs', // Your application's name. `string`
  appShortName: 'Protocol Labs', // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription:
    'Protocol Labs is building the next generation of the internet', // Your application's description. `string`
  developerName: null, // Your (or your developer's) name. `string`
  developerURL: null, // Your (or your developer's) URL. `string`
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'en-US', // Primary language for name and short_name
  background: '#156ff7', // Background colour for flattened icons. `string`
  theme_color: '#16161F', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'minimal-ui', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?source=pwa', // Start URL when launching the application from a device. `string`
  version: '1.0', // Your application's version string. `string`
  logging: true, // Print logs to console? `boolean`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //
    android: { offset: '20' }, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleIcon: { offset: '20' }, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
  },
}
const callback = function (error, response) {
  if (error) {
    console.log(error.message) // Error description e.g. "An unknown error has occurred"
    return
  }
  response.images.forEach((image) => writeFile(image.name, image.contents))
  response.files.forEach((file) => writeFile(file.name, file.contents))

  writeFile('html.json', JSON.stringify(response.html))
}

var writeFile = function (fileName, content) {
  fs.writeFile(path.resolve(buildDir, fileName), content, (err) => {
    if (err) {
      console.error(err)
    }
    // file written successfully
  })
}

fs.emptyDir(buildDir)
  .then(() => {
    favicons(source, configuration, callback)
  })
  .catch((err) => {
    console.error(err)
  })
