import ApiService from './api.service'

class ProjectService {
  constructor () {
    this.request = ApiService
  }

  getProjectList () {
    return this.request.get('/projects')
  }

  createProject (data) {
    let token = data.token
    let project = {
      name: data.project.name,
      user_id: data.project.user,
      proj_type: data.project.type,
      description: data.project.description
    }
    console.log(data)
    console.log(project)
    this.request.setHeader(token)
    return this.request.post('/projects', project)
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
