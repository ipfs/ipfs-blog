<template>
  <div>
    <a
      v-for="(link, index) in socialLinks"
      :key="index"
      class="mr-2"
      :href="link.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SVGIcon
        class="inline w-6 h-6 opacity-50 hover:opacity-100 fill-current text-blueGreen transition transition-opacity duration-300 ease-in-out"
        :name="link.icon"
        :title="link.text"
      />
    </a>
    <a
      class="flex items-center text-gray-dark transition-filter duration-700 ease-in-out"
      href="/index.xml"
      rel="noopener noreferrer"
    >
      <SVGIcon
        class="inline w-6 h-6 color-green fill-current text-blueGreen opacity-50 hover:opacity-100 transition transition-opacity duration-300 ease-in-out"
        name="rss"
        title="rss"
      />
    </a>
  </div>
</template>
<script>
import SVGIcon from '@theme/components/base/SVGIcon'
export default {
  name: 'RSSSubscription',
  components: { SVGIcon },
  data: () => ({
    socialLinks: [
      {
        text: 'Twitter',
        link: 'http://twitter.com/ipfs',
        icon: 'twitter-icon',
      },
      {
        text: 'YouTube',
        link: 'https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew',
        icon: 'youtube-icon',
      },
    ],
  }),
}
</script>
