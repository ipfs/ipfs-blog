<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(piece, index) in author"
      :key="piece.name"
      itemprop="publisher author"
      itemtype="http://schema.org/Person"
      itemscope
      class="flex flex-row flex-wrap"
    >
      <span itemprop="name" class="flex flex-row">
        <router-link
          :to="{ path: $localePath, query: { author: piece.slug } }"
          rel="nofollow"
        >
          <span :class="computedClassName" @click="handleAuthorClick(piece)">
            {{ piece.name }}
          </span>
        </router-link>
        <span>{{
          author.length !== 1 && index !== author.length - 1 ? ',&nbsp;' : ''
        }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import countly from '../../util/countly'

export default {
  name: 'PostAuthor',
  components: {},
  props: {
    author: {
      type: Array,
      default: null,
    },
    light: {
      type: Boolean,
      default: null,
    },
    parent: {
      type: String,
      default: 'card',
    },
  },
  computed: {
    ...mapState('appState', ['activeAuthor']),
    computedClassName() {
      return [
        'hover:underline cursor-pointer',
        this.light ? 'text-blueGreenLight' : 'hover:text-blueGreen',
      ]
    },
  },
  methods: {
    handleAuthorClick(author) {
      const authorTracking = {
        author: author.name,
        method: `${this.parent}-select`,
      }

      countly.trackEvent(countly.events.FILTER, authorTracking)

      this.$store.commit('appState/setActiveAuthor', author)
    },
  },
}
</script>
