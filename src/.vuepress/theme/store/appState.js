import Vue from 'vue'

const appState = {
  namespaced: true,
  state: {
    mobileNavActive: false,
    routerLocation: {},
    navHeight: 0,
    activeTags: [],
    searchedText: [],
    activeCategory: null,
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
    setActiveTags: (state, data) => {
      Vue.set(state, 'activeTags', data)
    },
    setSearchedText: (state, data) => {
      Vue.set(state, 'searchedText', data)
    },
    setActiveCategory: (state, data) => {
      Vue.set(state, 'activeCategory', data)
    },
  },
}

export default appState
