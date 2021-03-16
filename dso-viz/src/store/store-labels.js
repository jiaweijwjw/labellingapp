// import Vue from 'vue'
import { uid } from 'quasar'
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
  addLabel (state, payload) {
    state.labels.push(payload.label)
  },
  createLabel (state, payload) {
    state.labels.push(payload)
  },
  updateLabelList (state, payload) {
    state.labels = payload.slice()
    // let labelsFromDB = payload.slice()
    // state.labels = state.labels.concat(labelsFromDB)
  },
  deleteLabels (state, payload) {
    // for filter, whatever is true will be in the new array
    state.labels = state.labels.filter(label => {
      if (!payload.includes(label.id)) { // if the proj is not in the list of projs to be deleted, keep it
        return true
      }
    })
  }
}

const actions = {
  setLabels ({ commit }, labels) {
    commit('updateLabelList', labels)
  },
  addLabel ({ commit }, newLabel) {
    // let labelId = uid()
    newLabel.id = uid()
    let payload = {
      // id: labelId,
      label: newLabel
    }
    commit('addLabel', payload)
  },
  createLabel ({ commit }, payload) {
    LabelService.createLabel(payload.token, payload.newLabel)
      .then(res => {
        commit('createLabel', res.data)
      })
  },
  getLabelList ({ commit }, token) {
    LabelService.getLabelList(token)
      .then(res => {
        commit('updateLabelList', res.data)
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
