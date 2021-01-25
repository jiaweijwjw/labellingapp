// import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  InputText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  Documents: [
    {
      id: '1',
      text: 'Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.',
      annotations: [
        {
          id: 17,
          prob: 0.0,
          label: 4,
          start_offset: 60,
          end_offset: 70,
          user: 1,
          document: 8
        }
      ]
    }
  ]
}

const mutations = {
  addDocument (state, payload) {
    state.Documents.push(payload.document)
    // Vue.set(state.CustomLabelBtns, payload.id, payload.label)
    // Vue.set(object, propertyName, value)
  },
  updateInputText (state, payload) {
    state.InputText = payload
  }
}

const actions = {
  addDocument ({ commit }, newDocument) {
    // let labelId = uid()
    newDocument.id = uid()
    let payload = {
      // id: labelId,
      document: newDocument
    }
    commit('addDocument', payload)
  },
  updateInputText ({ commit }, userInputText) {
    commit('updateInputText', userInputText)
  }
}

const getters = {
  documents: (state) => {
    return state.Documents
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
