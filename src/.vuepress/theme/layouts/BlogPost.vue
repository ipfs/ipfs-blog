<template>
  <Layout>
    <article itemscope itemtype="https://schema.org/BlogPosting">
      <Section
        :title="$page.title"
        :background="{
          type: 'gradient',
          gradient: 'bg-gradient-2',
        }"
        :theme="{
          grid: 'max-w-4xl lg:mx-auto',
          text: 'text-white type-h1 lg:col-span-10',
          textMeta: 'name headline',
        }"
        :component-index="0"
        ><PostMeta
          :author="$frontmatter.author"
          :date="$frontmatter.date"
          :tags="$frontmatter.tags"
          class="type-p1 text-white my-4"
        />
      </Section>
      <div class="max-w-4xl lg:mx-auto">
        <div v-if="$frontmatter.image" class="blog type-rich my-12">
          <LazyImage
            :alt="$page.title"
            src-placeholder="/images/blog/og/default.png"
            :src="$frontmatter.image"
          />
        </div>
        <Content itemprop="articleBody" class="blog type-rich my-10" />
        <RSSSubscription class="max-w-3xl mb-10 mx-5 lg:mx-auto" />
      </div>
    </article>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import Section from '@theme/components/Section.vue'
import LazyImage from '@theme/components/base/LazyImage'
import RSSSubscription from '@theme/components/RSSSubscription.vue'

import PostMeta from '@theme/components/blog/PostMeta'

export default {
  name: 'BlogPost',
  components: {
    Layout,
    Section,
    LazyImage,
    PostMeta,
    RSSSubscription,
  },
}
</script>

<style lang="postcss">
.blog > *:not(.expand) {
  @apply max-w-3xl mx-5;
  @screen lg {
    @apply mx-auto;
  }
}
.blog > .expand {
  @apply w-full;
  > *,
  > p > * {
    @apply w-full;
  }
}
/*
TODO: find a better way to calculate this
when a responsive ratio has a max-width
*/
@screen lg {
  .blog .embed-responsive-16by9 {
    padding-bottom: 43.25%;
  }
}
</style>
