<template>
  <div class="flex flex-col">
    <PostAuthor v-if="author && author.name" v-bind="author" />
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
    <div class="tags mt-2 flex flex-wrap" itemprop="keywords">
      <button
        v-if="category"
        class="p-1 mr-1 bg-blueGreen text-white font-semibold hover:underline rounded cursor-pointer mt-1"
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
import PostTag from '@theme/components/blog/PostTag'
import PostAuthor from '@theme/components/blog/PostAuthor'

export default {
  name: 'PostMeta',
  components: {
    PostTag,
    PostAuthor,
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
  },
  methods: {
    handleCatClick() {
      this.$store.commit('appState/setActiveCategory', this.category)
    },
  },
}
</script>
