export default {
  methods: {
    withBase: function (path = '') {
      const { $withBase } = this.$root
      return path.charAt(0) === '/' ? $withBase.call(this, path) : path
    },
  },
}
