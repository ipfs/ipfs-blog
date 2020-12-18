<template>
  <div
    v-if="
      activeTags.length ||
      searchedText.length ||
      resolvedActiveCategory !== 'all types'
    "
    class="border border-opacity-10 flex items-center rounded px-1 py-2"
  >
    <span class="p-1">
      Displaying
      <strong
        >{{ numberOfPosts }} result{{ numberOfPosts > 1 ? 's' : '' }}</strong
      >
      (newest first) of {{ resolvedActiveCategory }}
      <span v-if="searchedText.length">
        for
        <span v-for="text in searchedText" :key="text" class=""
          >"{{ text }}"
        </span>
      </span>
      <span v-if="activeTags.length"
        >with tag{{ activeTags.length > 1 ? 's' : '' }}:</span
      >
    </span>
    <ul class="tags flex" itemprop="keywords">
      <li
        v-for="tag in activeTags"
        :key="tag"
        class="bg-gray-pale py-1 px-2 ml-1 rounded cursor-pointer hover:underline post-tag"
        @click="tagClick(tag)"
      >
        <span class="text-blueGreen">x</span> {{ tag }}
      </li>
    </ul>
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
    ...mapState('appState', ['activeCategory', 'activeTags', 'searchedText']),
    resolvedActiveCategory() {
      return this.activeCategory ? `type "${this.activeCategory}"` : 'all types'
    },
  },
  methods: {
    tagClick(tagToRemove) {
      const newTags = this.activeTags.filter((tag) => tag !== tagToRemove)

      this.$store.commit('appState/setActiveTags', newTags)
    },
  },
}
</script>
