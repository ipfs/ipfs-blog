<template>
  <div
    class="avatar rounded-full overflow-hidden flex items-center justify-center"
  >
    <SVGIcon
      v-if="svgIcon"
      :name="svgIcon"
      :title="name"
      :class-list="['svg-icon', 'fill-current', 'text-white', 'w-1/2', 'h-1/2']"
    />
    <LazyImage
      v-else-if="avatar"
      class="avatar-image"
      :src="avatar"
      ctx="_assets/avatars/"
      :alt="name"
    />
  </div>
</template>

<script>
import Author from '@theme/components/mixins/Author'
import LazyImage from '@theme/components/base/LazyImage'
import SVGIcon from '@theme/components/base/SVGIcon'

export default {
  name: 'Avatar',
  components: { LazyImage, SVGIcon },
  mixins: [Author],
}
</script>
