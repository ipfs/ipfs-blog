<template>
  <footer class="footer bg-gradient-6 text-white py-8 md:py-16 mt-auto">
    <div class="grid grid-cols-12 grid-margins">
      <NewsletterForm class="col-start-1 col-span-12 lg:pb-20" />
      <div class="col-start-0 md:col-start-1 col-span-12 md:col-span-12">
        <div class="flex flex-col lg:flex-row lg:items-top lg:justify-between">
          <div
            class="flex flex-col lg:flex-row lg:items-center mb-4 md:mb-8 lg:mb-0"
          >
            <ul class="flex flex-col sm:flex-row mt-4 md:mt-8 lg:mt-0">
              <li
                v-for="(item, index) in footerLinks"
                :key="'link-' + index"
                class="sm:mr-10 last:mr-0"
                :class="[{ 'mb-4': item.children && item.children.length }]"
                @click="onlinkClick(item)"
              >
                <NavLink
                  :item="item"
                  class="type-p3 hover:opacity-75 transition transition-opacity duration-300 ease-in-out"
                />
                <ul
                  v-if="item.children && item.children.length"
                  class="mt-4 mb-4"
                >
                  <li
                    v-for="(childItem, childIndex) in item.children"
                    :key="'link-child' + childIndex"
                    class="mb-2 last:mb-0"
                    @click="onlinkClick(item)"
                  >
                    <NavLink
                      :item="childItem"
                      class="type-p4 hover:opacity-75 transition transition-opacity duration-300 ease-in-out"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <SocialLinks class="flex items-center" />
        </div>
        <FooterLegal class="mt-4 md:mt-8" />
      </div>
    </div>
  </footer>
</template>

<script>
import SocialLinks from '@theme/components/SocialLinks'
import FooterLegal from '@theme/components/FooterLegal'
import NavLink from '@theme/components/NavLink.vue'
import NewsletterForm from '@theme/components/blog/NewsletterForm'

import countly from '../util/countly'

export default {
  name: 'Footer',
  components: { SocialLinks, NewsletterForm, NavLink, FooterLegal },
  computed: {
    footerLinks() {
      return this.$themeLocaleConfig.footerLinks
    },
  },
  methods: {
    onlinkClick(item) {
      countly.trackEvent(countly.events.LINK_CLICK_FOOTER, {
        path: this.$route.path,
        text: item.text,
        href: item.link,
      })
    },
  },
}
</script>

<style scoped>
.sitemap-head {
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
