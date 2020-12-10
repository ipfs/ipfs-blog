<template>
  <main>
    <Nav v-if="shouldDisplay('nav')" ref="nav" />
    <MobileNav v-if="shouldDisplay('nav')" />
    <Transition :with-key="$page.key" appear :after-leave="leaveScroll">
      <component :is="layout" />
    </Transition>
    <Footer v-if="shouldDisplay('footer')" />
  </main>
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@app/util'
import Transition from '@theme/components/base/Transitions.vue'
import Footer from '@theme/components/Footer.vue'
import Nav from '@theme/components/Nav.vue'
import MobileNav from '@theme/components/MobileNav.vue'

export default {
  name: 'GlobalLayout',

  components: {
    Footer,
    Nav,
    MobileNav,
    Transition,
  },

  computed: {
    layout() {
      const layout = this.getLayout()
      setGlobalInfo('layout', layout)
      return Vue.component(layout)
    },
  },

  methods: {
    leaveScroll() {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$root.$emit('triggerScroll')
    },
    shouldDisplay(name) {
      const { display } = this.$page.frontmatter
      return display
        ? display[name] !== undefined
          ? display[name]
          : true
        : true
    },
    getLayout() {
      if (this.$page.path) {
        const { layout } = this.$page.frontmatter
        if (
          layout &&
          (this.$vuepress.getLayoutAsyncComponent(layout) ||
            this.$vuepress.getVueComponent(layout))
        ) {
          return layout
        }
        return 'Layout'
      }
      return 'NotFound'
    },
  },
}
</script>
