<template>
  <div :class="theme === 'dark' ? 'text-deepBlue' : 'text-white'">
    <LazyImage v-if="image" v-bind="image" class="mb-6" />
    <h3 class="type-h3 mb-3 lg:mb-6">{{ title }}</h3>
    <p class="type-p1" :class="[{ 'mb-6 lg:mb-8': cta && cta.item }]">
      {{ text }}
    </p>
    <CTA
      v-if="cta && cta.item"
      v-bind="cta"
      :link-color="
        theme === 'dark'
          ? 'text-inherit hover:text-webBlue'
          : 'text-inherit border-b border-transparent hover:border-white'
      "
    />
  </div>
</template>

<script>
import CTA from '@theme/components/CTA.vue'
import LazyImage from '@theme/components/base/LazyImage.vue'
export default {
  name: 'ColumnText',
  components: { CTA, LazyImage },
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
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
.image--eyebrow {
  max-width: 25%;
}
</style>
