<template>
  <div class="grid-margins grid grid-cols-12 gap-2 lg:gap-8">
    <component :is="child.component" v-bind="child"></component>
  </div>
</template>

<script>
// Add as needed
import Column from '@theme/components/base/Column.vue'
import TextBlock from '@theme/components/TextBlock.vue'
export default {
  name: 'Container',
  components: {
    Column,
    TextBlock,
  },
  props: {
    child: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
