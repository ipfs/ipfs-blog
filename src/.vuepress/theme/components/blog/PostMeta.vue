<template>
  <div class="flex flex-col">
    <PostAuthor v-if="author && author.name" v-bind="author" />
    <div v-if="date">
      <time
        class="italic opacity-50"
        pubdate
        itemprop="datePublished"
        :datetime="date"
      >
        {{ resolvedDate }}
      </time>
    </div>
    <ul
      v-if="resolvedTags.length"
      class="tags mt-2 mb-1 flex flex-wrap"
      itemprop="keywords"
    >
      <li
        v-if="category"
        class="p-1 mr-1 bg-white text-blueGreen hover:underline rounded cursor-pointer mt-1"
      >
        <div @click="handleCatClick">{{ category }}</div>
      </li>
      <PostTag v-for="tag in resolvedTags" :key="tag" class="mt-1" :tag="tag" />
    </ul>
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
