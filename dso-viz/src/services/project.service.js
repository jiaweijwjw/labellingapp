import ApiService from './api.service'

class ProjectService {
  constructor () {
    this.request = ApiService
  }

  createProject (data) {
    this.request.setHeader(data.token)
    return this.request.post('/projects/', data.project)
  }

  getProjectList (token) {
    this.request.setHeader(token)
    return this.request.get('/projects/')
  }

  deleteProjects (token, selectedProjsId) {
    this.request.setHeader(token)
    return this.request.put(`/projects/`, selectedProjsId)
  }

  getProject (token, projectId) {
    this.request.setHeader(token)
    return this.request.get(`/projects/${projectId}/`)
  }

  updateCurrentDocId (token, id, projectId) {
    this.request.setHeader(token)
    return this.request.put(`/projects/${projectId}/currentdoc/`, { id: id })
  }

  updateCurrentSelectedDocsId (token, ids, projectId) {
    this.request.setHeader(token)
    return this.request.put(`/projects/${projectId}/currentselecteddocs/`, { ids: ids })
  }
}

export default new ProjectService()
