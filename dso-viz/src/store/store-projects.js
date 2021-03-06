import ProjectService from '../services/project.service'

const projectTypeEnum = Object.freeze({ 'Sequence Labelling': 1, 'Document Classification': 2 })

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
  deleteProjects (state, selectedProjsId) {
    // for filter(), whatever is true will be in the new array
    state.projects = state.projects.filter(proj => {
      if (!selectedProjsId.includes(proj.id)) { // if the proj is not in the list of projs to be deleted, keep it
        return true
      }
    })
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
  deleteSelectedProjects ({ commit, rootGetters, dispatch }, selectedProjsId) {
    ProjectService.deleteProjects(selectedProjsId)
      .then((res) => {
        commit('deleteProjects', selectedProjsId)
      })
      .then(() => {
        let currentProjId = rootGetters['general/currentProjId']
        let isCurrentProjDeleted = () => {
          if (selectedProjsId.includes(currentProjId)) {
            return true
          } else { return false }
        }
        if (isCurrentProjDeleted) {
          let details = { id: -1 }
          dispatch('general/updateCurrentProjId', details, { root: true })
            .then(() => {
              dispatch('documents/resetState', '', { root: true })
            })
        }
      })
  },
  getProjectList ({ commit }) {
    ProjectService.getProjectList()
      .then((res) => {
        console.log('res: ' + res)
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
  getProjectTypes: (state) => {
    var projectTypeArr = Object.keys(projectTypeEnum)
    return projectTypeArr
  },
  currentProjName: (state, getters, rootState, rootGetters) => {
    let currentProjId = rootGetters['general/currentProjId']
    if (currentProjId === null) {
      console.log('currentprojid is null already')
      return null
    } else {
      console.log('currentprojid is not yet null when it is supposed to be')
      const proj = state.projects.find(proj => proj.id === currentProjId)
      return proj ? proj.name : null
    }
  },
  currentProjType: (state, getters, rootState, rootGetters) => { // same implementation as currentProjName but different code
    let currentProjId = rootGetters['general/currentProjId']
    const proj = state.projects.find(proj => proj.id === currentProjId)
    return currentProjId && proj ? proj.proj_type : null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
