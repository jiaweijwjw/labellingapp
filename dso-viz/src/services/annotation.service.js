import ApiService from './api.service'

class AnnotationService {
  constructor () {
    this.request = ApiService
  }

  addAnnotation (details, documentId) {
    return this.request.post(`/documents/${documentId}/annotations/`, details)
  }

  deleteAnnotation (documentId, annotationId) {
    return this.request.delete(`/documents/${documentId}/annotations/${annotationId}/`)
  }

  updateAnnotation (documentId, annotationId, newLabelId) {
    let data = { id: newLabelId }
    return this.request.patch(`/documents/${documentId}/annotations/${annotationId}/`, data)
  }

  // getAnnotationList (projectId, docId) {
  //   return this.request.get(`/projects/${projectId}/docs/${docId}/annotations`)
  // }
}

export default new AnnotationService()
