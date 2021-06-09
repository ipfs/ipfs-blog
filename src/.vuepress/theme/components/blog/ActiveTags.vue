<template>
  <div
    v-if="
      activeTags.length ||
      searchedText.length ||
      resolvedActiveCategory !== 'all types' ||
      activeAuthor
    "
    class="border border-plBlack border-opacity-10 flex justify-between items-start rounded p-2"
  >
    <div class="flex flex-col">
      <div class="flex flex-wrap">
        <span class="p-2 pl-1">
          <strong v-if="numberOfPosts === 0"> No results were found </strong>
          <span v-if="numberOfPosts > 0">
            Displaying
            <strong
              >{{ numberOfPosts }} result{{
                numberOfPosts !== 1 ? 's' : ''
              }}</strong
            >
            (newest first)
          </span>
          of {{ resolvedActiveCategory }}
          <span v-if="activeAuthor"> by {{ activeAuthor.name }} </span>
          <span v-if="searchedText.length">
            for {{ resolvedSearchedText }}
          </span>
          <span v-if="activeTags.length"
            >with tag{{ activeTags.length > 1 ? 's' : '' }}:</span
          >
        </span>
        <div class="tags flex flex-wrap items-center -mb-2" itemprop="keywords">
          <button
            v-for="tag in activeTags"
            :key="tag"
            class="multiselect__tag active-tag text-sm"
            @click="tagClick(tag)"
          >
            <span>#{{ tagsList.find((t) => t.slug === tag).name }}</span
            ><i class="multiselect__tag-icon"></i>
          </button>
        </div>
      </div>
      <div v-if="numberOfPosts === 0" class="mt-2">
        {{ 'Try removing some your search parameters, or ' }}
        <router-link
          :to="{ path: '/' }"
          class="text-blueGreen"
          @click.native="handleClear()"
        >
          return to the blog & news index.
        </router-link>
      </div>
    </div>
    <button
      class="p-1 l-4 text-blueGreen hover:text-blueGreenScreen transition duration-300 ease-in-out cursor-pointer"
      @click="handleClear()"
    >
      &#10005;
    </button>
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
      'tagsList',
      'activeCategory',
      'activeTags',
      'searchedText',
      'activeAuthor',
    ]),
    resolvedActiveCategory() {
      return this.activeCategory
        ? `type "${this.activeCategory.name}"`
        : 'all types'
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
  margin-bottom: 0.5rem;
}
</style>
