<template>
  <div class="flex items-center text-sm">
    <span>
      <a
        href="https://protocol.ai"
        target="_blank"
        class="mr-1 inline-block align-middle"
        @click="(event) => onLinkClick(event, true)"
      >
        <SVGIcon
          name="logo-icon"
          title="Protocol Labs"
          :class-list="['w-4', 'h-4', 'fill-current']"
        />
      </a>
      ©
      <a
        class="text-blueGreenLight hover:underline"
        href="https://protocol.ai"
        target="_blank"
        @click="onLinkClick"
        >Protocol Labs</a
      >
      | Except as
      <a
        class="text-blueGreenLight hover:underline"
        href="https://protocol.ai/legal/"
        target="_blank"
        @click="onLinkClick"
        >noted</a
      >, content licensed
      <a
        class="text-blueGreenLight hover:underline"
        href="https://creativecommons.org/licenses/by/3.0/"
        target="_blank"
        @click="onLinkClick"
        >CC-BY 3.0</a
      >
      |
      <a
        class="text-blueGreenLight hover:underline"
        href="https://protocol.ai/legal/#terms-of-service"
        target="_blank"
        @click="onLinkClick"
        >Terms</a
      >
      |
      <a
        class="text-blueGreenLight hover:underline"
        href="https://protocol.ai/legal/#privacy-policy"
        target="_blank"
        @click="onLinkClick"
        >Privacy</a
      >
      |
      <a
        class="text-blueGreenLight hover:underline"
        href="https://ipfs.io/legal/"
        target="_blank"
        @click="onLinkClick"
        >DMCA</a
      ></span
    >
  </div>
</template>

<script>
import SVGIcon from '@theme/components/base/SVGIcon.vue'

import countly from '../util/countly'

export default {
  name: 'FooterLegal',
  components: { SVGIcon },
  methods: {
    onLinkClick(event, isSvg) {
      const href = isSvg
        ? event.srcElement.parentElement.href
        : event.srcElement.href

      const text = isSvg
        ? event.srcElement.firstChild.textContent
        : event.srcElement.text

      countly.trackEvent(countly.events.LINK_CLICK_FOOTER, {
        view: this.$route.path,
        text: text.trim(),
        href: href,
      })
    },
  },
}
</script>
