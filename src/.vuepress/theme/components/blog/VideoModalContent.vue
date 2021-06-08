<template>
  <div class="group rounded flex flex-col" itemprop="mainEntityOfPage">
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <h1 class="type-h5 text-xl text-primary mr-4">
        <UnstyledLink :to="videoModalCard.path" class="clamp-3 hover:underline">
          {{ videoModalCard.title }}
        </UnstyledLink>
      </h1>
      <div class="cover embed-responsive embed-responsive-og my-4">
        <iframe
          class="h-full w-full"
          type="text/html"
          :src="resolvedPath"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          frameborder="0"
        ></iframe>
      </div>
      <div class="text-sm">
        <time
          class="text-gray-dark"
          pubdate
          itemprop="datePublished"
          :datetime="videoModalCard.frontmatter.date"
        >
          {{ resolvedDate }}
        </time>
        <div class="mt-3 flex flex-wrap" itemprop="keywords">
          <button
            v-if="videoModalCard.frontmatter.type"
            class="p-1 bg-aquaMuted leading-none bg-opacity-50 rounded text-blueGreen font-semibold hover:bg-blueGreen hover:text-white text-sm mr-1"
            @click="handleCatClick()"
          >
            {{ videoModalCard.frontmatter.type.name }}
          </button>
          <PostTag
            v-for="tag in resolvedTags"
            :key="tag.slug"
            :tag="tag"
            :callback="closeModal"
            class-name="text-sm"
            parent="video-modal"
          />
        </div>
      </div>
      <footer class="flex-grow">
        <p
          v-if="
            videoModalCard.frontmatter.description ||
            videoModalCard.frontmatter.description
          "
          class="type-p1 text-primary clamp-5"
          itemprop="description"
        >
          {{
            videoModalCard.frontmatter.description ||
            videoModalCard.frontmatter.description
          }}
        </p>
      </footer>
      <div class="flex items-end mt-4">
        <span class="text-sm text-gray-dark">Share this item:</span>
        <PostSocials
          class="flex ml-2"
          :url="videoModalCard.path"
          :title="videoModalCard.frontmatter.title"
        />
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import UnstyledLink from '@theme/components/UnstyledLink'
import PostSocials from '@theme/components/blog/PostSocials.vue'
import PostTag from '@theme/components/blog/PostTag'

import countly from '../../util/countly'

export default {
  name: 'VideoModalContent',
  components: { UnstyledLink, PostSocials, PostTag },
  props: {
    closeModal: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapState('appState', ['videoModalCard']),
    resolvedPath() {
      if (
        !this.videoModalCard.path.includes('youtube') ||
        this.videoModalCard.path.includes('embed')
      ) {
        return this.videoModalCard.path
      }

      const newPath = new URL(this.videoModalCard.path)
      const originalStartTime = newPath.searchParams.get('t')
      const start =
        originalStartTime &&
        newPath.searchParams
          .get('t')
          .slice(0, newPath.searchParams.get('t').length - 1)
      const id =
        newPath.searchParams.get('v') || newPath.searchParams.get('list')
      const isAList = newPath.pathname.includes('list')

      return isAList
        ? `https://www.youtube.com/embed/videoseries?list=${id}`
        : `https://www.youtube.com/embed/${id}?${start ? `start=${start}` : ''}`
    },
    resolvedDate() {
      dayjs.extend(utc)
      return dayjs
        .utc(this.date)
        .format(this.$themeLocaleConfig.dateFormat || 'YYYY-MM-DD')
    },
    resolvedTags() {
      if (
        !this.videoModalCard.frontmatter.tags ||
        Array.isArray(this.videoModalCard.frontmatter.tags)
      )
        return this.videoModalCard.frontmatter.tags

      return this.videoModalCard.frontmatter.tags
        .replace(/, /g, ',')
        .split(',')
        .filter((tag) => tag)
    },
  },
  methods: {
    handleCatClick() {
      const categoryTracking = {
        category: this.videoModalCard.frontmatter.type.name,
        method: 'video-modal-select',
      }

      countly.trackEvent(countly.events.FILTER, categoryTracking)

      this.$store.commit(
        'appState/setActiveCategory',
        this.videoModalCard.frontmatter.type
      )
      this.closeModal()
    },
  },
}
</script>
