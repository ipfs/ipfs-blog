<template>
  <div>
    <RegularCard v-if="!card.type" v-bind="card" class="card-post h-full" />
    <component :is="computedCard" v-bind="card" class="card-post h-full" />
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
  },
  computed: {
    computedCard() {
      if (!this.card.type) {
        return null
      }

      switch (this.card.type) {
        case 'News coverage':
        case 'Release notes':
          return LinkCard

        default:
          return null
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
@screen md {
  .card-post {
    max-height: 29rem;
  }
}
</style>
