<template>
  <div>
    <h2>
      Event organizer, content creator, or journalist? Submit an item or view
      the IPFS press kit.
    </h2>
    <div class="flex">
      Prefer your news a different way? Try our
      <a class="text-blueGreen hover:underline ml-1" href="#newsletter-form"
        >weekly newsletter</a
      >,
      <a
        class="text-blueGreen hover:underline ml-1"
        href="/index.xml"
        rel="noopener noreferrer"
        >RSS</a
      >, or social media.
      <RSSSubscription class="flex justify-end" />
    </div>
  </div>
</template>

<script>
import RSSSubscription from '@theme/components/RSSSubscription.vue'

export default {
  name: 'LinksAndSocial',
  components: {
    RSSSubscription,
  },
  props: {},
  computed: {},
  methods: {},
}
</script>
