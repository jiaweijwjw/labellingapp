// import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  start: 0, // start of selection
  end: 0, // end of selection
  inputText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  current: 0,
  documents: [
    {
      id: '1',
      text: 'Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.',
      annotations: [
        // {
        //   id: 1,
        //   prob: 0.0,
        //   label: '1',
        //   start_offset: 0,
        //   end_offset: 10,
        //   user: 1,
        //   document: 8
        // }
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
  updateStartEnd (state, payload) {
    state.start = payload.start
    state.end = payload.end
  },
  deleteAnnotation (state, payload) {
    console.log(payload.annotationId)
    console.log(payload.documentId)
    var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    console.log(index)
    var annotationIndex = state.documents[index].annotations.map(item => item.id).indexOf(payload.annotationId)
    console.log(annotationIndex)
    ~annotationIndex && state.documents[index].annotations.splice(annotationIndex, 1)
  },
  addAnnotation (state, payload) {
    var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    console.log(index)
    let annotation = {
      id: payload.annotationId,
      prob: 0.0,
      label: payload.label,
      start_offset: payload.start_offset,
      end_offset: payload.end_offset
      // user: 1,
      // document: 8
    }
    state.documents[index].annotations.push(annotation)
  },
  updateAnnotation (state, payload) {
    const document = state.documents[state.current].annotations.find(item => item.id === payload.annotationId)
    Object.assign(document, payload)
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
  updateStartEnd ({ commit }, selectionStartEnd) {
    commit('updateStartEnd', selectionStartEnd)
  },
  deleteAnnotation ({ commit, state }, annotationId) {
    const documentId = state.documents[state.current].id
    let payload = {
      // id: labelId,
      annotationId: annotationId,
      documentId: documentId
    }
    commit('deleteAnnotation', payload)
  },
  addAnnotation ({ commit, state }, details) {
    const documentId = state.documents[state.current].id
    let annotationId = uid()
    let payload = {
      start_offset: details.start_offset,
      end_offset: details.end_offset,
      label: details.label,
      documentId: documentId,
      annotationId: annotationId
    }
    commit('addAnnotation', payload)
  },
  updateAnnotation ({ commit, state }, obj) {
    // const documentId = state.documents[state.current].id
    let payload = {
      // documentId: documentId,
      label: obj.labelId,
      annotationId: obj.annotationId
    }
    commit('updateAnnotation', payload)
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
