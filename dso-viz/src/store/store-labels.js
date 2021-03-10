// import Vue from 'vue'
import { uid } from 'quasar'
import LabelService from '../services/label.service'

const state = {
  labels: [
    {
      id: '1',
      name: 'Person',
      shortcutkey: 'p',
      color: '#3ae8ce'
    },
    {
      id: '2',
      name: 'Location',
      shortcutkey: 'l',
      color: '#b32db5'
    },
    {
      id: '3',
      name: 'Date',
      shortcutkey: 'd',
      color: '#005c2e'
    },
    {
      id: '4',
      name: 'Organization',
      shortcutkey: 'o',
      color: '#000000'
    },
    {
      id: '5',
      name: 'Country',
      shortcutkey: 'c',
      color: '#f0bc13'
    }
  ]
}

const mutations = {
  addLabel (state, payload) {
    state.labels.push(payload.label)
    // Vue.set(state.Customlabels, payload.id, payload.label)
    // Vue.set(object, propertyName, value)
  },
  createLabel (state, payload) {
    state.labels.push(payload)
  },
  updateLabelList (state, payload) {
    let labelsFromDB = payload.slice()
    state.labels = state.labels.concat(labelsFromDB)
    console.log(state.labels)
    console.log(labelsFromDB)
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
