import ProjectService from '../services/project.service'

const defaultState = () => {
  return {
    projects: []
  }
}

const state = defaultState()

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState())
  },
  createProject (state, payload) {
    state.projects.push(payload)
  },
  deleteProjects (state, payload) {
    // for filter(), whatever is true will be in the new array
    state.projects = state.projects.filter(proj => {
      if (!payload.includes(proj.id)) { // if the proj is not in the list of projs to be deleted, keep it
        return true
      }
    })
    console.log(state.projects)
  },
  updateProjectList (state, payload) {
    state.projects = payload.slice()
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  setProjects ({ commit }, projects) {
    commit('updateProjectList', projects)
  },
  createProject ({ commit }, payload) {
    ProjectService.createProject(payload)
      .then((response) => {
        console.log(response.data)
        commit('createProject', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  deleteSelectedProjects ({ commit }, payload) {
    ProjectService.deleteProjects(payload.token, payload.selectedProjsId)
      .then((res) => {
        commit('deleteProjects', payload.selectedProjsId)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getProjectList ({ commit }, token) {
    ProjectService.getProjectList(token)
      .then((res) => {
        commit('updateProjectList', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const getters = {
  projects: (state) => {
    return state.projects
  },
  currentProjName: (state, getters, rootState, rootGetters) => {
    let currentProjId = rootGetters['general/currentProjId']
    const proj = state.projects.find(proj => proj.id === currentProjId)
    return currentProjId ? proj.name : ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
