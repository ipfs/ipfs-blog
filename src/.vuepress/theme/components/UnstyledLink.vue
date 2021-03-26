<template>
  <RouterLink v-if="isInternal" :to="link" :exact="exact">
    <slot />
  </RouterLink>
  <a v-else :href="link" :rel="rel" target="_blank">
    <slot />
  </a>
</template>

<script>
import link from '@theme/components/mixins/link'

export default {
  name: 'UnstyledLink',
  mixins: [link],

  props: {
    item: {
      type: Object,
      default: () => {},
    },
    to: {
      type: String,
      default: null,
    },
  },
}
</script>
