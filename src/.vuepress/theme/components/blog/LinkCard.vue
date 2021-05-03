<template>
  <div
    class="group bg-white rounded overflow-hidden flex flex-col"
    itemprop="mainEntityOfPage"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="flex flex-col flex-grow"
    >
      <UnstyledLink :to="path" class="embed-responsive-item">
        <!--
            Because of an unknown firefox issue, we removed the VideoCard component and inlined it here.
            See here: https://github.com/ipfs/ipfs-blog/pull/94
        -->
        <div
          v-if="frontmatter.type.slug === 'video'"
          class="cover embed-responsive embed-responsive-og"
          @click="handleVideoClick"
        >
          <LazyImage
            class="h-full embed-responsive-item transform hover:scale-105 duration-500 ease-in-out"
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
        <div v-else class="cover embed-responsive embed-responsive-og">
          <LazyImage
            class="h-full embed-responsive-item transform hover:scale-105 duration-500 ease-in-out"
            img-class="h-full object-cover"
            itemprop="image"
            :alt="title"
            src-placeholder="/card-placeholder.png"
            :src="
              frontmatter.card_image
                ? frontmatter.card_image
                : `/${frontmatter.type.slug}-placeholder.png`
            "
          />
        </div>
      </UnstyledLink>
      <div class="p-4 flex flex-grow flex-col">
        <div class="flex flex-grow">
          <PostMeta
            :category="frontmatter.type"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            :title="title"
            :description="frontmatter.description"
            :post-path="path"
            :onclick="
              frontmatter.type.slug === 'video' ? handleVideoClick : null
            "
            class="type-p4 text-primary"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage'
import UnstyledLink from '@theme/components/UnstyledLink'
import PostMeta from '@theme/components/blog/PostMeta'
import SVGIcon from '@theme/components/base/SVGIcon.vue'

export default {
  name: 'LinkCard',
  components: {
    LazyImage,
    UnstyledLink,
    PostMeta,
    SVGIcon,
  },
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

      return `https://img.youtube.com/vi/${id}/0.jpg`
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
