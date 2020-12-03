<template>
  <div class="flex flex-col">
    <!-- <PostAuthor v-if="author && author.name" v-bind="author" /> -->
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
    <ul v-if="resolvedTags.length" class="tags flex mt-1" itemprop="keywords">
      <PostTag v-for="tag in resolvedTags" :key="tag" :tag="tag" />
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import PostTag from '@theme/components/blog/PostTag'
// import PostAuthor from '@theme/components/blog/PostAuthor'

export default {
  name: 'PostMeta',
  components: {
    PostTag,
    // PostAuthor,
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
  },
}
</script>
