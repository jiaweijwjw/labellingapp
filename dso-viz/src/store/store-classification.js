
const defaultState = () => {
  return {
    classifyBtns: [
      {
        id: 1,
        name: 'positive',
        shortcutkey: 'arrowup',
        color: '#7ffc03'
      },
      {
        id: 2,
        name: 'negative',
        shortcutkey: 'arrowdown',
        color: '#fc3503'
      }
    ]
  }
}

const state = defaultState()

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState())
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  }
}

const getters = {
  classifyBtns: (state) => {
    return state.classifyBtns
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
