<template>
  <div class="mb-10">
    <h2 class="mb-2">
      Event organizer, content creator, or journalist?
      <a
        class="text-blueGreen hover:underline"
        href="https://airtable.com/shrNH8YWole1xc70I"
        target="_blank"
        rel="noopener noreferrer"
        @click="trackSubmitItem"
      >
        Submit</a
      >
      an item or view the
      <a
        class="text-blueGreen hover:underline"
        href="https://ipfs.tech/media/"
        rel="noopener noreferrer"
        @click="trackPressKit"
        >IPFS press kit.</a
      >
    </h2>
    <div>
      {{ `Prefer your news a different way? Try our ` }}
      <a
        class="text-blueGreen hover:underline"
        href="#newsletter-form"
        @click="blockLazyLoad()"
        >newsletter</a
      >{{ `, ` }}
      <a
        class="text-blueGreen hover:underline"
        href="/index.xml"
        rel="noopener noreferrer"
        >RSS</a
      >{{ `, ` }}
      <span class="mr-1">or social media.</span>
      <div class="inline-flex">
        <RSSSubscription class="flex" />
      </div>
    </div>
  </div>
</template>

<script>
import RSSSubscription from '@theme/components/RSSSubscription.vue'

import countly from '../../util/countly'

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
  methods: {
    trackSubmitItem() {
      countly.trackEvent(countly.events.LINK_CLICK_SUBMIT_ITEM)
    },
    trackPressKit() {
      countly.trackEvent(countly.events.LINK_CLICK_PRESS_KIT)
    },
  },
}
</script>
