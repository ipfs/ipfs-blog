<template>
  <div>
    <div class="bg-gradient-6 text-white">
      <div class="pt-20 pb-10 grid-margins max-w-6xl">
        <Breadcrumbs :crumbs="breadcrumbs" class="mt-8" />
        <div class="grid grid-cols-1 md:grid-cols-2 pt-4">
          <div class="flex flex-col md:pr-8">
            <h1 class="type-h1">{{ title }}</h1>
            <PostAuthor :author="author" light parent="blog-post" />
            <time
              class="text-gray"
              pubdate
              itemprop="datePublished"
              :datetime="date"
            >
              {{ resolvedDate }}
            </time>
          </div>
          <div class="mt-4 md:mt-0">
            <LazyImage
              img-class="object-contain rounded w-full"
              :alt="$page.title"
              src-placeholder="/blog-post-placeholder.png"
              :src="`${image ? image : '/blog-post-placeholder.png'}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid-margins pt-8 flex flex-wrap justify-between items-center max-w-5xl px-2 sm:px-6 md:px-0"
    >
      <div
        v-if="resolvedTags.length"
        class="tags flex flex-wrap text-sm text-gray-dark"
        itemprop="keywords"
      >
        <PostTag
          v-for="tag in resolvedTags"
          :key="tag.slug"
          :tag="tag"
          link
          dark
          parent="blog-post"
        />
      </div>
      <div class="flex my-1 text-sm text-gray-dark">
        Share this item:
        <PostSocials class="flex max-w-3xl ml-2" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Breadcrumbs from '@theme/components/Breadcrumbs'
import LazyImage from '@theme/components/base/LazyImage'
import PostAuthor from '@theme/components/blog/PostAuthor'
import PostSocials from '@theme/components/blog/PostSocials.vue'
import PostTag from '@theme/components/blog/PostTag'

export default {
  name: 'PostHero',
  components: {
    Breadcrumbs,
    LazyImage,
    PostAuthor,
    PostSocials,
    PostTag,
  },
  props: {
    tags: {
      type: [Array, String],
      default: () => [],
    },
    author: {
      type: Array,
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
      dayjs.extend(utc)
      return dayjs
        .utc(this.date)
        .format(this.$themeLocaleConfig.dateFormat || 'YYYY-MM-DD')
    },
    resolvedTags() {
      if (!this.tags || Array.isArray(this.tags)) return this.tags

      return this.tags
        .replace(/, /g, ',')
        .split(',')
        .filter((tag) => tag)
    },
    breadcrumbs() {
      return [{ title: 'Blog & news', link: this.$localePath }]
    },
  },
}
</script>
