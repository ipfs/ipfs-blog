<template>
  <div
    class="group bg-white rounded overflow-hidden flex flex-col transform hover:scale-105 duration-300 ease-in-out"
    itemprop="mainEntityOfPage"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="flex flex-col flex-grow"
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
        <div class="flex flex-grow">
          <PostMeta
            :category="frontmatter.type"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            :title="title"
            :description="frontmatter.description"
            :post-path="path"
            external
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
