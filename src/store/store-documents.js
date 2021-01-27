// import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  inputText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  current: 0,
  documents: [
    {
      id: '1',
      text: 'Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.',
      annotations: [
        {
          id: 1,
          prob: 0.0,
          label: '1',
          start_offset: 0,
          end_offset: 10,
          user: 1,
          document: 8
        },
        {
          id: 2,
          prob: 0.0,
          label: '2',
          start_offset: 11,
          end_offset: 30,
          user: 1,
          document: 8
        }
      ]
    }
  ]
}

const mutations = {
  addDocument (state, payload) {
    state.documents.push(payload.document)
    // Vue.set(state.CustomLabelBtns, payload.id, payload.label)
    // Vue.set(object, propertyName, value)
  },
  updateInputText (state, payload) {
    state.inputText = payload
  },
  deleteAnnotation (state, payload) {
    console.log(payload.annotationId)
    console.log(payload.documentId)
    // let document = state.documents.find(o => o.name === payload.documentID)
    // let index = state.documents.indexOf(document)
    // console.log(document.annotations)
    // console.log(state.documents[index].annotations)
    // state.documents[payload.documentId].annotations = state.documents[payload.documentId].annotations.filter(item => item.id !== payload.annotationId)
    var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    console.log(index)
    var annotationIndex = state.documents[index].annotations.map(item => item.id).indexOf(payload.annotationId)
    console.log(annotationIndex)
    ~annotationIndex && state.documents[index].annotations.splice(annotationIndex, 1)
    // state.documents[index].annotations.filter(item => item.id !== payload.annotationId)
    // this.currentDoc.annotations = this.currentDoc.annotations.filter(item => item.id !== annotationId)
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
  },
  deleteAnnotation ({ commit, state }, annotationId) {
    const documentId = state.documents[state.current].id
    let payload = {
      // id: labelId,
      annotationId: annotationId,
      documentId: documentId
    }
    commit('deleteAnnotation', payload)
  }
}

const getters = {
  documents: (state) => {
    return state.documents
  },
  currentDoc (state) {
    return state.documents[state.current]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
