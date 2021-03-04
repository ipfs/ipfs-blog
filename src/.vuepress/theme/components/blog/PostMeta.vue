<template>
  <div class="flex flex-col">
    <div v-if="date">
      <time
        class="text-gray-dark"
        pubdate
        itemprop="datePublished"
        :datetime="date"
      >
        {{ resolvedDate }}
      </time>
    </div>
    <router-link
      v-if="title && !external && !onclick"
      :to="postPath"
      :title="title"
    >
      <h1 class="type-h5 text-xl text-primary hover:underline clamp-3">
        {{ title }}
      </h1>
    </router-link>
    <UnstyledLink
      v-if="title && external && !onclick"
      :to="postPath"
      :item="{ target: '_blank' }"
      :title="title"
    >
      <h1 class="type-h5 text-xl text-primary hover:underline clamp-3">
        {{ title }}
      </h1>
    </UnstyledLink>
    <a
      v-if="title && onclick"
      :href="postPath"
      target="_blank"
      class="text-left"
      :title="title"
      @click="onclick"
    >
      <h1 class="type-h5 text-xl text-primary hover:underline clamp-3">
        {{ title }}
      </h1>
    </a>
    <PostAuthor v-if="author" v-bind="author" />
    <p
      v-if="description"
      class="type-p1 text-sm text-primary clamp-3 mt-2"
      itemprop="description"
    >
      {{ description }}
    </p>
    <div class="tags mt-auto pt-2 flex flex-wrap" itemprop="keywords">
      <button
        v-if="category"
        class="p-1 mr-1 bg-aquaMuted leading-none bg-opacity-50 text-blueGreen font-semibold hover:bg-blueGreen hover:text-white transition duration-300 ease-in-out rounded cursor-pointer mt-1"
        @click="handleCatClick"
      >
        {{ category }}
      </button>
      <PostTag v-for="tag in resolvedTags" :key="tag" class="mt-1" :tag="tag" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import PostTag from '@theme/components/blog/PostTag'
import PostAuthor from '@theme/components/blog/PostAuthor'
import UnstyledLink from '@theme/components/UnstyledLink'
import countly from '../../util/countly'

export default {
  name: 'PostMeta',
  components: {
    PostTag,
    PostAuthor,
    UnstyledLink,
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
    category: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    postPath: {
      type: String,
      default: '',
    },
    external: {
      type: Boolean,
      default: false,
    },
    onclick: {
      type: Function,
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
  },
  methods: {
    handleCatClick() {
      const categoryTracking = {
        category: this.category,
        method: 'card-select',
      }

      countly.trackEvent(countly.events.FILTER, categoryTracking)

      this.$store.commit('appState/setActiveCategory', this.category)
    },
  },
}
</script>
