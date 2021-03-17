import GeneralService from '../services/general.service'

const util = require('util')

const state = {
  access_token: '',
  username: '',
  currentUserId: null,
  currentProjId: null
}

const mutations = {
  clearUserDetails (state) {
    state.access_token = ''
    state.username = ''
    state.currentUserId = null
    state.currentProjId = null
  },
  updateAccessToken (state, payload) {
    state.access_token = payload
  },
  updateUserDetails (state, payload) {
    state.username = payload.username
    state.currentUserId = payload.currentUserId
    state.currentProjId = payload.currentProjId
  },
  updateCurrentProjId (state, newId) {
    state.currentProjId = newId
  }
}

const actions = {
  clearUserDetails ({ commit }) {
    commit('clearUserDetails')
  },
  updateAccessToken ({ commit }, newToken) {
    commit('updateAccessToken', newToken)
  },
  updateUserDetails ({ commit }, userDetails) {
    commit('updateUserDetails', userDetails)
  },
  updateCurrentProjId ({ commit }, payload) {
    // INPUT:
    // let details = { id: rowProj.id }
    // let payload = { token: this.access_token, details: details }
    GeneralService.updateCurrentProjId(payload.token, payload.details)
      .then((res) => {
        commit('updateCurrentProjId', payload.details.id)
        console.log(util.inspect(res.data, false, null, true /* enable colors */)) // to view [object]
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
