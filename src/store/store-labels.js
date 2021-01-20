// import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  LabelBtns: [
    {
      name: 'Person',
      shortcutkey: 'p',
      color: 'pink'
    },
    {
      name: 'Location',
      shortcutkey: 'l',
      color: 'purple'
    },
    {
      name: 'Date',
      shortcutkey: 'd',
      color: 'black'
    },
    {
      name: 'Organisation',
      shortcutkey: 'o',
      color: 'blue'
    }
  ],
  CustomLabelBtns: []
}

const mutations = {
  addCustomLabel (state, payload) {
    state.CustomLabelBtns.push(payload.label)
    // Vue.set(state.CustomLabelBtns, payload.id, payload.label)
    // Vue.set(object, propertyName, value)
  }
}

const actions = {
  addCustomLabel ({ commit }, newLabel) {
    // let labelId = uid()
    newLabel.id = uid()
    let payload = {
      // id: labelId,
      label: newLabel
    }
    commit('addCustomLabel', payload)
  }
}

const getters = {
  labels: (state) => {
    return state.LabelBtns
  },
  customLabels: (state) => {
    return state.CustomLabelBtns
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
