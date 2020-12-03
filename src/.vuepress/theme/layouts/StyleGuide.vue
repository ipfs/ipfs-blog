<template>
  <div>
    <div v-for="(block, index) in $page.frontmatter.body" :key="index">
      <h1 v-if="block.showTitle" class="type-h2 mt-12 mb-12 grid-margins">
        {{ block.component }}
      </h1>
      <component
        :is="block.component"
        v-bind="block"
        :component-index="index"
      ></component>
    </div>
  </div>
</template>

<script>
import { components } from '@theme/components/DynamicContent.vue'

export default {
  name: 'StyleGuide',
  components: {
    ...components,
  },
}
</script>
