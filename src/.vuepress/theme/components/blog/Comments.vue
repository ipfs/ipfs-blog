<template>
  <div>
    <h2 class="type-h2">Comments</h2>
    <div id="discourse-comments" class="mt-4 mb-24"></div>
  </div>
</template>

<script>
const safePermalink = (permalink, date) => {
  let domain = 'https://blog.ipfs.tech/'
  try {
    // Use old domain for legacy comment theads
    // created before we switched to the new domain
    // https://github.com/ipfs/ipfs-blog/issues/417
    if (new Date(date) < new Date('2022-08-15')) {
        domain = 'https://blog.ipfs.io/'
    }
  } catch (e) {
    console.error('unable to parse this.$frontmatter.date', e)
  }
  // https://meta.discourse.org/t/referer-with-domain-name-in-the-slug-breaks-comments-embed/204807/4?u=lidel
  const url = new URL(domain)
  url.pathname = permalink
  return url.toString()
}
export default {
  name: 'Comments',
  components: {},
  computed: {
    embedSrc() {
      return `https://discuss.ipfs.tech/embed/comments?embed_url=${safePermalink(this.$frontmatter.permalink, this.$frontmatter.date)}`
    },
  },
  mounted() {
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.ipfs.tech/',
      discourseEmbedUrl: safePermalink(this.$frontmatter.permalink, this.$frontmatter.date),
      discourseReferrerPolicy: 'strict-origin-when-cross-origin', // https://meta.discourse.org/t/embed-discourse-comments-on-another-website-via-javascript/31963#setting-the-referrer-policy-7
    }
    const d = document.createElement('script')
    d.type = 'text/javascript'
    d.async = true
    d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js'
    ;(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d)
  },
}
</script>
