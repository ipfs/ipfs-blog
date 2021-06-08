<template>
  <div>
    <div class="mb-2">Filter items by type:</div>
    <div
      class="flex flex-col xl:flex-row"
      @keyup.left="handleKeyUp(-1)"
      @keyup.right="handleKeyUp(1)"
    >
      <multiselect
        ref="select0"
        :value="
          activeCategory !== '' ? activeCategory : { name: 'All content' }
        "
        class="mb-2 xl:mb-0 xl:mr-2 xl:max-w-xs"
        :options="[{ name: 'All content' }, ...categoriesList]"
        label="name"
        track-by="name"
        :searchable="false"
        :allow-empty="false"
        select-label="Press 'enter' to select"
        deselect-label=""
        @input="setActiveCategory"
        @open="setSelected(0)"
      />
      <multiselect
        ref="select1"
        v-model="selectedTags"
        class="mb-2 xl:mb-0 xl:mr-2"
        tag-placeholder="search for this text"
        placeholder="Search for words or #tags"
        track-by="name"
        :custom-label="
          (option) =>
            tagsList.map((tag) => tag.name).includes(option.name)
              ? `#${option.name}`
              : option.name
        "
        :limit="['xxl'].includes($mq) ? tagsLimit : tagsList.length"
        :options="resolvedTags"
        :multiple="true"
        :taggable="true"
        select-label="Press 'enter' to select"
        deselect-label="Press 'enter' to remove"
        @tag="handleAddTag"
        @remove="removeTag"
        @select="focusOnSubmit"
        @open="setSelected(1)"
      ></multiselect>

      <button
        ref="select2"
        class="h-full p-2 text-white font-semibold bg-blueGreen rounded hover:bg-blueGreenScreen transition duration-300 ease-in-out"
        @click="handleSearch"
        @focus="setSelected(2)"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'

import countly from '../../util/countly'

export default {
  name: 'SearchCategoriesAndTags',
  components: { Multiselect },
  props: {
    tags: {
      type: Array,
      default: () => ['list', 'of', 'tags', '#'],
    },
  },
  data() {
    return {
      selectedTags: [],
      searchedWords: [],
      selectedInput: 0,
      tagsLimit: 99,
    }
  },
  computed: {
    ...mapState('appState', [
      'categoriesList',
      'tagsList',
      'activeCategory',
      'activeTags',
      'searchedText',
    ]),
    resolvedTags() {
      return this.tags.map((tag) => ({
        name: tag.name,
        value: tag.slug,
      }))
    },
    queryProptertyWatchlist() {
      return `${this.activeTags}|${this.searchedText}`
    },
  },
  watch: {
    queryProptertyWatchlist() {
      this.updateTagsWithQuery()
    },
  },
  created() {
    this.calculateTagsLimit()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.tagsEvent)
    }
  },
  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.tagsEvent)
    }
  },
  methods: {
    tagsEvent() {
      if (['xxl'].includes(this.$mq)) {
        this.calculateTagsLimit()
      }
    },
    calculateTagsLimit(newTags) {
      // The max value a char chan occupy in px
      const multiplier = 12
      // Width of the help text - "X or more"
      const helpTextWidth = 75
      // Padding and margin for the each tag
      const tagPadding = 46
      let limit = this.tagsList.length

      if (typeof window !== 'undefined' && this.$refs.select1) {
        const tagsEl = this.$refs.select1.$el.childNodes[2]
        const tagsStyles = window.getComputedStyle(tagsEl)
        // Width of the tags container
        const availableWidth =
          tagsEl.getBoundingClientRect().width -
          parseFloat(tagsStyles.paddingLeft) -
          parseFloat(tagsStyles.paddingRight)

        const tagNames = (newTags || this.selectedTags).map((tag) => tag.name)
        const tags = tagNames.map(
          (tagName) => tagPadding + tagName.length * multiplier
        )
        const estimatedTagsWidth = tags.reduce((a, b) => a + b, 0)

        if (estimatedTagsWidth > availableWidth) {
          let charCount = helpTextWidth

          for (let i = 0; i < tags.length; i++) {
            if (charCount + tags[i] > availableWidth) {
              break
            }

            charCount += tags[i]

            limit = i + 1
          }
        }
      }

      this.tagsLimit = limit
    },
    updateTagsWithQuery() {
      const { query } = this.$route

      const queryTags = query.tags ? query.tags.split(',') : []
      const querySearch = query.search ? query.search.split(',') : []
      const tagsListSlugs = this.tagsList.map((tag) => tag.slug)

      const tagArray = this.selectedTags.map((tag) => tag.value)
      const tagsToAdd = [...queryTags, ...querySearch].filter(
        (tag) => !tagArray.includes(tag)
      )
      const tagsToRemove = tagArray.filter(
        (tag) => tagsListSlugs.includes(tag) && !queryTags.includes(tag)
      )
      const textsToRemove = tagArray.filter(
        (tag) => !tagsListSlugs.includes(tag) && !querySearch.includes(tag)
      )

      const newTags = this.selectedTags.filter(
        (tag) =>
          !tagsToRemove.includes(tag.value) &&
          !textsToRemove.includes(tag.value)
      )

      tagsToAdd.forEach((tag) => {
        const filteredTag = this.tagsList.find(
          (listTag) => listTag.slug === tag
        )

        newTags.push({
          name: filteredTag ? filteredTag.name : tag,
          value: filteredTag ? filteredTag.slug : tag,
        })
      })

      this.selectedTags = newTags
    },
    setActiveCategory(category) {
      const categoryTracking = {
        category: category.name,
        method: 'filter-select',
      }

      countly.trackEvent(countly.events.FILTER, categoryTracking)

      this.$store.commit(
        'appState/setActiveCategory',
        this.categoriesList
          .map((category) => category.slug)
          .includes(category.slug)
          ? category
          : ''
      )
    },
    removeTag(tagToRemove) {
      if (this.activeTags.length > 0 || this.searchedText.length > 0) {
        this.selectedTags = this.selectedTags.filter(
          (tag) => tag.value !== tagToRemove.value
        )
        this.handleSearch()
      }
    },
    handleSearch() {
      const tagArray = this.selectedTags.map((tag) => tag.value)
      const tagsListSlugs = this.tagsList.map((tag) => tag.slug)
      const tags = tagArray.filter((tag) => tagsListSlugs.includes(tag))
      const texts = tagArray.filter((tag) => !tagsListSlugs.includes(tag))

      this.$store.commit('appState/setActiveTags', tags)
      this.$store.commit('appState/setSearchedText', texts)
    },
    handleAddTag(text) {
      const option = {
        name: text,
        value: text,
      }

      const textTracking = {
        text: text,
        method: 'filter-select',
      }

      countly.trackEvent(countly.events.FILTER, textTracking)

      this.selectedTags.push(option)
      this.calculateTagsLimit([...this.selectedTags, option])
      this.$refs.select2.focus()
    },
    focusOnSubmit(option) {
      const tagTracking = {
        tag: option.name,
        method: 'filter-select',
      }

      countly.trackEvent(countly.events.FILTER, tagTracking)

      this.calculateTagsLimit()
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
        this.$refs.select2.focus()
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

<style>
.multiselect__tag,
.multiselect__tag-icon:hover,
.multiselect__option--highlight,
.multiselect__option--highlight::after {
  @apply bg-blueGreen;
}

.multiselect__tag-icon::after {
  color: white;
  opacity: 0.5;
}

.multiselect__tag-icon:hover::after {
  opacity: 1;
}

.multiselect__option--highlight.multiselect__option--selected,
.multiselect__option--highlight.multiselect__option--selected::after {
  @apply bg-aquaMuted;
}

.multiselect__placeholder,
.multiselect__input {
  height: 1.5rem;
  margin-bottom: 0;
  padding-top: 0;
  padding-left: 0.3125rem;
  font-size: 1rem;
}

.multiselect__tags {
  display: flex;
  flex-wrap: wrap;
  border: none;
}

.multiselect__tags-wrap {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.multiselect__tag {
  margin-bottom: 0.5rem;
}

.multiselect--active .multiselect__tags {
  padding-bottom: 0.5rem;
}

.multiselect__single,
.multiselect__strong {
  margin-bottom: 0;
}
</style>
