import LabelService from '../services/label.service'

const state = {
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

const mutations = {
  createLabel (state, payload) {
    state.labels.push(payload)
  },
  deleteLabels (state, payload) {
    // for filter, whatever is true will be in the new array
    state.labels = state.labels.filter(label => {
      if (!payload.includes(label.id)) { // if the proj is not in the list of projs to be deleted, keep it
        return true
      }
    })
  },
  updateLabelList (state, payload) {
    state.labels = payload.slice()
  }
}

const actions = {
  setLabels ({ commit }, labels) {
    commit('updateLabelList', labels)
  },
  createLabel ({ commit }, payload) {
    LabelService.createLabel(payload.token, payload.newLabel)
      .then(res => {
        commit('createLabel', res.data)
      })
  },
  deleteSelectedLabels ({ commit }, payload) {
    LabelService.deleteLabels(payload.token, payload.selectedLabelsId)
      .then((res) => {
        commit('deleteLabels', payload.selectedLabelsId)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getLabelList ({ commit }, token) {
    LabelService.getLabelList(token)
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
