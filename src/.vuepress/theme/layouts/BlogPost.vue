<template>
  <Layout v-if="isVisible">
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
                : '/blog-post-placeholder.png'
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
  computed: {
    // hidden field set in plugins/pageData.js
    isVisible() {
      return !this.$root.$page.hidden
    },
  },
  mounted() {
    // redirect routes that are not blog posts (/events, /videos, etc)
    // to the homepage with the search parameter category
    if (!this.isVisible && this.$root.$page.frontmatter.type) {
      const type = this.$root.$page.frontmatter.type

      // path is relative to support ipfs sub path deployments
      return this.$router.replace({ path: `../?category=${type.slug}` })
    }

    // redirect any other blog post route that should not be visible
    // to the 404 page (hidden or scheduled publish posts)
    if (!this.isVisible) {
      // path to 404 is relative to support ipfs sub path deployments
      return this.$router.replace({ path: '../404' })
    }

    const ipfsPathRegExp = /^(\/(?:ipfs|ipns)\/[^/]+)/
    const ipfsPathPrefix =
      (window.location.pathname.match(ipfsPathRegExp) || [])[1] || ''

    if (ipfsPathPrefix) {
      Array.from(document.querySelectorAll('iframe')).forEach((iframe) => {
        const src = iframe.getAttribute('src')
        if (src.startsWith('/')) {
          iframe.setAttribute('src', ipfsPathPrefix + src)
        }
      })
    }

    this.showComments =
      !!ipfsPathPrefix ||
      window.location.hostname.includes('.ipns.localhost') ||
      window.location.hostname === 'blog.ipfs.io' ||
      window.location.hostname === 'ipfs-blog.on.fleek.co' ||
      window.location.hostname === 'ipfs-blog-staging.on.fleek.co'
  },
}
</script>

<style lang="postcss">
.blog > h1,
.blog > h2 {
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #d1d1d663;
}

.blog > iframe {
  @apply mx-auto;
}

.blog > iframe[src*='youtube'],
.blog > iframe[src*='vimeo'] {
  @apply max-w-full;
  height: auto;
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 1 / 1) {
  .blog > iframe[src*='youtube'],
  .blog > iframe[src*='vimeo'] {
    @apply h-52;
    @apply sm:h-80;
  }
}
</style>
