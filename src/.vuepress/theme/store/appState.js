import Vue from 'vue'

const appState = {
  namespaced: true,
  state: {
    mobileNavActive: false,
    routerLocation: {},
    navHeight: 0,
  },
  mutations: {
    toggleMobileNav: (state, data) => {
      Vue.set(state, 'mobileNavActive', data)
    },
    setNavHeight: (state, data) => {
      Vue.set(state, 'navHeight', data)
    },
    setRouterLocation: (state, data) => {
      Vue.set(state, 'routerLocation', data)
    },
  },
}

export default appState
