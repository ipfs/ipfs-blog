<template>
  <div
    class="group bg-gray-pale rounded flex flex-col transform hover:scale-105 duration-300 ease-in-out p-2"
    itemprop="mainEntityOfPage"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
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
      <div class="pt-1 pb-4 px-2 flex flex-grow flex-col">
        <a
          :href="path"
          target="_blank"
          class="text-left"
          @click="handleVideoClick"
        >
          <h1 class="type-h5 font-bold text-primary hover:underline clamp-3">
            {{ title }}
          </h1>
        </a>
        <div>
          <PostMeta
            :category="frontmatter.type"
            :author="frontmatter.author"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            class="type-p4 text-primary"
          />
        </div>
        <footer class="flex-grow">
          <p
            v-if="frontmatter.description || frontmatter.description"
            class="type-p1-serif text-primary clamp-5"
            itemprop="description"
          >
            {{ frontmatter.description || frontmatter.description }}
          </p>
        </footer>
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
      validator: function (frontmatter) {
        if (frontmatter.description && frontmatter.description.length > 200) {
          return false
        }

        return true
      },
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
