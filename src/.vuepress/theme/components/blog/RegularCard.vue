<template>
  <div
    class="group bg-white rounded overflow-hidden flex flex-col"
    itemprop="mainEntityOfPage"
    :to="path"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="flex flex-col flex-grow"
    >
      <div class="cover embed-responsive embed-responsive-og">
        <router-link :to="path" class="embed-responsive-item">
          <LazyImage
            class="h-full transform hover:scale-105 duration-500 ease-in-out"
            img-class="w-full h-full object-cover"
            itemprop="image"
            :alt="title"
            :src="`${
              frontmatter.header_image
                ? frontmatter.header_image
                : '/blog-post-placeholder.png'
            }`"
            src-placeholder="/card-placeholder.png"
            :ctx="regularPath"
          />
        </router-link>
      </div>
      <div class="p-4 flex flex-grow flex-col">
        <div class="flex flex-grow">
          <PostMeta
            :category="{ name: 'Blog post', slug: 'blog-post' }"
            :author="frontmatter.author"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            :description="frontmatter.description"
            :title="title"
            :post-path="path"
            class="type-p4 text-primary"
          />
        </div>
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
