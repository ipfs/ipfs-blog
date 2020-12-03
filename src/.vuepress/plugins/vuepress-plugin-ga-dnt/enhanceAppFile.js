/* global GA_ID, ga */

export default ({ router, isServer }) => {
  // only apply on client
  if (isServer) return

  const initAnalytics = () => {
    // ga integration
    if (process.env.NODE_ENV === 'production' && GA_ID) {
      ;(function (i, s, o, g, r, a, m) {
        i.GoogleAnalyticsObject = r
        i[r] =
          i[r] ||
          function () {
            ;(i[r].q = i[r].q || []).push(arguments)
          }
        i[r].l = 1 * new Date()
        a = s.createElement(o)
        m = s.getElementsByTagName(o)[0]
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(
        window,
        document,
        'script',
        'https://www.google-analytics.com/analytics.js',
        'ga'
      )

      ga('create', GA_ID, 'auto')
      ga('set', 'anonymizeIp', true)

      router.afterEach(function (to) {
        ga('set', 'page', to.fullPath)
        ga('send', 'pageview')
      })
    }
  }

  if (
    window.doNotTrack ||
    navigator.doNotTrack ||
    navigator.msDoNotTrack ||
    (window.external && 'msTrackingProtectionEnabled' in window.external)
  ) {
    // DNT available
    if (
      window.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      navigator.doNotTrack === '1' ||
      navigator.msDoNotTrack === '1' ||
      (typeof window.external.msTrackingProtectionEnabled === 'function' &&
        window.external.msTrackingProtectionEnabled())
    ) {
      // DNT enabled
    } else {
      // DNT disabled
      initAnalytics()
    }
  } else {
    // DNT not supported
    initAnalytics()
  }
}
