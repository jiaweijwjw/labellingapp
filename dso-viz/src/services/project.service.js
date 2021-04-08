import ApiService from './api.service'

class ProjectService {
  constructor () {
    this.request = ApiService
  }

  createProject (data) {
    return this.request.post('/projects/', data.project)
  }

  getProjectList () {
    return this.request.get('/projects/')
  }

  deleteProjects (selectedProjsId) {
    return this.request.put(`/projects/`, selectedProjsId)
  }

  getProject (projectId) {
    return this.request.get(`/projects/${projectId}/`)
  }

  updateCurrentDocId (id, projectId) {
    return this.request.put(`/projects/${projectId}/currentdoc/`, { id: id })
  }

  updateCurrentSelectedDocsId (ids, projectId) {
    return this.request.put(`/projects/${projectId}/currentselecteddocs/`, { ids: ids })
  }
}

export default new ProjectService()
