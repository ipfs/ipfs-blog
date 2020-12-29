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
    activeAuthor: null,
    latestWeeklyPost: null,
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
    setActiveAuthor: (state, data) => {
      Vue.set(state, 'activeAuthor', data)
    },
    setLatestWeeklyPost: (state, data) => {
      Vue.set(state, 'latestWeeklyPost', data)
    },
    clearFilters: (state) => {
      Vue.set(state, 'activeTags', [])
      Vue.set(state, 'searchedText', [])
      Vue.set(state, 'activeCategory', null)
      Vue.set(state, 'activeAuthor', null)
    },
  },
}

export default appState
