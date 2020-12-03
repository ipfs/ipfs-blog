export default {
  mounted() {
    // track outbound clicks
    document.addEventListener('click', this.trackOutbound)
  },
  beforeDestroy() {
    // remove on unmount
    document.removeEventListener('click', this.trackOutbound)
  },
  methods: {
    trackOutbound(e) {
      if (!window.ga) return
      const link = e.target.closest('a')
      if (link === null || window.location.host === link.host) return
      window.ga('send', 'event', 'outbound', 'click', link.href)
    },
  },
}
