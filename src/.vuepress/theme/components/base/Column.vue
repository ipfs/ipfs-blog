<template>
  <div v-transition class="column">
    <div class="flex justify-between flex-wrap">
      <component
        :is="block.component"
        v-for="(block, index) in blocks"
        :key="index"
        v-bind="block"
        :component-index="index"
        class="w-full mb-20 lg:mb-0 last:mb-0"
        :class="computedClasses"
      ></component>
    </div>
  </div>
</template>

<script>
import ColumnText from '@theme/components/ColumnText.vue'

export default {
  name: 'Column',
  components: { ColumnText },
  props: {
    cols: { type: Number, default: 1 },
    blocks: { type: Array, required: true },
  },
  computed: {
    computedClasses() {
      const classes = [`col-${this.cols}`]

      return classes
    },
  },
}
</script>

<style scoped lang="postcss">
@screen lg {
  .col-2 {
    width: calc(40% - 32px);
  }

  .col-3 {
    width: calc(30% - 32px);
  }
}
</style>
