<template>
  <li
    class="post-tag p-1 mr-1 bg-white text-blueGreen hover:underline rounded cursor-pointer"
  >
    <router-link v-if="link" :to="{ path: '/', query: { tags: tag } }">
      {{ tag }}
    </router-link>
    <div v-else @click="handleTagClick">
      {{ tag }}
    </div>
  </li>
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
  },
  methods: {
    handleTagClick() {
      this.$store.commit('appState/setActiveTags', [this.tag])
    },
  },
}
</script>
