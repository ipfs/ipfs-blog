<template>
  <div>
    <a
      v-for="(link, index) in socialLinks"
      :key="index"
      class="mr-5"
      :href="link.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SVGIcon
        class="w-8 h-8 fill-current hover:opacity-75 transition transition-opacity duration-300 ease-in-out"
        :name="link.icon"
        :title="link.text"
      />
    </a>
  </div>
</template>
<script>
import SVGIcon from '@theme/components/base/SVGIcon'
export default {
  name: 'SocialLinks',
  components: { SVGIcon },
  computed: {
    socialLinks() {
      return this.$site.themeConfig.socialLinks
    },
  },
}
</script>
