<template>
  <Layout>
    <Section
      title="Pages"
      :component-index="0"
      :background="{ type: 'gradient', gradient: 'bg-gradient-2' }"
    />
    <div class="container grid-margins py-10 type-rich">
      <ul>
        <li v-for="page in $pagination.pages" :key="page.title">
          <router-link class="page-link" :to="page.path">{{
            page.title
          }}</router-link>
        </li>
      </ul>
      <div>
        <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink"
          >Prev</router-link
        >
        <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink"
          >Next</router-link
        >
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import Section from '@theme/components/Section.vue'

export default {
  name: 'DirectoryPagination',
  components: {
    Layout,
    Section,
  },
}
</script>
