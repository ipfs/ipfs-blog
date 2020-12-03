<template>
  <div
    v-if="name"
    itemprop="publisher author"
    itemtype="http://schema.org/Person"
    itemscope
    class="flex items-center"
  >
    <Avatar v-if="avatar || svgIcon" v-bind="$props" class="mr-2 bg-plBlack" />
    <span itemprop="name" class="whitespace-no-wrap">{{ name }}</span>
  </div>
</template>

<script>
import Avatar from '@theme/components/base/Avatar'
import Author from '@theme/components/mixins/Author'

export default {
  name: 'PostAuthor',
  components: { Avatar },
  mixins: [Author],
}
</script>

<style scoped>
.avatar {
  height: 2.3em;
  width: 2.3em;
}
</style>
