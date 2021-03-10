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
  }
}

const actions = {
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
