<template>
  <div :class="[theme === 'dark' ? 'text-deepBlue' : 'text-white']">
    <LazyImage v-if="image" class="image--eyebrow mb-8" v-bind="image" />
    <p v-else-if="eyebrow" class="type-p3 mb-4">{{ eyebrow }}</p>
    <p class="type-h4 mb-8" v-html="text" />
    <CTA
      v-if="cta && cta.item"
      link-color="text-white border-b border-transparent hover:border-white"
      :icon="cta.icon"
      :icon-position="cta.iconPosition"
      :item="cta.item"
      :type="theme === 'dark' ? 'btn-outline' : 'link'"
    />
  </div>
</template>

<script>
import CTA from '@theme/components/CTA.vue'
import LazyImage from '@theme/components/base/LazyImage.vue'
export default {
  name: 'TextBlock',
  components: { CTA, LazyImage },
  props: {
    eyebrow: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    cta: {
      type: Object,
      default: null,
    },
    image: {
      type: Object,
      default: null,
    },
  },
}
</script>
<style scoped lang="postcss">
@screen md {
  .image--eyebrow {
    max-width: 25%;
  }
}
</style>
