<template>
  <div
    :class="[
      $page.frontmatter.slug,
      { 'relative overflow-auto': content.subnavigation },
    ]"
  >
    <Subnavigation
      v-if="content.subnavigation"
      v-bind="content.subnavigation"
    />
    <component
      :is="block.component"
      v-for="(block, index) in content.body"
      :key="index"
      v-bind="block"
    />
  </div>
</template>
<script>
// Import all components that can be rendered from frontmatter array
import Column from '@theme/components/base/Column.vue'
import Container from '@theme/components/base/Container.vue'
import Section from '@theme/components/Section.vue'
import Typography from '@theme/components/Typography.vue'

// layout compositions

export const components = {
  Column,
  Container,
  Section,
  Typography,
}

export default {
  name: 'DynamicContent',
  components,
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
