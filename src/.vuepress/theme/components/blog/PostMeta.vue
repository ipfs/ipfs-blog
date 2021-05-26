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
    <UnstyledLink v-if="!onclick" :to="postPath" :title="title">
      <h1
        v-if="isExternal"
        class="type-h5 text-xl text-primary hover:underline"
      >
        <span>{{ formatttedTitle.slice(0, -1).join(' ') }}</span>
        <span class="whitespace-nowrap"
          >{{ formatttedTitle.slice(-1)[0] }} <OutboundLink
        /></span>
      </h1>
      <h1 v-else class="type-h5 text-xl text-primary hover:underline">
        {{ title }}
      </h1>
    </UnstyledLink>
    <a
      v-if="onclick"
      :href="postPath"
      target="_blank"
      class="text-left"
      :title="title"
      @click="onclick"
    >
      <h1 class="type-h5 text-xl text-primary hover:underline">
        <span>{{ formatttedTitle.slice(0, -1).join(' ') }}</span>
        <span class="whitespace-nowrap"
          >{{ formatttedTitle.slice(-1)[0] }} <OutboundLink
        /></span>
      </h1>
    </a>
    <PostAuthor v-if="author" :author="author" />
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
        {{ category.name }}
      </button>
      <PostTag v-for="tag in tags" :key="tag.name" class="mt-1" :tag="tag" />
    </div>
  </div>
</template>

<script>
import { isExternal } from '@theme/util'
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
      type: Array,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    category: {
      type: Object,
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
    onclick: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      formatttedTitle: this.title,
    }
  },
  computed: {
    resolvedDate() {
      dayjs.extend(utc)
      return dayjs
        .utc(this.date)
        .format(this.$themeLocaleConfig.dateFormat || 'YYYY-MM-DD')
    },
    isExternal() {
      return isExternal(this.postPath)
    },
  },
  created() {
    if (isExternal(this.postPath)) {
      this.getTitle()

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.getTitle)
      }
    }
  },
  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.getTitle)
    }
  },
  methods: {
    handleCatClick() {
      const categoryTracking = {
        category: this.category.name,
        method: 'card-select',
      }

      countly.trackEvent(countly.events.FILTER, categoryTracking)

      this.$store.commit('appState/setActiveCategory', this.category)
    },
    getTitle() {
      let charsLimit = 105
      let title = this.title

      if (['xxl'].includes(this.$mq)) {
        if (window.innerWidth <= 1555) {
          charsLimit = 70
        }

        if (window.innerWidth <= 1400) {
          charsLimit = 50
        }
      }

      if (['xl'].includes(this.$mq)) {
        charsLimit = 50
      }

      if (['lg'].includes(this.$mq)) {
        charsLimit = 70 - (1024 - window.innerWidth) * 0.08
      }

      if (this.title.length > charsLimit) {
        title = title.slice(0, charsLimit).trim() + '...'
      }

      this.formatttedTitle = title.trim().split(' ')
    },
  },
}
</script>
