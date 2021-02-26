const state = {
  loginStatus: false,
  access_token: '',
  currentUserId: null
}

const mutations = {
  updateLoginStatus (state, payload) {
    state.loginStatus = payload
  },
  updateAccessToken (state, payload) {
    state.access_token = payload
  }
}

const actions = {
  updateLoginStatus ({ commit }, status) {
    commit('updateLoginStatus', status)
  },
  updateAccessToken ({ commit }, status) {
    commit('updateAccessToken', status)
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
