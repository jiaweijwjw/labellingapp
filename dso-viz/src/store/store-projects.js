import ProjectService from '../services/project.service'

const state = {
  projects: []
}

const mutations = {
  createProject (state, payload) {
    state.projects.push(payload)
    console.log(state.projects)
  },
  updateProjectList (state, payload) {
    state.projects = payload.slice()
    console.log('fuck')
    console.log(state.projects)
  }
}

const actions = {
  createProject ({ commit }, payload) {
    ProjectService.createProject(payload)
      .then((response) => {
        console.log(response.data)
        commit('createProject', response.data)
      })
      .catch((error) => {
        alert(error)
      })
  },
  getProjectList ({ commit }, token) {
    ProjectService.getProjectList(token)
      .then((res) => {
        commit('updateProjectList', res.data)
        // return res.data
      })
      .catch((err) => {
        alert(err)
      })
  }
}

const getters = {
  projects: (state) => {
    return state.projects
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
