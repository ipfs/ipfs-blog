<template>
  <nav
    ref="nav"
    class="fixed top-0 inset-x-0 transition duration-300 ease-out transform z-50"
    :class="[
      displayMode,
      {
        '-translate-y-full': navVisibility.navSticky,
        navVisible: navVisibility.navVisible,
        navSticky: navVisibility.navSticky,
        mobileNavOpen: mobileNavActive,
      },
    ]"
  >
    <div class="grid-margins">
      <div class="flex justify-between items-center h-20">
        <a
          class="hover:opacity-75 transition transition-opacity duration-300 ease-in-out mobile-list-item"
          href="https://blog.ipfs.io/"
        >
          <SVGIcon
            name="ipfs-logo"
            title="IPFS"
            :class-list="['w-32', 'fill-current']"
          />
        </a>
        <ul class="nav__link-list hidden md:flex">
          <li
            v-for="page in $site.themeConfig.headerLinks"
            :key="page.text"
            class="nav__link-item ml-16 first:m-0 font-semibold"
          >
            <Link class="nav__link" :item="page" />
          </li>
        </ul>
        <button
          aria-label="Toggle Mobile Menu"
          class="sm:visible md:hidden mobile-list-item"
          @click="toggleMobileMenu"
        >
          <div class="hamburger-icon w-8 h-8"></div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { throttle } from 'lodash'
import { mapState } from 'vuex'
import SVGIcon from '@theme/components/base/SVGIcon'
import Link from '@theme/components/base/Link'

export default {
  name: 'Nav',
  components: {
    SVGIcon,
    Link,
  },
  props: {
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navVisibility: {
        navVisible: false,
        navSticky: false,
      },
    }
  },
  computed: {
    ...mapState('appState', ['mobileNavActive', 'navHeight']),
    displayMode() {
      return 'text-white'
    },
  },
  mounted() {
    this.$store.commit(
      'appState/setNavHeight',
      this.$refs.nav.getBoundingClientRect().height
    )

    this.throttledFunction = throttle(this.handleScroll, 100)
    window.addEventListener('scroll', this.throttledFunction)
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttledFunction)
  },
  methods: {
    handleScroll() {
      // responsive force: lower on mobile higher on desktop
      const SCROLL_FORCE = ['sm', 'md'].includes(this.$mq) ? 100 : 250

      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop

      // ignore negative calculations on mobile
      if (currentScrollPosition < 0) {
        return
      }

      // true if scrolling up
      this.showNav = currentScrollPosition < this.lastScrollPosition

      const isOffset = currentScrollPosition > this.navHeight

      const isScrollThresholdMet =
        Math.abs(currentScrollPosition - this.lastScrollPosition) > SCROLL_FORCE

      const currentVisiblity = this.navVisibility.navVisible

      this.navVisibility = {
        ...this.navVisibility,
        ...{
          navVisible: isOffset
            ? isScrollThresholdMet
              ? this.showNav
              : currentVisiblity
            : false,
          navSticky: isOffset,
        },
      }

      this.lastScrollPosition = currentScrollPosition
    },
    toggleMobileMenu() {
      this.$store.commit('appState/toggleMobileNav', !this.mobileNavActive)
    },
  },
}
</script>

<style lang="postcss" scoped>
.navVisible {
  @apply translate-y-0;
}
.navSticky {
  @apply bg-gradient-6;
}

.mobileNavOpen {
  @apply bg-transparent;
  @apply text-white;
}

.hamburger-icon {
  @apply relative;
}
.hamburger-icon:before,
.hamburger-icon:after {
  content: '';
  background-color: currentColor;
  height: 2px;
  @apply absolute;
  @apply w-full;
  @apply left-0;
  @apply transition-transform;
  @apply duration-300;
  @apply ease-in-out;
  @apply origin-center;
  @apply transform;
}

.hamburger-icon:before {
  top: 10px;
}
.hamburger-icon:after {
  top: 20px;
}

.mobileNavOpen .hamburger-icon:before,
.mobileNavOpen .hamburger-icon:after {
  top: 15px;
}

.mobileNavOpen .hamburger-icon:before {
  @apply rotate-45;
}

.mobileNavOpen .hamburger-icon:after {
  @apply -rotate-45;
}

.nav__link {
  position: relative;
}

.nav__link:after {
  content: '';
  height: 1px;
  bottom: -7px;
  background-color: currentColor;
  @apply absolute;
  @apply w-full;
  @apply left-0;
  @apply opacity-0;
  @apply transition-opacity;
  @apply duration-200;
}

.nav__link:hover:after {
  @apply opacity-100;
}

.nav__link.router-link-active:after {
  @apply opacity-100;
}
</style>
