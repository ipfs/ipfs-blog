import Vue from 'vue'

const appState = {
  namespaced: true,
  state: {
    mobileNavActive: false,
    routerLocation: {},
    navHeight: 0,
    activeTags: [],
    searchedText: [],
    categoriesList: [],
    tagsList: [],
    authorsList: [],
    activeCategory: '',
    activeAuthor: '',
    latestWeeklyPost: null,
    videoModalCard: null,
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
    setTagsList: (state, data) => {
      Vue.set(state, 'tagsList', data)
    },
    setActiveTags: (state, data) => {
      Vue.set(state, 'activeTags', data)
    },
    addNewTag: (state, data) => {
      Vue.set(state, 'activeTags', [...new Set([...state.activeTags, ...data])])
    },
    setSearchedText: (state, data) => {
      Vue.set(state, 'searchedText', data)
    },
    setCategoriesList: (state, data) => {
      Vue.set(state, 'categoriesList', data)
    },
    setActiveCategory: (state, data) => {
      Vue.set(state, 'activeCategory', data)
    },
    setAuthorsList: (state, data) => {
      Vue.set(state, 'authorsList', data)
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
      Vue.set(state, 'activeCategory', '')
      Vue.set(state, 'activeAuthor', '')
    },
    setVideoModalCard: (state, card) => {
      Vue.set(state, 'videoModalCard', card)
    },
  },
}

export default appState
