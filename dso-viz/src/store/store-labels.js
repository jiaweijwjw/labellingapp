// import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  LabelBtns: [
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
    state.LabelBtns.push(payload.label)
    // Vue.set(state.CustomLabelBtns, payload.id, payload.label)
    // Vue.set(object, propertyName, value)
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
  }
}

const getters = {
  labels: (state) => {
    return state.LabelBtns
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
