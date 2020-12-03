<template>
  <Layout>
    <ul>
      <li v-for="tag in $tag.list" :key="tag.name">
        <router-link class="page-link" :to="tag.path">{{
          tag.name
        }}</router-link>
      </li>
    </ul>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'

export default {
  name: 'TagItem',
  components: {
    Layout,
  },
}
</script>
