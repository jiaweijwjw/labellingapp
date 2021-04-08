import LabelService from '../services/label.service'

const defaultState = () => {
  return {
    labels: [],
    templateLabels: [
      {
        id: 'a',
        name: 'Person',
        shortcutkey: 'p',
        color: '#3ae8ce'
      }
    ]
  }
}
const state = defaultState()

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState())
  },
  createLabel (state, label) {
    state.labels.push(label)
  },
  deleteLabels (state, selectedLabelsId) {
    // for filter, whatever is true will be in the new array
    state.labels = state.labels.filter(label => {
      if (!selectedLabelsId.includes(label.id)) { // if the proj is not in the list of projs to be deleted, keep it
        return true
      }
    })
  },
  updateLabelList (state, payload) {
    state.labels = payload.slice()
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  setLabels ({ commit }, labels) {
    commit('updateLabelList', labels)
  },
  createLabel ({ commit }, newLabel) {
    LabelService.createLabel(newLabel)
      .then(res => {
        commit('createLabel', res.data)
      })
  },
  deleteSelectedLabels ({ commit, dispatch }, selectedLabelsId) {
    LabelService.deleteLabels(selectedLabelsId)
      .then((res) => {
        commit('deleteLabels', selectedLabelsId)
        dispatch('documents/getDocumentList', { root: true })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getLabelList ({ commit }) {
    LabelService.getLabelList()
      .then(res => {
        commit('updateLabelList', res.data)
      })
  }
}

const getters = {
  labels: (state) => {
    return state.labels
  },
  shortcutkeys () {
    return 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
