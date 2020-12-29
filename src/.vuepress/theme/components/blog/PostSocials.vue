<template>
  <div>
    <ShareNetwork
      v-for="social in socialLinks"
      :key="social.text"
      :network="social.network"
      :url="url"
      title=""
      description=""
      quote=""
      hashtags=""
    >
      <SVGIcon
        class="w-6 h-6 opacity-50 fill-current text-blueGreen hover:opacity-100 transition transition-opacity duration-300 ease-in-out"
        :name="social.icon"
        :title="social.text"
      />
    </ShareNetwork>
  </div>
</template>
<script>
import SVGIcon from '@theme/components/base/SVGIcon'

export default {
  name: 'PostSocials',
  components: { SVGIcon },
  data: () => ({
    socialLinks: [
      {
        text: 'Twitter',
        network: 'twitter',
        icon: 'twitter-icon',
      },
      {
        text: 'Facebook',
        network: 'facebook',
        icon: 'facebook-icon',
      },
    ],
    url: '',
  }),
  mounted() {
    this.url = window.location.href
  },
}
</script>
