<template>
  <div>
    <a
      v-for="(link, index) in socialLinks"
      :key="index"
      class="mr-5 last:mr-0"
      :href="link.link"
      target="_blank"
      rel="noopener noreferrer"
      @click="socialLinkClick(link)"
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

import countly from '../util/countly'

export default {
  name: 'SocialLinks',
  components: { SVGIcon },
  computed: {
    socialLinks() {
      return this.$themeLocaleConfig.socialLinks
    },
  },
  methods: {
    socialLinkClick(link) {
      countly.trackEvent(countly.events.SOCIAL_MEDIA_OUTBOUNDS, {
        view: this.$route.path,
        text: link.text,
        link: link.link,
      })
    },
  },
}
</script>
