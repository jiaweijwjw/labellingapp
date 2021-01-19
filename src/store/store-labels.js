import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  LabelBtns: {
    'id1': {
      name: 'Person',
      color: 'pink'
    },
    'id2': {
      name: 'Location',
      color: 'pink-2'
    },
    'id3': {
      name: 'Date',
      color: 'pink-3'
    },
    'id4': {
      name: 'Organisation',
      color: 'pink-4'
    },
    'id5': {
      name: 'Filler1',
      color: 'pink-5'
    },
    'id6': {
      name: 'Filler2',
      color: 'pink-6'
    }
  },
  CustomLabelBtns: {}
}

const mutations = {
  addCustomLabel (state, payload) {
    Vue.set(state.CustomLabelBtns, payload.id, payload.label)
    // Vue.set(object, propertyName, value)
  }
}

const actions = {
  addCustomLabel ({ commit }, newLabel) {
    let labelId = uid()
    let payload = {
      id: labelId,
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
