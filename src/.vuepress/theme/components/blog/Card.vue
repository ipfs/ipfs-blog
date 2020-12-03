<template>
  <div
    class="card-post group bg-gray-pale rounded overflow-hidden flex flex-col transform hover:scale-105 duration-300 ease-in-out"
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
            class="h-full p-2"
            img-class="h-full"
            itemprop="image"
            :alt="title"
            :src="`/header_images/${
              frontmatter.header_image
                ? frontmatter.header_image
                : 'blog-placeholder.png'
            }`"
            :ctx="regularPath"
          />
        </router-link>
      </div>
      <div class="pt-1 pb-4 px-4 flex flex-grow flex-col">
        <router-link :to="path">
          <h1 class="type-h5 font-bold text-primary hover:underline">
            {{ title }}
          </h1>
        </router-link>
        <div>
          <PostMeta
            :author="frontmatter.author"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            class="type-p4 text-primary"
          />
        </div>
        <footer class="flex-grow">
          <p
            v-if="frontmatter.description || frontmatter.description"
            class="type-p1-serif text-primary"
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
import LazyImage from '@theme/components/base/LazyImage'
import PostMeta from '@theme/components/blog/PostMeta'

export default {
  name: 'BlogCard',
  components: { LazyImage, PostMeta },

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
