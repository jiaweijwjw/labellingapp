import GeneralService from '../services/general.service'

const util = require('util')

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
  updateCurrentProjId (state, newId) {
    state.currentProjId = newId
  },
  updateCurrentDocId (state, newId) {
    state.currentDocId = newId
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
  },
  updateCurrentDocId ({ commit }, payload) {
    GeneralService.updateCurrentDocId(payload.token, payload.details)
      .then((res) => {
        commit('updateCurrentDocId', payload.details.id)
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
  },
  currentDocId: (state) => {
    return state.currentDocId
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
