<template>
  <div
    class="group bg-white rounded flex flex-col transform hover:scale-105 duration-300 ease-in-out"
    itemprop="mainEntityOfPage"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="flex flex-col flex-grow"
    >
      <div class="cover embed-responsive overflow-visible embed-responsive-og">
        <a
          target="_blank"
          :href="path"
          class="embed-responsive-item"
          @click="handleVideoClick"
        >
          <div class="h-full w-full relative">
            <LazyImage
              class="h-full"
              img-class="w-full h-full object-cover"
              itemprop="image"
              :alt="title"
              src-placeholder="/card-placeholder.png"
              :src="thumbnailPath"
            />
            <div
              class="absolute top-0 flex justify-center items-center w-full h-full bg-black bg-opacity-25"
            >
              <SVGIcon
                name="play"
                title="Play"
                :class-list="['w-16', 'h-16', 'fill-current']"
              />
            </div>
          </div>
        </a>
      </div>
      <div class="p-4 flex flex-grow flex-col">
        <div class="flex flex-grow">
          <PostMeta
            :category="frontmatter.type"
            :author="null"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            :title="title"
            :description="frontmatter.description"
            :post-path="path"
            :onclick="handleVideoClick"
            class="type-p4 text-primary"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import SVGIcon from '@theme/components/base/SVGIcon.vue'
import PostMeta from '@theme/components/blog/PostMeta'
import LazyImage from '@theme/components/base/LazyImage'

export default {
  name: 'VideoCard',
  components: { SVGIcon, PostMeta, LazyImage },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    frontmatter: {
      type: Object,
      default: () => ({}),
    },
    path: {
      type: String,
      required: true,
    },
    openVideoModal: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    thumbnailPath() {
      if (!this.path.includes('youtube')) {
        return ''
      }

      const newPath = new URL(this.path)
      const id =
        newPath.searchParams.get('v') || newPath.searchParams.get('list')

      return `http://img.youtube.com/vi/${id}/0.jpg`
    },
  },
  methods: {
    handleVideoClick(event) {
      /* Only uses the anchor default behavior when it's a
         new tab click  - ctrl/cmd + click or "open in a
         new tab" option */
      if (
        event.ctrlKey ||
        event.shiftKey ||
        event.metaKey ||
        (event.button && event.button === 1)
      ) {
        return
      }

      event.preventDefault()

      this.$store.commit('appState/setVideoModalCard', {
        frontmatter: this.frontmatter,
        path: this.path,
        title: this.title,
      })

      this.openVideoModal()
    },
  },
}
</script>
