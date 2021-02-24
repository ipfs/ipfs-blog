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
      <UnstyledLink
        :to="path"
        :item="{ target: '_blank' }"
        class="embed-responsive-item"
      >
        <div class="cover embed-responsive embed-responsive-og">
          <LazyImage
            class="h-full embed-responsive-item"
            img-class="h-full object-cover"
            itemprop="image"
            :alt="title"
            src-placeholder="/card-placeholder.png"
            :src="
              frontmatter.card_image
                ? frontmatter.card_image
                : `/${frontmatter.type
                    .toLowerCase()
                    .split(' ')
                    .join('-')}-placeholder.png`
            "
          />
        </div>
      </UnstyledLink>
      <div class="p-4 flex flex-grow flex-col">
        <UnstyledLink :to="path" :item="{ target: '_blank' }">
          <h1 class="type-h5 text-xl text-primary hover:underline clamp-3">
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
        <footer class="flex-grow mt-2">
          <p
            v-if="frontmatter.description || frontmatter.description"
            class="type-p1 text-sm text-primary clamp-3"
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
    },
    path: {
      type: String,
      required: true,
    },
  },
}
</script>
