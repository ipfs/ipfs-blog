<template>
  <div
    class="card-post group bg-gray-pale rounded overflow-hidden flex flex-col transform hover:scale-105 duration-300 ease-in-out"
    itemprop="mainEntityOfPage"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <div class="pt-1 pb-4 px-4 flex flex-grow flex-col">
        <UnstyledLink :to="path" external>
          <h1 class="type-h5 font-bold text-primary hover:underline">
            {{ title }}
          </h1>
        </UnstyledLink>
        <div>
          <PostMeta
            :author="frontmatter.author"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            class="type-p4 text-primary"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import UnstyledLink from '@theme/components/UnstyledLink'
import PostMeta from '@theme/components/blog/PostMeta'

export default {
  name: 'BlogNewslinkCard',
  components: {
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
