<template>
  <RouterLink
    v-if="isInternal"
    :to="link"
    :exact="exact"
    @click.native="handleAnchorClick"
  >
    {{ item.text }}
  </RouterLink>
  <a v-else :href="link" :target="target" :rel="rel">
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script>
import link from '@theme/components/mixins/link'

export default {
  name: 'NavLink',
  mixins: [link],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
