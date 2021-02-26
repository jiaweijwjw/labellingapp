import ProjectService from '../services/project.service'

const state = {
  projects: []
}

const mutations = {
  createProject (state, payload) {
    state.projects.push(payload.document)
  }
}

const actions = {
  createProject ({ commit }, payload) {
    ProjectService.createProject(payload)
      .then((response) => {
        console.log(response.data)
        // commit('createProject', response.data)
      })
      .catch((error) => {
        alert(error)
      })
    // let payload = {
    //   project: newProject
    // }
    // commit('createProject', payload)
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
