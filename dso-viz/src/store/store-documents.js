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
  deleteSelectedDocuments ({ commit, dispatch, state, rootGetters }, payload) {
    // no matter what, we delete the documents from the DB and Vuex first.
    DocumentService.deleteDocuments(payload.token, payload.selectedDocsId)
      .then((res) => {
        commit('deleteDocuments', payload.selectedDocsId)
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
      if (!payload.selectedDocsId.includes(docId)) {
        return true
      }
    })
    if (currentSelectedDocsIdAfterDeletion.length === 0) {
      // every currentSel was deleted, including the currentDoc
      dispatch('updateCurrentSelectedDocsId', { token: payload.token, ids: [], proj_id: currentProjId })
        .then(() => {
          console.log('there is no other documents in line, set currDocId to null.')
          dispatch('updateCurrentDocId', { token: payload.token, id: -1, proj_id: currentProjId })
        })
    } else if (currentSelectedDocsIdAfterDeletion.length !== 0 && !equalsIgnoreOrder(state.currentSelectedDocsId, currentSelectedDocsIdAfterDeletion)) { // at least one of the documents being deleted are currently being annotated.
      console.log('at least one deleted doc is in currSel')
      let selectedDocsPayload = { token: payload.token, ids: currentSelectedDocsIdAfterDeletion, proj_id: currentProjId }
      dispatch('updateCurrentSelectedDocsId', selectedDocsPayload)
        .then(() => {
          if (payload.selectedDocsId.includes(currentDocId)) {
            console.log('the currDoc kena deleted too')
            console.log('choose the next in line')
            console.log('show the currentSelectedDocsId array AFTER the updated dispatch: ' + currentSelectedDocsIdAfterDeletion)
            console.log('the next in line would be: ' + currentSelectedDocsIdAfterDeletion[0])
            dispatch('updateCurrentDocId', { token: payload.token, id: currentSelectedDocsIdAfterDeletion[0], proj_id: currentProjId })
          }
        })
    }
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
    console.log('currdocid: ' + payload.id)
    return new Promise((resolve, reject) => {
      ProjectService.updateCurrentDocId(payload.token, payload.id, payload.proj_id)
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
      ProjectService.updateCurrentSelectedDocsId(payload.token, payload.ids, payload.proj_id)
        .then(res => {
          commit('setCurrentSelectedDocsId', payload.ids)
          resolve(res)
        }, err => {
          reject(err)
        })
    })
    // ProjectService.updateCurrentSelectedDocsId(payload.token, payload.ids, payload.proj_id)
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
  addSentiment ({ commit, getters, rootGetters, state, dispatch }, details) {
    let userId = rootGetters['general/currentUserId']
    let projectId = rootGetters['general/currentProjId']
    let documentId = state.currentDocId
    let isFastMode = rootGetters['settings/getFastMode']
    let currentDocStatus = getters['currentDoc'].is_marked
    let newCurrentSelectedDocsId = state.currentSelectedDocsId.filter(id => id !== documentId)
    console.log(userId, projectId, documentId)
    DocumentService.addSentiment(details.token, details.classificationId, documentId, projectId, userId)
      .then(res => {
        commit('updateSentiment', res.data)
        if (isFastMode && !currentDocStatus) {
          let payload = {
            newStatus: true,
            token: details.token,
            documentId
          }
          dispatch('updateDocStatus', payload)
            .then(res => { // removeFromCurrentSelectedDocsId()
              dispatch('updateCurrentSelectedDocsId', { token: details.token, ids: newCurrentSelectedDocsId, proj_id: projectId })
            }).then(res => {
              dispatch('updateCurrentDocId', { token: details.token, id: newCurrentSelectedDocsId[0], proj_id: projectId })
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
