import { isExternal, isMailto, isTel, ensureExt } from '../../util'

export default {
  computed: {
    link() {
      return ensureExt(this.to ? this.to : this.item.link)
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          (rootLink) => rootLink === this.link
        )
      }
      return this.link === '/'
    },

    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link)
    },

    isBlankTarget() {
      return this.target === '_blank'
    },

    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget
    },

    target() {
      if (!this.item || this.isNonHttpURI) {
        return null
      }
      if (this.item.target) {
        return this.item.target
      }
      return isExternal(this.link) ? '_blank' : ''
    },

    rel() {
      if (!this.item || this.isNonHttpURI) {
        return null
      }
      if (this.item.rel) {
        return this.item.rel
      }
      return this.isBlankTarget ? 'noopener noreferrer' : ''
    },
  },

  methods: {
    // TODO: this is temporary and can be removed when router-link upgrades to v4 (https://github.com/vuejs/vue-router/issues/1668)
    handleAnchorClick(e) {
      // check if is not an anchor link
      const hash = e.target.hash
      if (hash) {
        const targetElement = document.querySelector(hash)

        if (targetElement) {
          e.preventDefault()
          window.scrollTo({ top: targetElement.offsetTop })
        }
      }
    },
  },
}
