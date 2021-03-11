// import Vue from 'vue'
import { uid } from 'quasar'
import DocumentService from '../services/document.service'
import AnnotationService from '../services/annotation.service'

const state = {
  start: 0, // start of selection
  end: 0, // end of selection
  inputText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  current: null,
  selected: [],
  documents: []
  // documents: [
  //   {
  //     id: '1',
  //     name: 'sample text',
  //     isMarked: false,
  //     text: 'Batman is a superhero who appears                  in American comic booksssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.' +
  //       '\n' + '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + '\n' + 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test',
  //     annotations: [
  //       // {
  //       //   id: 1,
  //       //   prob: 0.0,
  //       //   label: '1',
  //       //   start_offset: 0,
  //       //   end_offset: 10,
  //       //   user: 1,
  //       //   document: 8
  //       // }
  //     ]
  //   }
  // ]
}

const mutations = {
  // addDocument (state, payload) {
  //   state.documents.push(payload.document)
  //   // Vue.set(state.CustomLabelBtns, payload.id, payload.label)
  //   // Vue.set(object, propertyName, value)
  // },
  updateCurrent (state, payload) {
    state.current = payload
  },
  updateSelectedDocs (state, payload) {
    state.selected = payload
  },
  updateInputText (state, payload) {
    state.inputText = payload
  },
  updateDocStatus (state, payload) {
    const document = state.documents.find(doc => doc.id === payload.documentId)
    document.isMarked = payload.newStatus
  },
  updateStartEnd (state, payload) {
    state.start = payload.start
    state.end = payload.end
  },
  deleteAnnotation (state, deletedEntity) {
    var index = state.documents.map(item => item.id).indexOf(deletedEntity.document_id)
    var annotationIndex = state.documents[index].annotations.map(item => item.id).indexOf(deletedEntity.id)
    ~annotationIndex && state.documents[index].annotations.splice(annotationIndex, 1)
  },
  addAnnotation (state, payload) {
    var index = state.documents.map(item => item.id).indexOf(payload.document_id)
    // let annotation = {
    //   id: payload.id,
    //   label: payload.label,
    //   start_offset: payload.start_offset,
    //   end_offset: payload.end_offset
    // }
    let annotation = Object.assign(payload)
    state.documents[index].annotations.push(annotation)
  },
  updateAnnotation (state, editedEntity) {
    const document = state.documents.find(doc => doc.id === editedEntity.document_id)
    const annotation = document.annotations.find(item => item.id === editedEntity.annotation_id)
    // var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    Object.assign(annotation, editedEntity)
  },
  addDocument (state, payload) {
    state.documents.push(payload)
    console.log(state.documents)
  },
  updateDocumentList (state, payload) {
    state.documents = payload.slice()
    console.log(state.documents)
  },
  deleteDocuments (state, payload) {
    // for filter, whatever is true will be in the new array
    state.documents = state.documents.filter(doc => {
      if (!payload.includes(doc.id)) { // if the doc is not in the list of docs to be deleted, keep it
        return true
      }
    })
    console.log(state.documents)
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
  updateCurrent ({ commit }, currentDoc) {
    commit('updateCurrent', currentDoc)
  },
  updateSelectedDocs ({ commit }, selection) {
    commit('updateSelectedDocs', selection)
  },
  updateInputText ({ commit }, userInputText) {
    commit('updateInputText', userInputText)
  },
  updateDocStatus ({ commit }, payload) {
    commit('updateDocStatus', payload)
  },
  updateStartEnd ({ commit }, selectionStartEnd) {
    commit('updateStartEnd', selectionStartEnd)
  },
  deleteAnnotation ({ commit, state, rootGetters }, details) {
    // const documentId = state.documents.find(doc => doc.id === state.current).id
    const documentId = rootGetters['general/currentDocId']
    AnnotationService.deleteAnnotation(details.token, documentId, details.annotationId)
      .then(res => {
        commit('deleteAnnotation', res.data)
      })
  },
  addAnnotation ({ commit, state, rootGetters }, details) {
    // const documentId = state.documents.find(doc => doc.id === state.current).id
    const documentId = rootGetters['general/currentDocId']
    console.log(documentId)
    let payload = {
      start_offset: details.start_offset,
      end_offset: details.end_offset,
      label_id: details.label_id
    }
    AnnotationService.addAnnotation(payload, details.token, documentId)
      .then(res => {
        commit('addAnnotation', res.data)
      })
  },
  updateAnnotation ({ commit, state, rootGetters }, details) {
    const documentId = rootGetters['general/currentDocId']
    const annotationId = details.annotationId
    // let payload = {
    //   label_id: details.newLabelId,
    //   annotation_id: details.annotationId
    // }
    AnnotationService.updateAnnotation(details.token, documentId, annotationId, details.newLabelId)
      .then(res => {
        commit('updateAnnotation', res.data)
      })
  },
  uploadDocument ({ commit }, files) {
    commit('addDocument', files)
  },
  getDocumentList ({ commit }, token) {
    DocumentService.getDocumentList(token)
      .then((res) => {
        commit('updateDocumentList', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteSelectedDocuments ({ commit }, payload) {
    DocumentService.deleteDocuments(payload.token, payload.selectedDocsId)
      .then((res) => {
        // console.log(res.data)
        commit('deleteDocuments', payload.selectedDocsId)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const getters = {
  documents: (state) => {
    return state.documents
  },
  currentDoc (state, getters, rootState, rootGetters) {
    // let currentDocId = rootState['general/currentDocId']
    let currentDocId = rootGetters['general/currentDocId']
    // return state.documents.find(doc => doc.id === state.current)
    return state.documents.find(doc => doc.id === currentDocId)
  },
  selectedDocs (state) {
    return state.documents.filter(doc => state.selected.includes(doc.id)) // state.selected.map(i => state.documents[i])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
