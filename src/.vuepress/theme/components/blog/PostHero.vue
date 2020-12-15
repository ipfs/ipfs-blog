<template>
  <div>
    <div class="bg-gradient-6 text-white">
      <div class="pt-24 pb-10 grid-margins">
        <Breadcrumbs :crumbs="breadcrumbs" />
        <div class="grid grid-cols-2 pt-4">
          <div class="flex flex-col">
            <h1 class="type-h1">{{ title }}</h1>
            <div class="mt-4">{{ author.name }}</div>
            <time
              class="italic opacity-50"
              pubdate
              itemprop="datePublished"
              :datetime="date"
            >
              {{ resolvedDate }}
            </time>
          </div>
          <div v-if="image" class="">
            <LazyImage
              :alt="$page.title"
              src-placeholder="/images/blog/og/default.png"
              :src="`/header_images/${image ? image : 'blog-placeholder.png'}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid-margins pt-8 flex justify-between items-center">
      <ul v-if="resolvedTags.length" class="tags flex mt-1" itemprop="keywords">
        <PostTag v-for="tag in resolvedTags" :key="tag" :tag="tag" />
      </ul>
      <div class="flex">
        Share this item:
        <PostSocials class="flex max-w-3xl" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import PostTag from '@theme/components/blog/PostTag'
import PostSocials from '@theme/components/blog/PostSocials.vue'
import Breadcrumbs from '@theme/components/Breadcrumbs'
import LazyImage from '@theme/components/base/LazyImage'

export default {
  name: 'PostHero',
  components: {
    Breadcrumbs,
    LazyImage,
    PostTag,
    PostSocials,
  },
  props: {
    tags: {
      type: [Array, String],
      default: () => [],
    },
    author: {
      type: Object,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    resolvedDate() {
      return dayjs(this.date).format(
        this.$themeConfig.dateFormat || 'YYYY-MM-DD'
      )
    },
    resolvedTags() {
      if (!this.tags || Array.isArray(this.tags)) return this.tags

      return this.tags
        .replace(/, /g, ',')
        .split(',')
        .filter((tag) => tag)
    },
    breadcrumbs() {
      return [
        { title: 'Home', link: 'https://ipfs.io/', external: true },
        { title: 'Blog & News', link: '/' },
        { title: this.title },
      ]
    },
  },
}
</script>
