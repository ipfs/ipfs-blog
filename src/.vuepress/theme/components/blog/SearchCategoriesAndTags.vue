<template>
  <div class="flex items-center justify-between">
    <div>Sort items by type:</div>
    <multiselect
      v-model="selectedCat"
      class="flex-grow mx-2"
      :options="categories"
      :searchable="false"
    />
    <span>and/or</span>
    <multiselect
      v-model="selectedTags"
      class="flex-grow mx-2 max-w-sm max-h-sm"
      tag-placeholder="search for this text"
      placeholder="Search for words or #tags"
      track-by="name"
      label="name"
      :options="resolvedTags"
      :multiple="true"
      :taggable="true"
      @tag="handleAddTag"
    ></multiselect>

    <button
      class="p-2 text-white bg-blueGreen rounded opacity-75 hover:opacity-75"
      @click="handleSearch"
    >
      Search
    </button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'SearchCategoriesAndTags',
  components: { Multiselect },
  props: {
    tags: {
      type: Array,
      default: () => ['list', 'of', 'tags', '#'],
    },
    categories: {
      type: Array,
      default: () => ['list', 'of', 'cats'],
    },
  },
  data() {
    return {
      selectedCat: this.categories[0],
      selectedTags: [],
      searchedWords: [],
    }
  },
  computed: {
    resolvedTags() {
      return this.tags.map((tag) => ({
        name: `#${tag}`,
        value: tag,
      }))
    },
  },
  methods: {
    handleSearch() {
      const tagArray = this.selectedTags.map((tag) => tag.value)
      const currentPath = this.$router.history.current.path
      const tags = tagArray.filter((tag) => this.tags.includes(tag)).join(',')
      const texts = tagArray.filter((tag) => !this.tags.includes(tag)).join(',')

      const newQuery = {
        ...this.$route.query,
        tags,
        search: texts,
        category:
          this.selectedCat === this.categories[0]
            ? undefined
            : this.selectedCat,
      }

      this.$router.replace({ path: currentPath, query: newQuery })
    },
    handleAddTag(text) {
      this.selectedTags.push({
        name: text,
        value: text,
      })
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect {
  width: auto;
  height: 2.7rem;
}

.multiselect__tag,
.multiselect__option--highlight,
.multiselect__option--highlight::after {
  @apply bg-blueGreen;
}
</style>
