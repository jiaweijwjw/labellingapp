import GeneralService from '../services/general.service'
import AuthService from '../services/auth.service'
import TokenService from '../services/token.service'

const util = require('util')

const defaultState = () => {
  return {
    access_token: '',
    loggedIn: false,
    username: '',
    currentUserId: null,
    currentProjId: null
  }
}

const state = defaultState()

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState())
  },
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
    if (newId === -1) {
      state.currentProjId = null
    } else {
      state.currentProjId = newId
    }
  },
  updateLoggedIn (state, val) {
    state.loggedIn = val
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
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
    return new Promise((resolve, reject) => {
      GeneralService.updateCurrentProjId(payload.token, payload.details)
        .then((res) => {
          commit('updateCurrentProjId', payload.details.id)
          resolve(res)
          console.log(util.inspect(res.data, false, null, true /* enable colors */)) // to view [object]
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  updateLoggedIn ({ commit }, val) {
    commit('updateLoggedIn', val)
  },
  renewAccessToken ({ commit, state }) {
    console.log('dispatch renewAccessToken')
    return new Promise((resolve, reject) => {
      AuthService.renewAccessToken(state.currentUserId)
        .then(res => {
          let newToken = res.data.access_token
          TokenService.setToken(newToken)
          resolve(newToken)
        }, err => { reject(err) })
    })
  }
}

const getters = {
  getAccessToken: (state) => {
    return state.access_token
  },
  currentUserId: (state) => {
    return state.currentUserId
  },
  currentProjId: (state) => {
    return state.currentProjId
  },
  getLoggedIn: (state) => {
    return state.loggedIn
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
