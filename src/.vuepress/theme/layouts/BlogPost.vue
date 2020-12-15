<template>
  <Layout>
    <article itemscope itemtype="https://schema.org/BlogPosting">
      <PostHero
        :title="$page.title"
        :author="$frontmatter.author"
        :date="$frontmatter.date"
        :tags="$frontmatter.tags"
        :image="$frontmatter.header_image"
      />
      <div class="grid-margins">
        <div v-if="$frontmatter.image" class="blog type-rich my-12">
          <LazyImage
            :alt="$page.title"
            src-placeholder="/images/blog/og/default.png"
            :src="$frontmatter.image"
          />
        </div>
        <Content
          itemprop="articleBody"
          class="blog type-rich mb-10 mt-4 pt-4 border-t-2 border-gray border-opacity-25"
        />
      </div>
    </article>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import LazyImage from '@theme/components/base/LazyImage'
import PostHero from '@theme/components/blog/PostHero'

export default {
  name: 'BlogPost',
  components: {
    Layout,
    LazyImage,
    PostHero,
  },
  mounted() {
    console.log({ f: this.$frontmatter, p: this.$page })
  },
}
</script>

<style lang="postcss">
.blog > h1,
.blog > h2 {
  padding-bottom: 1rem;
  border-bottom: 2px solid #d1d1d663;
}
</style>
