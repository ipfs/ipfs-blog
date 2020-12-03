<template>
  <div>
    <a
      class="rss-link flex items-center text-gray-dark transition-filter duration-700 ease-in-out"
      href="/index.xml"
      rel="noopener noreferrer"
    >
      <SVGIcon
        class="rss-icon w-6 h-6 fill-current mr-2"
        name="rss"
        title="rss"
      />
    </a>
  </div>
</template>
<script>
import SVGIcon from '@theme/components/base/SVGIcon'
export default {
  name: 'RSSSubscription',
  components: { SVGIcon },
}
</script>

<style lang="postcss" scoped>
.rss-link {
  filter: grayscale(1);

  &:hover {
    filter: grayscale(0);
  }
}
</style>
