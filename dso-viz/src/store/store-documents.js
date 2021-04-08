import DocumentService from '../services/document.service'
import AnnotationService from '../services/annotation.service'
import ProjectService from '../services/project.service'

// const util = require('util')

const equalsIgnoreOrder = (a, b) => {
  if (a.length !== b.length) return false
  const uniqueValues = new Set([...a, ...b])
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length
    const bCount = b.filter(e => e === v).length
    if (aCount !== bCount) return false
  }
  return true
}

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
  deleteDocuments (state, selectedDocsId) {
    // for filter, whatever is true will be in the new array
    state.documents = state.documents.filter(doc => {
      if (!selectedDocsId.includes(doc.id)) { // if the doc is not in the list of docs to be deleted, keep it
        return true
      }
    })
    console.log(state.documents)
  },
  updateDocumentList (state, payload) {
    state.documents = payload.slice()
  },
  setCurrentDocId (state, newId) {
    if (newId === -1) {
      state.currentDocId = null
    } else {
      state.currentDocId = newId
    }
  },
  setCurrentSelectedDocsId (state, newIds) {
    state.currentSelectedDocsId = newIds
  },
  updateSentiment (state, fullDoc) {
    let documentId = fullDoc.id
    const document = state.documents.find(doc => doc.id === documentId)
    if (!fullDoc.sentiment) {
      document.sentiment = null
    } else {
      document.sentiment = fullDoc.sentiment
    }
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
    DocumentService.updateDocStatus(payload.newStatus, payload.documentId)
      .then(res => {
        // console.log(res.data)
        commit('updateDocStatus', payload)
      })
  },
  addAnnotation ({ commit, state }, details) {
    const documentId = state.currentDocId
    AnnotationService.addAnnotation(details, documentId)
      .then(res => {
        commit('addAnnotation', res.data)
      })
  },
  deleteAnnotation ({ commit, state }, annotationId) {
    const documentId = state.currentDocId
    AnnotationService.deleteAnnotation(documentId, annotationId)
      .then(res => {
        commit('deleteAnnotation', res.data)
      })
  },
  updateAnnotation ({ commit, state }, details) {
    const documentId = state.currentDocId
    AnnotationService.updateAnnotation(documentId, details.annotationId, details.newLabelId)
      .then(res => {
        commit('updateAnnotation', res.data)
      })
  },
  uploadDocument ({ commit }, files) { // axios part is in ImportDocument for now
    commit('addDocument', files)
  },
  deleteSelectedDocuments ({ commit, dispatch, state, rootGetters }, selectedDocsId) {
    // no matter what, we delete the documents from the DB and Vuex first.
    DocumentService.deleteDocuments(selectedDocsId)
      .then((res) => {
        commit('deleteDocuments', selectedDocsId)
      })
      .catch((err) => {
        console.log(err)
      })
    /* Get the currentSelectedDocs and the currentDoc.
       filter the currentSelected to after deletion
       compare this currentSelectedAfterDeletion with the original to see if any of the currentSelected was deleted */
    let currentProjId = rootGetters['general/currentProjId']
    let currentSelectedDocsId = state.currentSelectedDocsId
    let currentDocId = state.currentDocId
    let currentSelectedDocsIdAfterDeletion = currentSelectedDocsId.filter(docId => {
      if (!selectedDocsId.includes(docId)) {
        return true
      }
    })
    if (currentSelectedDocsIdAfterDeletion.length === 0) {
      // every currentSel was deleted, including the currentDoc
      dispatch('updateCurrentSelectedDocsId', { ids: [], proj_id: currentProjId })
        .then(() => {
          console.log('there is no other documents in line, set currDocId to null.')
          dispatch('updateCurrentDocId', { id: -1, proj_id: currentProjId })
        })
    } else if (currentSelectedDocsIdAfterDeletion.length !== 0 && !equalsIgnoreOrder(state.currentSelectedDocsId, currentSelectedDocsIdAfterDeletion)) { // at least one of the documents being deleted are currently being annotated.
      console.log('at least one deleted doc is in currSel')
      let selectedDocsPayload = { ids: currentSelectedDocsIdAfterDeletion, proj_id: currentProjId }
      dispatch('updateCurrentSelectedDocsId', selectedDocsPayload)
        .then(() => {
          if (selectedDocsId.includes(currentDocId)) {
            console.log('the currDoc kena deleted too')
            console.log('choose the next in line')
            console.log('show the currentSelectedDocsId array AFTER the updated dispatch: ' + currentSelectedDocsIdAfterDeletion)
            console.log('the next in line would be: ' + currentSelectedDocsIdAfterDeletion[0])
            dispatch('updateCurrentDocId', { id: currentSelectedDocsIdAfterDeletion[0], proj_id: currentProjId })
          }
        })
    }
  },
  getDocumentList ({ commit }) {
    DocumentService.getDocumentList()
      .then((res) => {
        commit('updateDocumentList', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateCurrentDocId ({ commit }, payload) {
    console.log('currdocid: ' + payload.id)
    return new Promise((resolve, reject) => {
      ProjectService.updateCurrentDocId(payload.id, payload.proj_id)
        .then((res) => {
          commit('setCurrentDocId', payload.id)
          resolve(res)
          // console.log(util.inspect(res.data, false, null, true /* enable colors */)) // to view [object]
        }, err => { reject(err) })
    })
  },
  updateCurrentSelectedDocsId ({ commit }, payload) {
    console.log('currseldocsid: ' + payload.ids)
    return new Promise((resolve, reject) => {
      ProjectService.updateCurrentSelectedDocsId(payload.ids, payload.proj_id)
        .then(res => {
          commit('setCurrentSelectedDocsId', payload.ids)
          resolve(res)
        }, err => {
          reject(err)
        })
    })
    // ProjectService.updateCurrentSelectedDocsId(payload.ids, payload.proj_id)
    //   .then(res => {
    //     commit('setCurrentSelectedDocsId', payload.ids)
    //   }).catch(err => { console.log(err) })
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
  addSentiment ({ commit, getters, rootGetters, state, dispatch }, classificationId) {
    let userId = rootGetters['general/currentUserId']
    let projectId = rootGetters['general/currentProjId']
    let documentId = state.currentDocId
    let isFastMode = rootGetters['settings/getFastMode']
    let currentDocStatus = getters['currentDoc'].is_marked
    let uncheckedCurrentSelectedDocsId = state.documents.filter(doc => doc.id !== documentId && !doc.is_marked).map(doc => doc.id)
    DocumentService.addSentiment(classificationId, documentId, projectId, userId)
      .then(res => {
        commit('updateSentiment', res.data)
        if (isFastMode) {
          if (!currentDocStatus) { dispatch('updateDocStatus', { newStatus: true, documentId }) }
          dispatch('updateCurrentSelectedDocsId', { ids: uncheckedCurrentSelectedDocsId, proj_id: projectId })
            .then(res => {
              if (state.currentSelectedDocsId.length !== 0) {
                dispatch('updateCurrentDocId', { id: uncheckedCurrentSelectedDocsId[0], proj_id: projectId })
              } else {
                dispatch('updateCurrentDocId', { id: -1, proj_id: projectId })
              }
            })
        }
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
  currentSelectedDocsId: (state) => {
    return state.currentSelectedDocsId
  },
  currentDoc: (state, getters, rootState, rootGetters) => {
    // let currentDocId = rootGetters['general/currentDocId']
    if (state.currentDocId === null) {
      return null
    } else {
      let currentDoc = state.documents.find(doc => doc.id === state.currentDocId)
      return currentDoc
    }
    // return state.documents.find(doc => doc.id === state.currentDocId)
  },
  selectedDocs: (state, getters, rootState, rootGetters) => {
    // let currentSelectedDocsId = rootGetters['general/currentSelectedDocsId']
    let currentSelectedDocsId = state.currentSelectedDocsId
    // return state.documents.filter(doc => state.currentSelectedDocsId.includes(doc.id))
    return currentSelectedDocsId ? state.documents.filter(doc => state.currentSelectedDocsId.includes(doc.id)) : null
  },
  currentDocSentiment: (state, getters) => {
    let currentDoc = getters['currentDoc']
    return currentDoc ? currentDoc.sentiment : null
    // return currentDoc.sentiment
  },
  currentDocStatus: (state, getters) => {
    let currentDoc = getters['currentDoc']
    return currentDoc ? currentDoc.is_marked : null
    // return currentDoc.is_marked
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
