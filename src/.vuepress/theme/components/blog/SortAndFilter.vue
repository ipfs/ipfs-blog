<template>
  <div class="grid-margins opacity-85">
    <LinksAndSocial :block-lazy-load="blockLazyLoad" />
    <SearchCategoriesAndTags class="mt-2 xl:-mb-10 min-h-28" :tags="tags" />
    <ActiveTags :number-of-posts="numberOfPosts" class="mt-4" />
  </div>
</template>

<script>
import LinksAndSocial from '@theme/components/blog/LinksAndSocial.vue'
import ActiveTags from '@theme/components/blog/ActiveTags.vue'
import SearchCategoriesAndTags from '@theme/components/blog/SearchCategoriesAndTags.vue'

export default {
  name: 'SortAndFilter',
  components: {
    LinksAndSocial,
    ActiveTags,
    SearchCategoriesAndTags,
  },
  props: {
    tags: {
      type: Array,
      required: true,
    },
    numberOfPosts: {
      type: Number,
      required: true,
    },
    blockLazyLoad: {
      type: Function,
      default: null,
    },
  },
}
</script>
