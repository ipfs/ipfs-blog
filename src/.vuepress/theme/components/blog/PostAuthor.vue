<template>
  <div
    v-if="name"
    itemprop="publisher author"
    itemtype="http://schema.org/Person"
    itemscope
    class="flex items-center"
  >
    <span
      itemprop="name"
      class="whitespace-no-wrap hover:text-blueGreen hover:underline cursor-pointer"
      @click="handleAuthorClick()"
      >{{ name }}</span
    >
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
  },
  methods: {
    handleAuthorClick() {
      if (!this.activeAuthor !== this.name) {
        this.$store.commit('appState/setActiveAuthor', this.name)
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
