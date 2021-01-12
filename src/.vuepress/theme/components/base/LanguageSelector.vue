<template>
  <div class="flex">
    <div
      v-for="(locale, _, index) in $site.locales"
      :key="locale.lang"
      :to="locale.path"
      class="flex"
    >
      {{ index !== 0 ? ' | ' : '' }}
      <UnstyledLink
        v-if="$localePath !== locale.path"
        class="text-blueGreen hover:underline mx-1"
        :to="locale.path"
        >{{ locale.lang }}</UnstyledLink
      >
      <div v-else class="mx-1">{{ locale.lang }}</div>
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
