<template>
  <li class="post-tag p-1 mr-1 bg-white text-blueGreen hover:underline rounded">
    <router-link :to="{ path: '/', query: { tags: tag } }">
      {{ tag }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'PostTag',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
}
</script>
