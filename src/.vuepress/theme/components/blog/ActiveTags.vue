<template>
  <div
    v-if="activeTags.length || searchedText.length"
    class="border border-opacity-10 flex items-center rounded px-1 py-2"
  >
    <span class="p-1">
      Displaying
      <strong
        >{{ numberOfPosts }} result{{ numberOfPosts > 1 ? 's' : '' }}</strong
      >
      (newest first)
      <span v-if="searchedText.length">
        for "
        <span v-for="text in searchedText" :key="text" class=""
          >{{ text }}
        </span>
        "
      </span>
      <span v-if="activeTags.length"
        >with tag{{ numberOfPosts > 1 ? 's' : '' }}:</span
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
export default {
  name: 'ActiveTags',
  props: {
    numberOfPosts: {
      type: Number,
      required: true,
    },
  },
  computed: {
    activeTags() {
      const queryTags = this.$route.query.tags
      return queryTags ? queryTags.split(',') : []
    },
    searchedText() {
      const queryText = this.$route.query.search
      return queryText ? queryText.split(',') : []
    },
  },
  methods: {
    tagClick(tagToRemove) {
      const currentPath = this.$router.history.current.path
      const newQuery = {
        ...this.$route.query,
        tags: this.activeTags.filter((tag) => tag !== tagToRemove).join(','),
      }

      this.$router.replace({ path: currentPath, query: newQuery })
    },
  },
}
</script>
