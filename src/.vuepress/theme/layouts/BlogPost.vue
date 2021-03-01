<template>
  <Layout v-if="!$frontmatter.type">
    <article itemscope itemtype="https://schema.org/BlogPosting">
      <PostHero
        :title="$page.title"
        :author="$frontmatter.author"
        :date="$frontmatter.date"
        :tags="$frontmatter.tags"
        :image="$frontmatter.header_image"
      />
      <div class="grid-margins max-w-5xl">
        <div v-if="$frontmatter.image" class="blog type-rich my-12">
          <LazyImage
            :alt="$page.title"
            :src="
              $frontmatter.image
                ? $frontmatter.image
                : '/header-image-placeholder.png'
            "
          />
        </div>
        <Content
          itemprop="articleBody"
          class="blog type-rich mb-10 mt-4 pt-4 border-t-2 border-gray border-opacity-25 px-2 sm:px-6 md:px-0"
        />
        <Comments v-if="showComments" />
      </div>
    </article>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import LazyImage from '@theme/components/base/LazyImage'
import PostHero from '@theme/components/blog/PostHero'
import Comments from '@theme/components/blog/Comments'

export default {
  name: 'BlogPost',
  components: {
    Layout,
    LazyImage,
    PostHero,
    Comments,
  },
  data: () => ({
    showComments: null,
  }),
  mounted() {
    this.showComments =
      window.location.hostname === 'blog.ipfs.io' ||
      window.location.hostname === 'ipfs-blog.netlify.app'
  },
}
</script>

<style lang="postcss">
.blog > h1,
.blog > h2 {
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #d1d1d663;
}
</style>
