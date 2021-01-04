<template>
  <div
    v-if="name"
    itemprop="publisher author"
    itemtype="http://schema.org/Person"
    itemscope
    class="flex items-center"
  >
    <span
      v-for="(piece, index) in resolvedAuthorName"
      :key="piece"
      itemprop="name"
      >{{ index === 0 ? '' : ',' }}
      <span
        class="whitespace-no-wrap hover:text-blueGreen hover:underline cursor-pointer"
        @click="handleAuthorClick(piece)"
      >
        {{ piece }}
      </span>
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
  computed: {
    ...mapState('appState', ['activeAuthor']),
    resolvedAuthorName() {
      const pieces = this.name.match(/[,&]/g)

      if (!pieces) {
        return [this.name]
      }

      return this.name.split(/[,&]/g)
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

<style scoped>
.avatar {
  height: 2.3em;
  width: 2.3em;
}
</style>
