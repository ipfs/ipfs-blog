<template>
  <div>
    <ShareNetwork
      v-for="social in socialLinks"
      :key="social.text"
      :network="social.network"
      :url="url ? url : currentUrl"
      :title="title ? title : ''"
      description=""
      :quote="`${title} ${url ? url : currentUrl} via ${host}`"
      hashtags=""
      :twitter-user="social.twitterHandle"
      class="mr-1 last:mr-0"
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
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    socialLinks: [
      {
        text: 'Twitter',
        network: 'twitter',
        icon: 'twitter-icon',
        twitterHandle: 'IPFS',
      },
      {
        text: 'Facebook',
        network: 'facebook',
        icon: 'facebook-icon',
      },
    ],
    currentUrl: '',
    host: '',
  }),
  mounted() {
    this.currentUrl = window.location.href
    this.host = window.location.host
  },
}
</script>
