<template>
  <div>
    <div class="bg-gradient-6 text-white">
      <div class="pt-20 pb-10 grid-margins">
        <Breadcrumbs :crumbs="breadcrumbs" class="mt-8" />
        <div class="grid grid-cols-1 md:grid-cols-2 pt-4">
          <div class="flex flex-col md:pr-8">
            <h1 class="type-h1">{{ title }}</h1>
            <router-link
              v-if="author && author.name"
              :to="{ path: $localePath, query: { author: author.name } }"
            >
              <PostAuthor v-bind="author" />
            </router-link>
            <time
              class="italic opacity-50"
              pubdate
              itemprop="datePublished"
              :datetime="date"
            >
              {{ resolvedDate }}
            </time>
          </div>
          <div class="mt-4 md:mt-0">
            <LazyImage
              img-class="object-contain"
              :alt="$page.title"
              src-placeholder="/images/blog/og/default.png"
              :src="`${image ? image : '/header-image-placeholder.png'}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid-margins pt-8 flex justify-between items-center">
      <div
        v-if="resolvedTags.length"
        class="tags flex mt-1"
        itemprop="keywords"
      >
        <PostTag v-for="tag in resolvedTags" :key="tag" :tag="tag" link dark />
      </div>
      <div class="flex">
        Share this item:
        <PostSocials class="flex max-w-3xl ml-2" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
        this.$themeLocaleConfig.dateFormat || 'YYYY-MM-DD'
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
        { title: 'Blog & news', link: this.$localePath },
        { title: this.title },
      ]
    },
  },
}
</script>
