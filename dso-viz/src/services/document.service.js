import ApiService from './api.service'

class DocumentService {
  constructor () {
    this.request = ApiService
  }

  uploadDocument (token, documentName, files) {
    console.log(files[0])
    let formData = new FormData()
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('file', files[i])
    // }
    formData.append('file', files[0])
    formData.append('doc_name', documentName)
    this.request.removeHeader()
    this.request.setHeader(token)
    const config = {
      headers: { 'Content-Type': undefined } // IMPT TO SET TO UNDEFINED AND NOT MANUALLY SET MULTIPART/FORM_DATA
    }
    return this.request.post('/documents/upload/', formData, config)
  }

  getDocumentList (token) {
    this.request.setHeader(token)
    return this.request.get(`/documents/`)
  }

  deleteDocuments (token, selectedDocsId) {
    this.request.setHeader(token)
    return this.request.put(`/documents/`, selectedDocsId)
  }

  updateDocStatus (token, newStatus, documentId) {
    this.request.setHeader(token)
    return this.request.put(`/documents/${documentId}/`, { bool_val: newStatus })
  }

  addSentiment (token, classificationId, documentId, projectId, userId) {
    this.request.setHeader(token)
    let val = () => {
      switch (classificationId) {
        case 1:
          return 'positive'
        case 2:
          return 'negative'
        case 3:
          return 'neutral'
        default:
          return ''
      }
    }
    return this.request.post(`/documents/${documentId}/sentiment/${projectId}/${userId}`, { string_val: val() })
  }
  // addDocument (projectId, payload) {
  //   return this.request.post(`/projects/${projectId}/docs`, payload)
  // }

  // deleteAllDocuments (projectId) {
  //   return this.request.delete(`/projects/${projectId}/docs`)
  // }

  // deleteDocument (projectId, docId) {
  //   return this.request.delete(`/projects/${projectId}/docs/${docId}`)
  // }

  // updateDocument (projectId, docId, payload) {
  //   return this.request.patch(`/projects/${projectId}/docs/${docId}`, payload)
  // }

  // uploadFile (projectId, payload, config = {}) {
  //   return this.request.post(`/projects/${projectId}/docs/upload`, payload, config)
  // }

  // exportFile (projectId, format, onlyApproved) {
  //   const headers = {}
  //   if (format === 'csv') {
  //     headers.Accept = 'text/csv; charset=utf-8'
  //     headers['Content-Type'] = 'text/csv; charset=utf-8'
  //   } else {
  //     headers.Accept = 'application/json'
  //     headers['Content-Type'] = 'application/json'
  //   }
  //   const config = {
  //     responseType: 'blob',
  //     params: {
  //       q: format,
  //       onlyApproved
  //     },
  //     headers
  //   }
  //   return this.request.get(`/projects/${projectId}/docs/download`, config)
  // }

  // approveDocument (projectId, docId, payload) {
  //   return this.request.post(`/projects/${projectId}/docs/${docId}/approve-labels`, payload)
  // }
}

export default new DocumentService()
