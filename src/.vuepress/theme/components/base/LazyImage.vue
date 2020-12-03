<template>
  <div>
    <v-lazy-image
      :alt="alt"
      :class="imgClass"
      :sizes="sizes"
      :srcset="srcsetString"
      :src="requireAsset(src, ctx)"
      :src-placeholder="requireAsset(srcPlaceholder, ctx)"
      loading="lazy"
    />
    <p v-if="caption" class="type-p4 mt-3">{{ caption }}</p>
  </div>
</template>

<script>
import requireAsset from '@theme/components/mixins/requireAsset'

export default {
  name: 'LazyImage',
  mixins: [requireAsset],
  props: {
    alt: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
    imgClass: {
      type: [Array, String],
      default: '',
    },
    src: {
      type: String,
      required: true,
    },
    srcset: {
      type: Object,
      default: null,
    },
    srcPlaceholder: {
      type: String,
      default: '',
    },
    sizes: {
      type: String,
      default: '',
    },
    ctx: {
      type: String,
      default: null,
    },
  },
  computed: {
    srcsetString() {
      const srcsetObject = this.srcset
      const self = this
      if (srcsetObject) {
        return Object.keys(srcsetObject)
          .map(function (key, index) {
            return `${self.requireAsset(srcsetObject[key], self.ctx)} ${key}`
          })
          .join(', ')
      }
      return ''
    },
  },
}
</script>

<style lang="postcss" scoped>
.v-lazy-image[src=''] {
  @apply text-transparent;
  visibility: hidden;
}
.v-lazy-image {
  @apply opacity-0 transition-opacity duration-700;
}
.v-lazy-image-loaded {
  @apply opacity-100;
}
</style>
