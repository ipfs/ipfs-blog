<template>
  <div class="flex items-center">
    <a href="https://protocol.ai" target="_blank" class="mr-1"
      ><SVGIcon
        name="logo-icon"
        title="Protocol Labs"
        :class-list="['w-4', 'h-4', 'fill-current']"
    /></a>
    <span
      >©
      <a
        class="text-blueGreen hover:underline"
        href="https://protocol.ai"
        target="_blank"
        >Protocol Labs</a
      >
      | Except as
      <a
        class="text-blueGreen hover:underline"
        href="https://protocol.ai/legal/"
        target="_blank"
        >noted</a
      >, content licensed
      <a
        class="text-blueGreen hover:underline"
        href="https://creativecommons.org/licenses/by/3.0/"
        target="_blank"
        >CC-BY 3.0</a
      >
      |
      <a
        class="text-blueGreen hover:underline"
        href="https://protocol.ai/legal/#terms-of-service"
        target="_blank"
        >Terms</a
      >
      |
      <a
        class="text-blueGreen hover:underline"
        href="https://protocol.ai/legal/#privacy-policy"
        target="_blank"
        >Privacy</a
      ></span
    >
  </div>
</template>

<script>
import SVGIcon from '@theme/components/base/SVGIcon.vue'

export default {
  name: 'FooterLegal',
  components: { SVGIcon },
}
</script>
