<template>
  <Layout>
    <div class="bg-gradient-6 py-20 text-white">
      <div class="grid-margins mt-8">
        <Breadcrumbs :crumbs="breadcrumbs" />
        <h1 class="type-h1 mt-4">
          {{ $frontmatter.description }}
        </h1>
        <h2 class="mt-8 pr-40 type-h4">
          All the up-to-date IPFS info you need in one place, from blog posts
          and release notes to videos, tutorials, news coverage, and events.
        </h2>
      </div>
    </div>
    <div class="pt-8 bg-white">
      <SortAndFilter :number-of-posts="publicPages.length" :tags="tags" />
      <div
        class="grid-margins pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        itemscope
        itemtype="http://schema.org/Blog"
      >
        <Card
          v-for="page in publicPages"
          :key="page.key"
          class="mb-4"
          :card="page"
        />
      </div>
      <div>
        <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink"
          >Prev</router-link
        >
        <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink"
          >Next</router-link
        >
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'

import Card from '@theme/components/blog/Card'
import SortAndFilter from '@theme/components/blog/SortAndFilter'
import Breadcrumbs from '@theme/components/Breadcrumbs'
import { getTags } from '@theme/util/tagUtils'
import { parseProtectedPost } from '@theme/util/blogUtils'

const protectedCardTypes = ['newslinks']

export default {
  name: 'BlogIndex',
  components: {
    Card,
    Layout,
    Breadcrumbs,
    SortAndFilter,
  },
  data: function () {
    return {
      numberOfPagesToShow: 20,
      delayValues: [0, 0.15, 0.3],
      tags: [],
      breadcrumbs: [
        { title: 'Home', link: 'https://blog.ipfs.io/', external: true },
        { title: 'Blog & News' },
      ],
    }
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
    publicPages: function () {
      let result = []
      this.$pagination.pages.forEach((page) => {
        if (protectedCardTypes.includes(page.frontmatter.url)) {
          result = [
            ...result,
            ...parseProtectedPost(page, this.activeTags, this.searchedText),
          ]
          return
        }

        for (let i = 0; i < this.activeTags.length; i++) {
          if (
            !page.frontmatter.tags ||
            !page.frontmatter.tags.includes(this.activeTags[i])
          ) {
            return false
          }
        }

        for (let i = 0; i < this.searchedText.length; i++) {
          if (
            !page.frontmatter.title
              .toLocaleLowerCase()
              .includes(this.searchedText[i].toLocaleLowerCase())
          ) {
            return false
          }
        }

        if (
          page.frontmatter &&
          (page.frontmatter.sitemap ? !page.frontmatter.sitemap.exclude : true)
        ) {
          result.push(page)
        }
      })

      return result
    },
  },
  mounted() {
    this.tags = getTags(this.publicPages)
  },
  methods: {
    delayVal: function () {
      this.current =
        this.current < this.delayValues.length - 1 ? this.current : -1
      return this.delayValues[++this.current]
    },
  },
}
</script>
