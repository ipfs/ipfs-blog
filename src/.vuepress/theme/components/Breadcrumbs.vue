<template>
  <div v-if="crumbs" class="flex">
    <div v-for="(crumb, index) in crumbs" :key="crumb.title">
      <span v-if="index != 0">|</span>
      <div class="inline mr-1">
        <UnstyledLink
          v-if="crumb.link"
          class="text-blueGreen hover:underline"
          :external="crumb.external"
          :to="crumb.link"
        >
          {{ crumb.title }}
        </UnstyledLink>
        <span v-else>{{ crumb.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import UnstyledLink from '@theme/components/UnstyledLink'

export default {
  name: 'Breadcrumbs',
  components: {
    UnstyledLink,
  },
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
}
</script>
