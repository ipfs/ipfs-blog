<template>
  <div class="mb-10">
    <h2 class="text-xl mb-2 inline-block">
      Event organizer, content creator, or journalist?
      <a
        class="text-blueGreen hover:underline inline-block"
        href="https://protocol.ai/join"
        rel="noopener noreferrer"
      >
        Submit</a
      >
      an item or view the
      <a
        class="text-blueGreen hover:underline inline-block"
        href="https://ipfs.io/media/"
        rel="noopener noreferrer"
        >IPFS press kit.</a
      >
    </h2>
    <div class="text-xl inline-block md:flex">
      Prefer your news a different way? Try our
      <a
        class="text-blueGreen hover:underline ml-1 inline-block"
        href="#newsletter-form"
        @click="blockLazyLoad()"
        >weekly newsletter</a
      >,
      <a
        class="text-blueGreen hover:underline ml-1 inline-block"
        href="/index.xml"
        rel="noopener noreferrer"
        >RSS</a
      >, or social media.
      <div class="flex ml-2 inline-block">
        <RSSSubscription class="flex justify-end" />
      </div>
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
  props: {
    blockLazyLoad: {
      type: Function,
      default: null,
    },
  },
  computed: {},
  methods: {},
}
</script>
