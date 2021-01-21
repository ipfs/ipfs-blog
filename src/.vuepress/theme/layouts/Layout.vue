<template>
  <main>
    <slot name="header"></slot>
    <DynamicContent
      v-if="$page.frontmatter.body"
      :content="$page.frontmatter"
    />
    <slot></slot>
    <slot name="footer"></slot>
  </main>
</template>

<script>
import DynamicContent from '@theme/components/DynamicContent.vue'

export default {
  name: 'Layout',
  components: {
    DynamicContent,
  },
}
</script>
