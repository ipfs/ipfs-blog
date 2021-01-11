<template>
  <div
    class="group bg-gray-pale rounded overflow-hidden flex flex-col transform hover:scale-105 duration-300 ease-in-out"
    itemprop="mainEntityOfPage"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <div class="cover embed-responsive embed-responsive-og">
        <UnstyledLink
          :to="path"
          :item="{ target: '_blank' }"
          class="embed-responsive-item"
        >
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
          />
        </UnstyledLink>
      </div>
      <div class="pt-1 pb-4 px-4 flex flex-grow flex-col">
        <UnstyledLink :to="path" :item="{ target: '_blank' }">
          <h1 class="type-h5 font-bold text-primary hover:underline clamp-3">
            {{ title }}
          </h1>
        </UnstyledLink>
        <div>
          <PostMeta
            :category="frontmatter.type"
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
import LazyImage from '@theme/components/base/LazyImage'
import UnstyledLink from '@theme/components/UnstyledLink'
import PostMeta from '@theme/components/blog/PostMeta'

export default {
  name: 'LinkCard',
  components: {
    LazyImage,
    UnstyledLink,
    PostMeta,
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
  },
}
</script>
