<template>
  <div class="flex">
    <div
      v-for="locale in $site.locales"
      :key="locale.lang"
      :to="locale.path"
      class="flex"
    >
      <UnstyledLink
        v-if="$localePath !== locale.path"
        class="text-blueGreen hover:underline mx-2 text-sm"
        :to="locale.path"
        >{{ locale.lang }}</UnstyledLink
      >
      <div v-else class="mx-2 text-sm">{{ locale.lang }}</div>
    </div>
  </div>
</template>

<script>
import UnstyledLink from '@theme/components/UnstyledLink'

export default {
  name: 'LanguageSelector',
  components: {
    UnstyledLink,
  },
  props: {},
}
</script>
