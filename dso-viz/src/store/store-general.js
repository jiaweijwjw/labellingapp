import GeneralService from '../services/general.service'

const state = {
  access_token: '',
  username: '',
  currentUserId: null,
  currentProjId: null,
  currentDocId: null
}

const mutations = {
  clearUserDetails (state) {
    state.access_token = ''
    state.username = ''
    state.currentUserId = null
    state.currentProjId = null
    state.currentDocId = null
  },
  updateAccessToken (state, payload) {
    state.access_token = payload
  },
  updateUserDetails (state, payload) {
    state.username = payload.username
    state.currentUserId = payload.currentUserId
    state.currentProjId = payload.currentProjId
    state.currentDocId = payload.currentDocId
  },
  updateCurrentProjId (state, payload) {
    state.currentProjId = payload.id
  }
}

const actions = {
  clearUserDetails ({ commit }) {
    commit('clearUserDetails')
  },
  updateAccessToken ({ commit }, status) {
    commit('updateAccessToken', status)
  },
  updateUserDetails ({ commit }, userDetails) {
    commit('updateUserDetails', userDetails)
  },
  updateCurrentProjId ({ commit }, payload) {
    GeneralService.updateCurrentProjId(payload.token, payload.details)
      .then((res) => {
        commit('updateCurrentProjId', payload.details)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const getters = {
  getAccessToken: (state) => {
    return state.access_token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
