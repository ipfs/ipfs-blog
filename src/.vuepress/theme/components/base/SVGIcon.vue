<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
    :role="ariaHide ? 'presentation' : 'img'"
    :aria-labelledby="ariaHide ? '' : `svg-title--${name}`"
    :aria-hidden="ariaHide ? 'true' : 'false'"
    :viewBox="icon.viewBox"
  >
    <title v-if="!ariaHide" :id="`svg-title--${name}`">{{ title }}</title>
    <use
      :xlink:href="`#${icon.id}`"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    classList: {
      type: Array,
      default: () => [],
    },
    ariaHide: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    icon() {
      /* eslint-disable import/no-dynamic-require */
      /* eslint-disable global-require */
      let icon = require(`@theme/svg-icon/${this.name}.svg`)
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default
      }
      return icon
    },

    className() {
      const classList = [
        'svg-icon',
        `svg-icon--${this.name}`,
        ...this.classList,
      ]

      return classList.join(' ')
    },
  },
}
</script>
