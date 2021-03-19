import DocumentService from '../services/document.service'
import AnnotationService from '../services/annotation.service'
import ProjectService from '../services/project.service'

const util = require('util')

const defaultState = () => {
  return {
    start: 0, // start of selection
    end: 0, // end of selection
    currentDocId: null,
    currentSelectedDocsId: [],
    documents: []
  }
}
const state = defaultState()

const mutations = {
  resetState (state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState())
  },
  updateStartEnd (state, payload) {
    state.start = payload.start
    state.end = payload.end
  },
  updateDocStatus (state, payload) {
    const document = state.documents.find(doc => doc.id === payload.documentId)
    document.is_marked = payload.newStatus
  },
  addAnnotation (state, payload) {
    var index = state.documents.map(item => item.id).indexOf(payload.document_id)
    let annotation = Object.assign(payload)
    state.documents[index].annotations.push(annotation)
  },
  deleteAnnotation (state, deletedEntity) {
    var index = state.documents.map(item => item.id).indexOf(deletedEntity.document_id)
    var annotationIndex = state.documents[index].annotations.map(item => item.id).indexOf(deletedEntity.id)
    ~annotationIndex && state.documents[index].annotations.splice(annotationIndex, 1)
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
  deleteDocuments (state, payload) {
    // for filter, whatever is true will be in the new array
    state.documents = state.documents.filter(doc => {
      if (!payload.includes(doc.id)) { // if the doc is not in the list of docs to be deleted, keep it
        return true
      }
    })
    console.log(state.documents)
  },
  updateDocumentList (state, payload) {
    state.documents = payload.slice()
  },
  setCurrentDocId (state, newId) {
    state.currentDocId = newId
  },
  setCurrentSelectedDocsId (state, newIds) {
    state.currentSelectedDocsId = newIds
  },
  updateSentiment (state, fullDoc) {
    let documentId = fullDoc.id
    const document = state.documents.find(doc => doc.id === documentId)
    document.sentiment = fullDoc.sentiment
  }
}

const actions = {
  resetState ({ commit }) {
    commit('resetState')
  },
  updateStartEnd ({ commit }, selectionStartEnd) {
    commit('updateStartEnd', selectionStartEnd)
  },
  updateDocStatus ({ commit }, payload) {
    DocumentService.updateDocStatus(payload.token, payload.newStatus, payload.documentId)
      .then(res => {
        // console.log(res.data)
        commit('updateDocStatus', payload)
      })
  },
  addAnnotation ({ commit, state, rootGetters }, details) {
    // const documentId = rootGetters['general/currentDocId']
    const documentId = state.currentDocId
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
  deleteAnnotation ({ commit, state, rootGetters }, details) {
    // const documentId = state.documents.find(doc => doc.id === state.current).id
    // const documentId = rootGetters['general/currentDocId']
    const documentId = state.currentDocId
    AnnotationService.deleteAnnotation(details.token, documentId, details.annotationId)
      .then(res => {
        commit('deleteAnnotation', res.data)
      })
  },
  updateAnnotation ({ commit, state, rootGetters }, details) {
    const documentId = state.currentDocId
    const annotationId = details.annotationId
    AnnotationService.updateAnnotation(details.token, documentId, annotationId, details.newLabelId)
      .then(res => {
        commit('updateAnnotation', res.data)
      })
  },
  uploadDocument ({ commit }, files) { // axios part is in ImportDocument for now
    commit('addDocument', files)
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
  updateCurrentDocId ({ commit }, payload) {
    ProjectService.updateCurrentDocId(payload.token, payload.id, payload.proj_id)
      .then((res) => {
        commit('setCurrentDocId', payload.id)
        console.log(util.inspect(res.data, false, null, true /* enable colors */)) // to view [object]
      }).catch((err) => { console.log(err) })
  },
  updateCurrentSelectedDocsId ({ commit }, payload) {
    ProjectService.updateCurrentSelectedDocsId(payload.token, payload.ids, payload.proj_id)
      .then(res => {
        commit('setCurrentSelectedDocsId', payload.ids)
      }).catch(err => { console.log(err) })
  },
  setCurrentDocId ({ commit }, currentDocId) {
    commit('setCurrentDocId', currentDocId)
  },
  setCurrentSelectedDocsId ({ commit }, currentSelectedDocsId) {
    commit('setCurrentSelectedDocsId', currentSelectedDocsId)
  },
  setDocuments ({ commit }, documents) {
    commit('updateDocumentList', documents)
  },
  addSentiment ({ commit, rootGetters, state }, details) {
    let userId = rootGetters['general/currentUserId']
    let projectId = rootGetters['general/currentProjId']
    let documentId = state.currentDocId
    console.log(userId, projectId, documentId)
    DocumentService.addSentiment(details.token, details.classificationId, documentId, projectId, userId)
      .then(res => {
        commit('updateSentiment', res.data)
      }).catch(err => { console.log(err) })
  }
}

const getters = {
  documents: (state) => {
    return state.documents
  },
  currentDocId: (state) => {
    return state.currentDocId
  },
  currentDoc: (state, getters, rootState, rootGetters) => {
    // let currentDocId = rootGetters['general/currentDocId']
    return state.documents.find(doc => doc.id === state.currentDocId)
  },
  selectedDocs: (state, getters, rootState, rootGetters) => {
    // let currentSelectedDocsId = rootGetters['general/currentSelectedDocsId']
    return state.documents.filter(doc => state.currentSelectedDocsId.includes(doc.id))
  },
  currentDocSentiment: (state, getters) => {
    let currentDoc = getters['currentDoc']
    return currentDoc.sentiment
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
