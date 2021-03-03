import ApiService from './api.service'

class ProjectService {
  constructor () {
    this.request = ApiService
  }

  createProject (data) {
    // console.log(data)
    this.request.setHeader(data.token)
    return this.request.post('/projects/', data.project)
  }

  getProjectList (token) {
    this.request.setHeader(token)
    return this.request.get('/projects/')
  }

  deleteProjects (token, selectedProjsId) {
    console.log(selectedProjsId)
    this.request.setHeader(token)
    return this.request.put(`/projects/`, selectedProjsId)
  }

  updateProject (projectId, payload) {
    return this.request.patch(`/projects/${projectId}`, payload)
  }

  deleteProject (projectId) {
    return this.request.delete(`/projects/${projectId}`)
  }

  fetchProjectById (projectId) {
    return this.request.get(`/projects/${projectId}`)
  }
}

export default new ProjectService()
