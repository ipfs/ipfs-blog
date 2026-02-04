<template>
  <div>
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

export default {
  name: 'BlogCard',
  components: { RegularCard, LinkCard },
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
        return RegularCard
      }

      switch (this.card.type.name) {
        case 'Academic paper':
        case 'Event':
        case 'News coverage':
        case 'Release notes':
        case 'Tutorial':
        case 'Ecosystem content':
        case 'Video':
          return LinkCard

        default:
          return RegularCard
      }
    },
  },
}
</script>
