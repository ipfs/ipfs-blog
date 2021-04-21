import './styles/index.css'
import Vuex from 'vuex'
import { createStore } from '@theme/store/store'
import VScrollLock from 'v-scroll-lock'
import VueMq from 'vue-mq'
import { VLazyImagePlugin } from 'v-lazy-image'
import VueSocialSharing from 'vue-social-sharing'
import Transition from '@theme/components/directives/Transition.js'

import 'vue-multiselect/dist/vue-multiselect.min.css'

export default ({ Vue, router, siteData, isServer }) => {
  const { breakpoints } = siteData.themeConfig

  /**
   * We need to update the Routers push prototype method. It's a known issue where
   * vue router won't broadcast a change event when navigating to the same route
   * or updating parameters on a route.
   * @see: https://github.com/vuejs/vue-router/issues/974
   * @see: https://github.com/vuejs/vue-router/issues/3027
   */
  const originalPush = router.push
  router.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
      return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location)
  }

  if (!isServer) {
    // track page view via Countly when route changes
    router.afterEach((to) => {
      if (!window.Countly) return
      window.Countly.q.push(['track_pageview', to.path])
    })
  }

  Vue.use(Vuex)
  Vue.use(VScrollLock)
  Vue.use(VueMq, { breakpoints })
  Vue.use(VLazyImagePlugin)
  Vue.use(VueSocialSharing)

  Vue.directive(Transition.name, Transition.directive)

  const store = createStore()
  Vue.mixin({ store: store })
}
