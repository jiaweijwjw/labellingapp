const defaultState = () => {
  return {
    annotationSettings: []
  }
}

const state = defaultState()

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState())
  },
  setAnnotationSettings (state, settingsArr) {
    state.annotationSettings = settingsArr
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  setAnnotationSettings ({ commit }, settingsArr) {
    commit('setAnnotationSettings', settingsArr)
  }
}

const getters = {
  getAnnotationSettings: (state) => {
    return state.annotationSettings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
