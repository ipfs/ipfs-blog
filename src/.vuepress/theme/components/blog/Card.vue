<template>
  <div>
    <RegularCard v-if="!card.type" v-bind="card" class="card-post h-full" />
    <component
      :is="computedCard"
      v-bind="card"
      :open-video-modal="openVideoModal"
      class="card-post h-full"
    />
  </div>
</template>

<script>
import RegularCard from '@theme/components/blog/RegularCard'
import LinkCard from '@theme/components/blog/LinkCard'
import VideoCard from '@theme/components/blog/VideoCard'

export default {
  name: 'BlogCard',
  components: { RegularCard, LinkCard, VideoCard },

  inheritAttrs: false,
  props: {
    card: {
      type: Object,
      required: true,
    },
    openVideoModal: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    computedCard() {
      if (!this.card.type) {
        return null
      }

      switch (this.card.type) {
        case 'Academic paper':
        case 'Event':
        case 'News coverage':
        case 'Release notes':
        case 'Tutorial':
          return LinkCard

        case 'Video':
          return VideoCard

        default:
          return null
      }
    },
  },
}
</script>
