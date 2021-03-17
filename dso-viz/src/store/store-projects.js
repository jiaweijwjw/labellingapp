import ProjectService from '../services/project.service'

const state = {
  projects: []
}

const mutations = {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
