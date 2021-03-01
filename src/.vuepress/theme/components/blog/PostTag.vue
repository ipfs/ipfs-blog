<template>
  <router-link
    v-if="link"
    :to="{ path: $localePath, query: { tags: tag } }"
    :class="computedClass"
    @click.native="handleTagClick"
  >
    #{{ tag }}
  </router-link>
  <button v-else :class="computedClass" @click="addNewTag">#{{ tag }}</button>
</template>

<script>
export default {
  name: 'PostTag',
  props: {
    link: {
      type: Boolean,
      default: () => false,
    },
    tag: {
      type: String,
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
  },
  computed: {
    computedClass() {
      return [
        'post-tag p-1 mr-1 rounded cursor-pointer transition duration-300 ease-in-out',
        this.dark
          ? 'bg-gray-muted text-black hover:underline my-1'
          : 'bg-white text-charcoalMuted hover:bg-charcoalMuted hover:text-white',
        this.className,
      ]
    },
  },
  methods: {
    handleTagClick() {
      this.$store.commit('appState/setActiveTags', [this.tag])
    },
    addNewTag() {
      this.$store.commit('appState/addNewTag', [this.tag])
      this.callback()
    },
  },
}
</script>
