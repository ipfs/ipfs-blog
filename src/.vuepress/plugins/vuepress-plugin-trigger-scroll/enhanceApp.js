const enhanceApp = ({ router, isServer }) => {
  // we'll handle the scrolling from here, thanks
  // https://dev.to/uwutrinket/fix-scroll-jump---vue-router-45ja
  if (!isServer && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  router.options.scrollBehavior = (to, from, savedPosition) =>
    new Promise((resolve) => {
      const position = savedPosition || {}
      if (!savedPosition) {
        if (to.hash) {
          position.selector = to.hash
          position.offset = {
            x: 0,
          }
        } else {
          position.x = 0
          position.y = 0
        }
      }
      router.app.$root.$once('triggerScroll', () => {
        router.app.$nextTick(() => resolve(position))
      })
    })
}
export default enhanceApp
