<template>
  <main>
    <Transition :with-key="$page.key" appear :after-leave="leaveScroll">
      <component :is="layout" />
    </Transition>
  </main>
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@app/util'
import Transition from '@theme/components/base/Transitions.vue'
import Footer from '@theme/components/Footer.vue'

export default {
  name: 'GlobalLayout',

  components: {
    Footer,
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
