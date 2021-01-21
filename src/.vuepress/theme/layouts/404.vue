<template>
  <Layout class="flex flex-col flex-grow">
    <div class="bg-gradient-6 h-20"></div>
    <div class="bg-gray-light flex flex-grow">
      <div class="grid-margins w-full type-rich py-8">
        <h1>Item not found</h1>
        <hr class="border separator" />
        <div>
          This item has been moved or removed.
          <RouterLink to="/">Back to home</RouterLink>
        </div>
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

<style scoped lang="postcss">
.separator {
  border-color: #e9e9ec;
}
</style>
