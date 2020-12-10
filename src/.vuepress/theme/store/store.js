import Vuex from 'vuex'
import appState from './appState'

const store = {
  modules: {
    appState,
  },
}

export const createStore = (moduleState = {}) => {
  const modifiedState = Object.assign({}, store)

  Object.keys(moduleState).forEach((key) => {
    const data = moduleState[key]
    modifiedState.modules[key].state = data
  })

  return new Vuex.Store(modifiedState)
}
