<template>
  <mq-layout :mq="['sm', 'md']">
    <transition name="transition-content" @after-enter="afterEnter">
      <div
        v-if="mobileNavActive"
        v-scroll-lock="mobileNavActive"
        class="mobile-nav bg-gradient-6 grid grid-cols-12 fixed h-full top-0 inset-x-0 text-white flex flex-col z-40"
      >
        <div class="col-span-10 col-start-2 flex flex-col py-8">
          <div class="flex-grow justify-center flex flex-col">
            <nav>
              <ul>
                <li
                  v-for="page in $site.themeConfig.mobileNavLinks"
                  :key="page.title"
                  class="mb-3"
                >
                  <Link class="mobile-nav__link type-h1" :item="page" />
                </li>
              </ul>
            </nav>
          </div>
          <SocialLinks class="mobile-nav_footer flex" />
        </div>
      </div>
    </transition>
  </mq-layout>
</template>

<script>
import { mapState } from 'vuex'
import SocialLinks from '@theme/components/SocialLinks'
import Link from '@theme/components/base/Link'
import trapFocus from '@theme/util/trapFocus'

export default {
  name: 'MobileNav',
  components: {
    SocialLinks,
    Link,
  },
  data() {
    return {
      tabItems: [],
    }
  },
  computed: {
    ...mapState('appState', ['mobileNavActive', 'routerLocation']),
  },
  watch: {
    routerLocation() {
      if (this.mobileNavActive) {
        this.$store.commit('appState/toggleMobileNav', false)
      }
    },
  },
  destroyed() {
    window.removeEventListener('keydown', this.trapFocus)
  },
  methods: {
    closeMenu() {
      this.$store.commit('appState/toggleMobileNav', false)
    },
    setTabItems() {
      if (this.tabItems.length) {
        window.removeEventListener('keydown', this.trapFocus)
      }
      const tabItems = [
        ...Array.from(
          this.$parent.$refs.nav.$el.querySelectorAll('.mobile-list-item')
        ),
        ...Array.from(this.$el.querySelectorAll('A, button')),
      ]

      this.tabItems = tabItems.filter((el) => {
        const style = window.getComputedStyle(el)
        return style.display !== 'none'
      })

      this.trapFocus = trapFocus.bind(null, this.tabItems, this.closeMenu)
      window.addEventListener('keydown', this.trapFocus)
    },
    afterEnter() {
      this.setTabItems()
    },
  },
}
</script>

<style lang="postcss" scoped>
.mobile-nav__link {
  position: relative;
}

.mobile-nav__link.router-link-active:after {
  content: '';
  height: 1px;
  bottom: -2px;
  background-color: currentColor;
  @apply absolute;
  @apply w-full;
  @apply left-0;
  @apply transition-opacity;
  @apply duration-200;
}

.transition-content-enter-active,
.transition-content-leave-active {
  @apply transition transform duration-300 ease-in-out opacity-100 scale-100;
}
.transition-content-enter,
.transition-content-leave-to {
  @apply opacity-0 scale-105;
}
</style>
