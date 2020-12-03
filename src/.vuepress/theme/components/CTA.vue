<template>
  <RouterLink
    v-if="isInternal"
    :class="[classObject, type === 'link' && linkColor]"
    :to="link"
  >
    {{ item.text }}
    <SVGIcon
      v-if="iconName"
      class="cta__svg w-5 h-5"
      :name="iconName"
      :title="iconTitle"
    />
  </RouterLink>
  <a
    v-else
    :class="[classObject, type === 'link' && linkColor]"
    :href="link"
    :target="target"
    :rel="rel"
  >
    {{ item.text }}
    <SVGIcon
      v-if="iconName"
      class="cta__svg w-5 h-5"
      :name="iconName"
      :title="iconTitle"
    />
  </a>
</template>

<script>
import SVGIcon from '@theme/components/base/SVGIcon.vue'
import { isExternal, isMailto, isTel, ensureExt } from '../util'

export default {
  name: 'CTA',
  components: { SVGIcon },
  props: {
    type: {
      type: String,
      default: 'link',
    },
    icon: {
      type: String,
      default: '',
    },
    iconTitle: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'post',
    },
    item: {
      type: Object,
      required: true,
    },
    linkColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    classObject() {
      return {
        btn: this.type !== 'link',
        [this.type]: true,
        [this.iconPosition]: true,
        'type-cta': true,
      }
    },
    link() {
      return ensureExt(this.item.link)
    },
    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          (rootLink) => rootLink === this.link
        )
      }
      return this.link === '/'
    },
    iconName() {
      if (this.type === 'link') {
        return this.isInternal ? 'arrow-right-icon' : 'arrow-up-icon'
      } else {
        return this.icon
      }
    },
    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link)
    },
    isBlankTarget() {
      return this.target === '_blank'
    },
    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget
    },
    target() {
      if (this.isNonHttpURI) {
        return null
      }
      if (this.item.target) {
        return this.item.target
      }
      return isExternal(this.link) ? '_blank' : ''
    },
    rel() {
      if (this.isNonHttpURI) {
        return null
      }
      if (this.item.rel) {
        return this.item.rel
      }
      return this.isBlankTarget ? 'noopener noreferrer' : ''
    },
  },
}
</script>
<style scoped lang="postcss">
.btn {
  @apply rounded-full inline-flex py-2 px-6 items-center;
  @apply transition duration-300 ease-in-out;
}
.btn-outline {
  @apply border-solid border-2 border-transparent;
  background-image: linear-gradient(104.72deg, #1a74fc -4.4%, #4ef286 112.23%);
  background-origin: border-box;
  box-shadow: 0px 1000px 1px theme('colors.gray.light') inset;
  @apply text-deepBlue;
}
.btn-outline:hover {
  @apply shadow-none text-white;
}
.btn-fill {
  @apply bg-webBlue text-white fill-current;
}
.btn-fill:hover {
  @apply bg-deepBlue;
}
.link {
  @apply inline-flex items-center;
  @apply transition duration-300 ease-in-out;
}
.post {
  @apply flex-row;
}

.post .cta__svg {
  @apply ml-2;
}

.pre {
  @apply flex-row-reverse;
}

.pre .cta__svg {
  @apply mr-2;
}
</style>
