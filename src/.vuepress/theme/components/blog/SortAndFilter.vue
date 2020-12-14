<template>
  <div class="grid-margins opacity-85">
    <LinksAndSocial />
    <SearchCategoriesAndTags
      class="mt-2"
      :tags="tags"
      :categories="categories"
    />
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
    categories: {
      type: Array,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    numberOfPosts: {
      type: Number,
      required: true,
    },
  },
}
</script>
