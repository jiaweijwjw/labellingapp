import ApiService from './api.service'

class ProjectService {
  constructor () {
    this.request = ApiService
  }

  createProject (data) {
    return this.request.post('/projects/', data.project)
  }

  getProjectList (token) {
    return this.request.get('/projects/')
  }

  deleteProjects (token, selectedProjsId) {
    return this.request.put(`/projects/`, selectedProjsId)
  }

  getProject (token, projectId) {
    return this.request.get(`/projects/${projectId}/`)
  }

  updateCurrentDocId (token, id, projectId) {
    return this.request.put(`/projects/${projectId}/currentdoc/`, { id: id })
  }

  updateCurrentSelectedDocsId (token, ids, projectId) {
    return this.request.put(`/projects/${projectId}/currentselecteddocs/`, { ids: ids })
  }
}

export default new ProjectService()
