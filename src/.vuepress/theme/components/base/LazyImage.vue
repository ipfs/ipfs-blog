<template>
  <div>
    <v-lazy-image
      :alt="alt"
      :class="imgClass"
      :sizes="sizes"
      :srcset="srcsetString"
      :src="withBase(src, ctx)"
      :src-placeholder="withBase(srcPlaceholder, ctx)"
      loading="lazy"
    />
    <p v-if="caption" class="type-p4 mt-3">{{ caption }}</p>
  </div>
</template>

<script>
import withBase from '@theme/components/mixins/requireAsset'

export default {
  name: 'LazyImage',
  mixins: [withBase],
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
            return `${self.withBase(srcsetObject[key], self.ctx)} ${key}`
          })
          .join(', ')
      }
      return ''
    },
  },
}
</script>

<style lang="postcss" scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.v-lazy-image {
  @apply opacity-0;
}

.v-lazy-image[src='/card-placeholder.png'],
.v-lazy-image-loaded {
  animation: fade-in 0.7s ease-in-out forwards;
}
</style>
