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
//   setFastMode (state, mode) {
//     state.fastMode = mode
//   },
//   setFocusMode (state, mode) {
//     state.focusMode = mode
//   }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  setAnnotationSettings ({ commit }, settingsArr) {
    commit('setAnnotationSettings', settingsArr)
  }
//   setFastMode ({ commit }, mode) { // mode is boolean value
//     commit('setFastMode', mode)
//   },
//   setFocusMode ({ commit }, mode) {
//     commit('setFocusMode', mode)
//   }
}

const getters = {
  getAnnotationSettings: (state) => {
    return state.annotationSettings
  },
  getFastMode: (state) => {
    return state.annotationSettings.includes('fast')
  },
  getFocusMode: (state) => {
    return state.annotationSettings.includes('focus')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
