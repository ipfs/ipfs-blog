<template>
  <div>
    <h2 class="type-h2">Comments</h2>
    <div id="discourse-comments" class="mt-4 mb-24"></div>
    <!-- <iframe
      id="discourse-embed-frame"
      ref="frame"
      class="mt-4 mb-24"
      :src="embedSrc"
      width="100%"
      scrolling="no"
      :height="frameHeight"
      referrerpolicy="no-referrer-when-downgrade"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'Comments',
  components: {},
  computed: {
    embedSrc() {
      return `https://discuss.ipfs.io/embed/comments?embed_url=https://blog.ipfs.io${this.$frontmatter.permalink}`
    },
  },
  mounted() {
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.ipfs.io/',
      discourseEmbedUrl: `https://blog.ipfs.io${this.$frontmatter.permalink}`,
    }
    const d = document.createElement('script')
    d.type = 'text/javascript'
    d.async = true
    d.src = 'https://discuss.ipfs.io/javascripts/embed.js'
    document.getElementsByTagName('body')[0].appendChild(d)
  },
}
</script>
