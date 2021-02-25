<template>
  <div
    class="group bg-blueGreen bg-opacity-25 rounded overflow-hidden flex flex-col transform hover:scale-105 duration-300 ease-in-out"
    itemprop="mainEntityOfPage"
    :to="path"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <div class="cover embed-responsive embed-responsive-og">
        <router-link :to="path" class="embed-responsive-item">
          <LazyImage
            class="h-full"
            img-class="h-full object-cover"
            itemprop="image"
            :alt="title"
            :src="`${
              frontmatter.header_image
                ? frontmatter.header_image
                : '/header-image-placeholder.png'
            }`"
            src-placeholder="/card-placeholder.png"
            :ctx="regularPath"
          />
        </router-link>
      </div>
      <div class="p-4 flex flex-grow flex-col">
        <router-link :to="path">
          <h1 class="type-h5 text-xl text-primary hover:underline clamp-3">
            {{ title }}
          </h1>
        </router-link>
        <div>
          <PostMeta
            category="Blog post"
            :author="frontmatter.author"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            class="type-p4 text-primary"
          />
        </div>
        <footer v-if="frontmatter" class="flex-grow mt-2">
          <p
            class="type-p1 text-sm text-primary clamp-3"
            itemprop="description"
          >
            {{ frontmatter.description }}
          </p>
        </footer>
      </div>
    </article>
  </div>
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage'
import PostMeta from '@theme/components/blog/PostMeta'

export default {
  name: 'BlogRegularCard',
  components: { LazyImage, PostMeta },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    frontmatter: {
      type: Object,
      default: null,
    },
    regularPath: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
}
</script>
