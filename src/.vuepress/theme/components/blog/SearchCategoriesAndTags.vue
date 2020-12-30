<template>
  <div
    class="flex items-center justify-between"
    @keyup.left="handleKeyUp(-1)"
    @keyup.right="handleKeyUp(1)"
  >
    <div>Sort items by type:</div>
    <multiselect
      ref="select0"
      v-model="selectedCat"
      class="flex-grow mx-2"
      :options="categories"
      :searchable="false"
      :allow-empty="false"
      deselect-label=""
      @select="focusOnSubmit()"
      @open="setSelected(0)"
    />
    <span>and/or</span>
    <multiselect
      ref="select1"
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
      @select="focusOnSubmit()"
      @open="setSelected(1)"
    ></multiselect>

    <button
      ref="select2"
      class="p-2 text-white bg-blueGreen rounded opacity-75 hover:opacity-100 transition transition-opacity duration-300 ease-in-out"
      @click="handleSearch"
      @focus="setSelected(2)"
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
      selectedInput: 0,
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
      const tags = tagArray.filter((tag) => this.tags.includes(tag))
      const texts = tagArray.filter((tag) => !this.tags.includes(tag))
      const category =
        this.selectedCat === this.categories[0] ? undefined : this.selectedCat

      this.$store.commit('appState/setActiveTags', tags)
      this.$store.commit('appState/setActiveCategory', category)
      this.$store.commit('appState/setSearchedText', texts)
    },
    handleAddTag(text) {
      this.selectedTags.push({
        name: text,
        value: text,
      })
    },
    focusOnSubmit() {
      this.$refs.select2.focus()
    },
    handleKeyUp(switcher) {
      const futureFocus = this.selectedInput + switcher
      let futureIndex = 2

      if (switcher === -1) {
        futureIndex = futureFocus >= 0 ? futureFocus : 2
      } else {
        futureIndex = futureFocus <= 2 ? futureFocus : 0
      }

      if (futureIndex === 2) {
        this.focusOnSubmit()
        this.selectedInput = 2
      } else {
        this.$refs['select' + futureIndex].$el.focus()
      }
    },
    setSelected(index) {
      this.selectedInput = index
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

.multiselect__placeholder {
  font-size: 16px;
}
</style>
