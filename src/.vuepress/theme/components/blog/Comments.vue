<template>
  <div>
    <h2 class="type-h2">Comments</h2>
    <iframe
      id="discourse-embed-frame"
      class="mt-4 mb-24"
      :src="embedSrc"
      width="100%"
      scrolling="no"
      referrerpolicy="no-referrer-when-downgrade"
      height="38px"
    />
  </div>
</template>

<script>
export default {
  name: 'Comments',
  components: {},
  data: () => ({}),
  computed: {
    embedSrc() {
      return `https://discuss.ipfs.io/embed/comments?embed_url=https://blog.ipfs.io${this.$frontmatter.url}`
    },
  },
}
</script>
