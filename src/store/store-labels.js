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
      name: 'Organization',
      shortcutkey: 'o',
      color: 'blue'
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
