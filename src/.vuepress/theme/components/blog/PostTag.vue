<template>
  <router-link
    v-if="link"
    :to="{ path: $localePath, query: { tags: tag.slug } }"
    :class="computedClass"
    rel="nofollow"
    @click.native="handleTagClick"
  >
    #{{ tag.name }}
  </router-link>
  <button v-else :class="computedClass" @click="addNewTag">
    #{{ tag.name }}
  </button>
</template>

<script>
import countly from '../../util/countly'

export default {
  name: 'PostTag',
  props: {
    link: {
      type: Boolean,
      default: () => false,
    },
    tag: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
      default: null,
    },
    className: {
      type: String,
      default: '',
    },
    callback: {
      type: Function,
      default: () => {},
    },
    parent: {
      type: String,
      default: 'card',
    },
  },
  computed: {
    computedClass() {
      return [
        'post-tag leading-none p-1 mr-1 rounded cursor-pointer transition duration-300 ease-in-out',
        this.dark
          ? 'bg-white text-charcoal hover:bg-charcoalMuted hover:text-white my-1'
          : 'bg-white text-charcoalMuted hover:bg-charcoalMuted hover:text-white',
        this.className,
      ]
    },
  },
  methods: {
    handleTagClick() {
      this.trackTag()
      this.$store.commit('appState/setActiveTags', [this.tag.slug])
    },
    addNewTag() {
      this.trackTag()
      this.$store.commit('appState/addNewTag', [this.tag.slug])
      this.callback()
    },
    trackTag() {
      const tagTracking = {
        tag: this.tag.name,
        method: `${this.parent}-select`,
      }

      countly.trackEvent(countly.events.FILTER, tagTracking)
    },
  },
}
</script>
