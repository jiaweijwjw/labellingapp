import ApiService from './api.service'

class ProjectService {
  constructor () {
    this.request = ApiService
  }

  createProject (data) {
    console.log(data)
    this.request.setHeader(data.token)
    return this.request.post('/projects/', data.project)
  }

  getProjectList () {
    return this.request.get('/projects/')
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
