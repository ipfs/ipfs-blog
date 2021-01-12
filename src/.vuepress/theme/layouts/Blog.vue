<template>
  <Layout>
    <div class="bg-gradient-6 py-20 text-white">
      <div class="relative grid-margins mt-8">
        <Breadcrumbs :crumbs="breadcrumbs" />
        <h1 class="type-h1 mt-4">
          {{ $frontmatter.description }}
        </h1>
        <h2 class="mt-8 type-h4">
          All the up-to-date IPFS info you need in one place, from blog posts
          and release notes to videos, tutorials, news coverage, and events.
        </h2>
        <LanguageSelector class="absolute right-0" />
      </div>
    </div>
    <div class="pt-8 bg-white">
      <SortAndFilter
        :number-of-posts="pagesToShow.length"
        :tags="tags"
        :categories="categories"
        :block-lazy-load="blockLazyLoad"
      />
      <div
        v-if="mountFinish"
        class="grid-margins pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        itemscope
        itemtype="http://schema.org/Blog"
      >
        <Card
          v-for="page in pagesToShow"
          :key="page.key"
          class="mb-4"
          :card="page"
          all
        />
      </div>
      <div
        v-if="
          mountFinish &&
          !infiniteScroll &&
          pagesToShow.length < publicPages.length
        "
        class="flex justify-center mt-8 pb-4"
      >
        <button
          class="px-3 py-2 text-white text-xl bg-blueGreen rounded hover:opacity-75"
          @click="handleLoadMoreClick"
        >
          Load More
        </button>
      </div>
      <div
        v-else-if="pagesToShow.length < publicPages.length"
        v-observe-visibility="handleBottomVisibilityChange"
      ></div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'

import Layout from '@theme/layouts/Layout.vue'

import Card from '@theme/components/blog/Card'
import SortAndFilter from '@theme/components/blog/SortAndFilter'
import Breadcrumbs from '@theme/components/Breadcrumbs'
import LanguageSelector from '@theme/components/base/LanguageSelector'
import { getTags } from '@theme/util/tagUtils'
import { parseProtectedPost, checkItem } from '@theme/util/blogUtils'

const protectedCardTypes = [
  'Academic paper',
  'Event',
  'News coverage',
  'Release notes',
  'Tutorial',
  'Video',
]
const defaultCategory = 'Blog post'

export default {
  name: 'BlogIndex',
  components: {
    Card,
    Layout,
    Breadcrumbs,
    SortAndFilter,
    LanguageSelector,
  },
  data: function () {
    return {
      categories: ['All content', defaultCategory, ...protectedCardTypes],
      numberOfPagesToShow: 21,
      infiniteScroll: false,
      delayValues: [0, 0.15, 0.3],
      breadcrumbs: [
        { title: 'Home', link: 'https://ipfs.io/', external: true },
        { title: 'Blog & news' },
      ],
      mountFinish: false,
    }
  },
  computed: {
    ...mapState('appState', [
      'activeCategory',
      'activeTags',
      'searchedText',
      'activeAuthor',
    ]),
    tags() {
      return getTags(this.publicPages)
    },
    publicPages: function () {
      let result = []
      this.$pagination.pages.forEach((page) => {
        if (protectedCardTypes.includes(page.frontmatter.type)) {
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

        if (
          page.frontmatter &&
          (page.frontmatter.sitemap ? !page.frontmatter.sitemap.exclude : true)
        ) {
          result.push({
            ...page,
            category: defaultCategory,
          })
        }
      })

      return result.sort((a, b) =>
        a.frontmatter.date > b.frontmatter.date ? -1 : 1
      )
    },
    pagesToShow() {
      return this.numberOfPagesToShow > this.publicPages.length
        ? this.publicPages
        : this.publicPages.slice(0, this.numberOfPagesToShow)
    },
    queryProptertyWatchlist() {
      return `${this.activeCategory}|${this.activeTags}|${this.searchedText}|${this.activeAuthor}`
    },
  },
  watch: {
    queryProptertyWatchlist() {
      this.updateQuery()
    },
  },
  mounted() {
    const queryTags = this.$route.query.tags
    const queryCategory = this.$route.query.category
    const queryText = this.$route.query.search
    const queryAuthor = this.$route.query.author

    if (queryTags && !this.activeTags.length) {
      this.$store.commit('appState/setActiveTags', queryTags.split(','))
    }
    if (queryCategory) {
      this.$store.commit('appState/setActiveCategory', queryCategory)
    }
    if (queryText && !this.searchedText.length) {
      this.$store.commit('appState/setSearchedText', queryText.split(','))
    }
    if (queryAuthor) {
      this.$store.commit('appState/setActiveAuthor', queryAuthor)
    }

    const latestWeeklyPost = this.publicPages.find(
      (item) =>
        item.frontmatter &&
        item.frontmatter.tags &&
        item.frontmatter.tags.includes('weekly')
    )

    this.$store.commit('appState/setLatestWeeklyPost', latestWeeklyPost)

    this.mountFinish = true
  },
  methods: {
    updateQuery() {
      const newQuery = {
        ...this.$route.query,
        tags: this.activeTags.join(','),
        search: this.searchedText.join(','),
        category: this.activeCategory,
        author: this.activeAuthor,
      }
      this.$router.replace({ query: newQuery }).catch(() => {})
    },
    blockLazyLoad() {
      this.infiniteScroll = false
    },
    showMorePages() {
      this.numberOfPagesToShow = this.numberOfPagesToShow + 21
    },
    handleLoadMoreClick() {
      this.infiniteScroll = true
      this.numberOfPagesToShow = 40
    },
    handleBottomVisibilityChange(isVisible) {
      isVisible && this.showMorePages()
    },
    delayVal: function () {
      this.current =
        this.current < this.delayValues.length - 1 ? this.current : -1
      return this.delayValues[++this.current]
    },
  },
}
</script>
