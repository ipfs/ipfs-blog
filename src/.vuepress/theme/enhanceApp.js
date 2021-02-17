import './styles/index.css'
import Vuex from 'vuex'
import { createStore } from '@theme/store/store'
import VScrollLock from 'v-scroll-lock'
import VueMq from 'vue-mq'
import { VLazyImagePlugin } from 'v-lazy-image'
import VueObserveVisibility from 'vue-observe-visibility'
import VueSocialSharing from 'vue-social-sharing'
import ImageCrop from '@theme/layouts/ImageCrop'

import Transition from '@theme/components/directives/Transition.js'

export default ({ Vue, router, siteData }) => {
  router.addRoutes([{ path: '/image-crop', component: ImageCrop }])

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

  Vue.use(Vuex)
  Vue.use(VScrollLock)
  Vue.use(VueMq, { breakpoints })
  Vue.use(VLazyImagePlugin)
  Vue.use(VueObserveVisibility)
  Vue.use(VueSocialSharing)

  Vue.directive(Transition.name, Transition.directive)

  const store = createStore()
  Vue.mixin({ store: store })
}
