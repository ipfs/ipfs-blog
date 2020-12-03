<template>
  <Layout>
    <div>
      <div>
        <h1>404</h1>
        <blockquote>Nothing to see here.</blockquote>
        <RouterLink to="/">Take me home.</RouterLink>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'

export default {
  name: 'NotFound',
  components: {
    Layout,
  },
}
</script>
