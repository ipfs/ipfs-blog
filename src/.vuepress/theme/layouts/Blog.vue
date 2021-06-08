<template>
  <Layout>
    <div class="bg-gradient-6 py-20 text-white">
      <div class="relative grid-margins mt-8">
        <h1 class="type-h1 mt-4">
          {{ $frontmatter.description }}
        </h1>
        <h2 class="mt-8 type-h4 max-w-4xl">
          All the up-to-date IPFS info you need in one place, from blog posts
          and release notes to videos, tutorials, news coverage, and events.
        </h2>
        <LanguageSelector class="absolute right-0 language-selector" />
      </div>
    </div>
    <div class="pt-8 pb-4 bg-white flex-grow bg-gray-background">
      <SortAndFilter
        :number-of-posts="pagesToShow.length"
        :tags="tags"
        :block-lazy-load="blockLazyLoad"
      />
      <div
        class="grid-margins pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        itemscope
        itemtype="http://schema.org/Blog"
      >
        <Card
          v-for="page in pagesToShow"
          :key="page.key"
          class="mb-4"
          :card="page"
          :open-video-modal="openVideoModal"
          all
        />
      </div>
      <div
        v-if="pagesToShow.length < publicPages.length"
        class="flex justify-center mt-8 pb-4"
      >
        <button
          class="px-3 py-2 text-white text-xl bg-blueGreen font-semibold rounded hover:bg-blueGreenScreen transition duration-300"
          @click="handleLoadMoreClick"
        >
          Load More
        </button>
      </div>
    </div>
    <VideoModal ref="videoModal" />
  </Layout>
</template>

<script>
import { mapState } from 'vuex'

import Layout from '@theme/layouts/Layout.vue'

import Card from '@theme/components/blog/Card'
import VideoModal from '@theme/components/blog/VideoModal'
import SortAndFilter from '@theme/components/blog/SortAndFilter'
import LanguageSelector from '@theme/components/base/LanguageSelector'
import { getTags } from '@theme/util/tagUtils'
import { parseProtectedPost, checkItem } from '@theme/util/blogUtils'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import orderBy from 'lodash/orderBy'
import countly from '../util/countly'

const defaultCategory = { name: 'Blog post', slug: 'blog-post' }

export default {
  name: 'BlogIndex',
  components: {
    Card,
    Layout,
    SortAndFilter,
    LanguageSelector,
    VideoModal,
  },
  data: function () {
    return {
      numberOfPagesToShow: 24,
      infiniteScroll: false,
      delayValues: [0, 0.15, 0.3],
      observer: null,
    }
  },
  computed: {
    ...mapState('appState', [
      'categoriesList',
      'tagsList',
      'authorsList',
      'activeCategory',
      'activeTags',
      'searchedText',
      'activeAuthor',
      'videoModalCard',
    ]),
    tags() {
      return getTags(
        this.tagsList.filter((tag) => this.activeTags.includes(tag.slug)),
        this.publicPages
      )
    },
    publicPages: function () {
      let result = []
      this.$pagination.pages.forEach((page) => {
        if (
          this.categoriesList
            .map((category) => category.slug)
            .includes(page.frontmatter.type?.slug)
        ) {
          result = [
            ...result,
            ...parseProtectedPost(
              page,
              this.activeTags,
              this.searchedText,
              this.activeCategory,
              this.activeAuthor
            ),
          ]
          return
        }

        if (
          !checkItem({
            postType: defaultCategory,
            tags: page.frontmatter.tags,
            author: page.frontmatter.author,
            title: page.frontmatter.title,
            activeTags: this.activeTags,
            activeAuthor: this.activeAuthor,
            searchedText: this.searchedText,
            activeCategory: this.activeCategory,
          })
        ) {
          return false
        }

        if (page.frontmatter && !page.frontmatter.hidden) {
          result.push({ ...page, category: defaultCategory })
        }
      })

      return result.sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      )
    },
    pagesToShow() {
      return this.numberOfPagesToShow > this.publicPages.length
        ? this.publicPages
        : this.publicPages.slice(0, this.numberOfPagesToShow)
    },
    queryProptertyWatchlist() {
      return `${JSON.stringify(this.activeCategory)}|${this.activeTags}|${
        this.searchedText
      }|${this.activeAuthor}`
    },
    urlUpdate() {
      return this.$route.query
    },
  },
  watch: {
    queryProptertyWatchlist() {
      this.updateQuery()
    },
    urlUpdate() {
      if (Object.keys(this.$route.query).length === 0) {
        this.$store.commit('appState/clearFilters')
      }
    },
  },
  created() {
    let categories = []
    let tagsArray = []
    let authorsArray = []

    this.$pagination.pages.forEach((page) => {
      const { type, tags, data, author } = page.frontmatter

      if (type) {
        categories.push(type)
      }

      if (tags) {
        tagsArray.push(tags)
      }

      if (data) {
        data.forEach((subPage) => {
          if (subPage.tags) {
            tagsArray.push(...subPage.tags)
          }
        })
      }

      if (author) {
        authorsArray.push(author)
      }
    })

    categories = orderBy(uniq(categories, true), 'name')
    tagsArray = uniqBy(tagsArray.flat(2), 'name')
    authorsArray = uniq(authorsArray.flat(2), true)

    this.$store.commit('appState/setCategoriesList', [
      defaultCategory,
      ...categories,
    ])
    this.$store.commit('appState/setTagsList', tagsArray)
    this.$store.commit('appState/setAuthorsList', authorsArray)
  },
  mounted() {
    this.observer = new IntersectionObserver(
      this.handleBottomVisibilityChange,
      {
        threshold: 1.0,
      }
    )

    this.observer.observe(document.querySelector('footer.footer ul'))

    const { query } = this.$route
    const newQuery = pick(Object.assign({}, query), [
      'category',
      'tags',
      'search',
      'author',
    ])

    let queryCategory = query.category || ''

    const filteredCategory = this.categoriesList.find(
      (category) =>
        category.slug === queryCategory || category.name === queryCategory
    )
    if (queryCategory && !filteredCategory) {
      queryCategory = ''
      delete newQuery.category
    }

    let queryTags = query.tags ? query.tags.split(',') : []

    if (queryTags.length > 0) {
      queryTags = queryTags.filter((queryTag) =>
        this.tagsList.find((tag) => tag.slug === queryTag)
      )

      if (queryTags.length === 0) {
        delete newQuery.tags
      }
    }

    let queryAuthor = query.author

    if (
      queryAuthor &&
      !this.authorsList.map((author) => author.slug).includes(queryAuthor)
    ) {
      queryAuthor = ''
      delete newQuery.author
    }

    if (!isEqual(query, newQuery)) {
      this.$router.replace({ query: newQuery })
    }

    const queryText = query.search

    if (queryCategory !== '') {
      const categoryTracking = {
        category: filteredCategory.name,
        method: 'urlQuery',
      }

      countly.trackEvent(countly.events.FILTER, categoryTracking)
    }

    if (queryTags.length > 0) {
      queryTags.forEach((queryTag) => {
        const tagTracking = {
          tag: this.tagsList.find((tag) => tag.slug === queryTag).name,
          method: 'urlQuery',
        }

        countly.trackEvent(countly.events.FILTER, tagTracking)
      })
    }

    if (queryText) {
      queryText.split(',').forEach((text) => {
        const textTracking = {
          text: text,
          method: 'urlQuery',
        }

        countly.trackEvent(countly.events.FILTER, textTracking)
      })
    }

    if (queryAuthor) {
      const authorTracking = {
        author: queryAuthor,
        method: 'urlQuery',
      }

      countly.trackEvent(countly.events.FILTER, authorTracking)
    }

    this.$store.commit('appState/setActiveTags', queryTags)
    this.$store.commit(
      'appState/setActiveCategory',
      filteredCategory || queryCategory
    )
    this.$store.commit(
      'appState/setSearchedText',
      queryText ? queryText.split(',') : []
    )
    this.$store.commit(
      'appState/setActiveAuthor',
      this.authorsList.find((author) => author.slug === queryAuthor) || ''
    )

    const latestWeeklyPost = this.publicPages
      .filter(
        (item) =>
          item.frontmatter &&
          item.frontmatter.tags &&
          item.frontmatter.tags.find((tag) => tag.name === 'weekly')
      )
      .sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      )[0]

    this.$store.commit('appState/setLatestWeeklyPost', latestWeeklyPost)
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    updateQuery() {
      const newQuery = {
        ...this.$route.query,
        tags: this.activeTags.join(','),
        search: this.searchedText.join(','),
        category: this.activeCategory.slug || '',
        author: this.activeAuthor.slug || '',
      }

      Object.keys(newQuery).forEach((entry) => {
        const value = newQuery[entry]
        if (value === '' || value.length === 0) {
          delete newQuery[entry]
        }
      })
      this.$router.replace({ query: newQuery }).catch(() => {})
    },
    blockLazyLoad() {
      this.infiniteScroll = false
    },
    showMorePages() {
      this.numberOfPagesToShow = this.numberOfPagesToShow + 24
    },
    handleLoadMoreClick() {
      countly.trackEvent(countly.events.LOAD_MORE_BUTTON)

      this.infiniteScroll = true
      this.numberOfPagesToShow = this.numberOfPagesToShow + 24
    },
    handleBottomVisibilityChange(isVisible) {
      if (
        isVisible &&
        this.infiniteScroll &&
        this.pagesToShow.length < this.publicPages.length
      ) {
        this.showMorePages()
      }
    },
    delayVal: function () {
      this.current =
        this.current < this.delayValues.length - 1 ? this.current : -1
      return this.delayValues[++this.current]
    },
    openVideoModal: function () {
      this.$refs.videoModal.openModal()
    },
  },
}
</script>

<style scoped>
.language-selector {
  bottom: -3rem;
}
</style>
