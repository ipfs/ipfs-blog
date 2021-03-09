<template>
  <div
    itemprop="publisher author"
    itemtype="http://schema.org/Person"
    itemscope
    class="flex flex-row flex-wrap"
  >
    <span
      v-for="(piece, index) in resolvedAuthorName"
      :key="piece"
      itemprop="name"
      class="flex flex-row"
    >
      <span :class="computedClassName" @click="handleAuthorClick(piece)">
        {{ piece }}
      </span>
      <span>{{
        resolvedAuthorName.length !== 1 &&
        index !== resolvedAuthorName.length - 1
          ? ',&nbsp;'
          : ''
      }}</span>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Author from '@theme/components/mixins/Author'

export default {
  name: 'PostAuthor',
  components: {},
  mixins: [Author],
  props: {
    light: {
      type: Boolean,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('appState', ['activeAuthor']),
    resolvedAuthorName() {
      const resolvedName = this.name.replace('and', ',')
      const pieces = resolvedName.match(/[,&]/g)

      if (!pieces) {
        return [resolvedName]
      }

      return resolvedName.split(/[,&]/g)
    },
    computedClassName() {
      return [
        'hover:underline cursor-pointer',
        this.light ? 'text-blueGreenLight' : 'hover:text-blueGreen',
      ]
    },
  },
  methods: {
    handleAuthorClick(piece) {
      if (!this.activeAuthor !== piece) {
        this.$store.commit('appState/setActiveAuthor', piece)
      }
    },
  },
}
</script>
