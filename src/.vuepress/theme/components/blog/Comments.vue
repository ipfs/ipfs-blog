<template>
  <div>
    <h2 class="type-h2">Comments</h2>
    <div id="discourse-comments" class="mt-4 mb-24"></div>
  </div>
</template>

<script>
const safePermalink = (permalink) => {
  // https://meta.discourse.org/t/referer-with-domain-name-in-the-slug-breaks-comments-embed/204807/4?u=lidel
  const url = new URL('https://blog.ipfs.io/')
  url.pathname = permalink
  return url.toString()
}
export default {
  name: 'Comments',
  components: {},
  computed: {
    embedSrc() {
      return `https://discuss.ipfs.io/embed/comments?embed_url=${safePermalink(this.$frontmatter.permalink)}`
    },
  },
  mounted() {
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.ipfs.io/',
      discourseEmbedUrl: safePermalink(this.$frontmatter.permalink),
    }
    const d = document.createElement('script')
    d.type = 'text/javascript'
    d.async = true
    d.src = 'https://discuss.ipfs.io/javascripts/embed.js'
    document.getElementsByTagName('body')[0].appendChild(d)
  },
}
</script>
