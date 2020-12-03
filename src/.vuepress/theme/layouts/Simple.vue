<template>
  <div>
    <Section
      :title="$page.title"
      :component-index="0"
      :background="{ type: 'gradient', gradient: 'bg-gradient-4' }"
    />
    <div class="grid-margins">
      <Content class="simple-page type-rich my-10 max-w-3xl" />
    </div>
  </div>
</template>

<script>
import Section from '@theme/components/Section'
export default {
  components: {
    Section,
  },
}
</script>

<style lang="postcss">
.simple-page.type-rich blockquote {
  @apply text-lg leading-normal pl-6;
}
</style>
