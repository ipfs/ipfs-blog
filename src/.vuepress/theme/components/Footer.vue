<template>
  <footer class="footer bg-deepBlue text-white py-8 md:py-16">
    <div class="grid grid-cols-12 grid-margins">
      <div class="col-start-2 md:col-start-1 col-span-10 md:col-span-12">
        <div class="flex flex-col md:flex-row md:items-top md:justify-between">
          <div class="flex flex-col md:flex-row md:items-center mb-8 md:mb-0">
            <RouterLink
              class="hover:opacity-75 transition transition-opacity duration-300 ease-in-out self-start"
              to="/"
            >
              <SVGIcon
                name="logo-icon"
                title="Protocol Labs"
                :class-list="['w-10', 'h-10', 'fill-current']"
              />
            </RouterLink>
            <ul class="flex flex-col md:flex-row mt-8 md:mt-0 md:ml-24">
              <li
                v-for="(item, index) in footerLinks"
                :key="'link-' + index"
                class="md:mr-10 last:mr-0"
                :class="[{ 'mb-4': item.children && item.children.length }]"
              >
                <NavLink
                  :item="item"
                  class="type-p3 hover:opacity-75 transition transition-opacity duration-300 ease-in-out font-semibold"
                />
                <ul
                  v-if="item.children && item.children.length"
                  class="mt-4 mb-4"
                >
                  <li
                    v-for="(childItem, childIndex) in item.children"
                    :key="'link-child' + childIndex"
                    class="mb-2 last:mb-0"
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
        <div
          v-if="$site.themeConfig.footerLegal"
          class="flex justify-end type-p4 pt-16"
        >
          <p v-html="$site.themeConfig.footerLegal"></p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import NavLink from '@theme/components/NavLink.vue'
import SocialLinks from '@theme/components/SocialLinks'
import SVGIcon from '@theme/components/base/SVGIcon'
export default {
  name: 'Footer',
  components: { NavLink, SocialLinks, SVGIcon },
  computed: {
    footerLinks() {
      return this.$site.themeConfig.footerLinks
    },
  },
}
</script>
