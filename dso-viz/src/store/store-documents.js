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
    console.log(editedEntity)
    const document = state.documents.find(doc => doc.id === editedEntity.document_id)
    const annotation = document.annotations.find(item => item.id === editedEntity.id)
    Object.assign(annotation, editedEntity)
  },
  addDocument (state, payload) {
    state.documents.push(payload)
    console.log(state.documents)
  },
  updateDocumentList (state, payload) {
    state.documents = payload.slice()
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
  updateStartEnd ({ commit }, selectionStartEnd) {
    commit('updateStartEnd', selectionStartEnd)
  },
  updateDocStatus ({ commit }, payload) {
    DocumentService.updateDocStatus(payload.token, payload.newStatus, payload.documentId)
      .then(res => {
        console.log(res.data)
      })
    // commit('updateDocStatus', payload)
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
  uploadDocument ({ commit }, files) { // axios part is in ImportDocument for now
    commit('addDocument', files)
  },
  setDocuments ({ commit }, documents) {
    commit('updateDocumentList', documents)
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
  selectedDocs (state, getters, rootState, rootGetters) {
    let currentSelectedDocsId = rootGetters['general/currentSelectedDocsId']
    console.log('currentSelectedDocsId: ' + currentSelectedDocsId)
    return state.documents.filter(doc => currentSelectedDocsId.includes(doc.id))
    // return state.documents.filter(doc => state.selected.includes(doc.id)) // state.selected.map(i => state.documents[i])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
