<template>
  <div
    v-if="
      activeTags.length ||
      searchedText.length ||
      resolvedActiveCategory !== 'all types' ||
      activeAuthor
    "
    class="border-2 border-plBlack border-opacity-10 flex items-center rounded px-1 py-2"
  >
    <span class="p-1">
      Displaying
      <strong
        >{{ numberOfPosts }} result{{ numberOfPosts !== 1 ? 's' : '' }}</strong
      >
      (newest first) of {{ resolvedActiveCategory }}
      <span v-if="activeAuthor"> by {{ activeAuthor }} </span>
      <span v-if="searchedText.length"> for {{ resolvedSearchedText }} </span>
      <span v-if="activeTags.length"
        >with tag{{ activeTags.length > 1 ? 's' : '' }}:</span
      >
    </span>
    <ul class="tags flex items-center" itemprop="keywords">
      <li
        v-for="tag in activeTags"
        :key="tag"
        class="multiselect__tag active-tag"
      >
        <span>#{{ tag }}</span
        ><i class="multiselect__tag-icon" @click="tagClick(tag)"></i>
      </li>
    </ul>
    <div
      class="p-1 ml-auto opacity-50 hover:opacity-100 text-blueGreen transition transition-opacity duration-300 ease-in-out cursor-pointer"
      @click="handleClear()"
    >
      &#10005;
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ActiveTags',
  props: {
    numberOfPosts: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('appState', [
      'activeCategory',
      'activeTags',
      'searchedText',
      'activeAuthor',
    ]),
    resolvedActiveCategory() {
      return this.activeCategory ? `type "${this.activeCategory}"` : 'all types'
    },
    resolvedSearchedText() {
      return `"${this.searchedText.join(' ')}"`
    },
  },
  methods: {
    tagClick(tagToRemove) {
      const newTags = this.activeTags.filter((tag) => tag !== tagToRemove)

      this.$store.commit('appState/setActiveTags', newTags)
    },
    handleClear() {
      this.$store.commit('appState/clearFilters')
    },
  },
}
</script>

<style scoped>
.active-tag {
  margin-bottom: 0;
}
</style>
