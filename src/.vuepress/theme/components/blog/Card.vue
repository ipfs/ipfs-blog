<template>
  <div>
    <RegularCard v-if="!card.type" v-bind="card" />
    <component :is="computedCard" v-bind="card" />
  </div>
</template>

<script>
import RegularCard from '@theme/components/blog/RegularCard'
import NewslinkCard from '@theme/components/blog/NewslinkCard'

export default {
  name: 'BlogCard',
  components: { RegularCard, NewslinkCard },

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
        case 'newslink':
          return NewslinkCard

        default:
          return null
      }
    },
  },
}
</script>
