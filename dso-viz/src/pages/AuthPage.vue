<template>
  <q-page class="auth-page">
    <q-card class="auth-page-item auth-card" bordered>
      <q-tabs
        v-model="currentTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" @click="registerFailed = false"/>
        <q-tab name="register" label="Register" @click="loginFailed = false"/>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="currentTab" dark animated>
        <q-tab-panel name="login">
          <login-register :loginFailed="loginFailed" :tab="tab" @login="login($event.username, $event.password)"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :registerFailed="registerFailed" :tab="tab" @register="register($event.username, $event.password)"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div>
    <q-btn color="primary" label="testnotify" @click="handleLoginError"/>
    </div>
  </q-page>
</template>

<script>
import qs from 'qs'
import { mapActions, mapState, mapGetters } from 'vuex'
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'
import TokenService from '../services/token.service'
// import API from '../boot/axios'

export default {
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },
  data () {
    return {
      tab: 'login',
      token: '',
      loginFailed: false,
      registerFailed: false
    }
  },
  components: {
    'login-register': require('components/auth/LoginRegister.vue').default
  },
  computed: {
    ...mapState('general', ['access_token', 'currentUserId', 'currentProjId', 'username']),
    ...mapGetters('general', ['getAccessToken']),
    currentTab: { //  IMPORTANT. Need getters and setter if v-model computed property.
      get: function () {
        return this.tab
      },
      set: function (newTab) {
        this.tab = newTab
      }
    }
  },
  methods: {
    ...mapActions('general', ['updateAccessToken', 'updateUserDetails', 'updateLoggedIn']),
    register (username, password) {
      let credentials = {
        username: username,
        password: password
      }
      AuthService
        .register(credentials)
        .then((res) => {
          this.currentTab = 'login'
          this.registerFailed = false
        })
        .catch(error => {
          console.log(error.response.data.detail)
          // console.log(error.response.config._retry)
          console.log(error.response.status)
          this.failedRegister()
        })
    },
    getuser (res) {
      this.loginFailed = false
      TokenService.setToken(res.data.access_token)
      this.updateLoggedIn(true)
      // TokenService.setTokenExpiry(res.data.access_token_expiry)
      // console.log('tokenexpiry: ' + typeof TokenService.getTokenExpiry())
      this.updateAccessToken(res.data.access_token)
      this.showLoading()
      UserService.getMe(this.access_token)
        .then((res) => {
          setTimeout(() => this.initialLoadUser(res).catch(() => this.handleLoginError()), 1000) // just to test loading screen. can remove
          // this.initialLoadUser(res)
        }).catch(() => this.handleLoginError())
    },
    handleLoginError () {
      this.$q.notify({
        type: 'negative',
        message: `Failed to fetch user data.`,
        caption: 'The server could be busy, please try again later.',
        position: 'top',
        timeout: '3000'
      })
    },
    async initialLoadUser (res) {
      let projects = res.data.projects
      let username = res.data.username
      let currentUserId = res.data.id
      let currentProjId = res.data.current_proj_id
      let userDetails = {
        username,
        currentUserId,
        currentProjId
      }
      this.updateUserDetails(userDetails)
      if (!projects) {
        this.$q.loading.hide()
        this.$router.push({ name: 'ProjectsPage' })
      } else if (projects && !currentProjId) {
        const projPromise = this.$store.dispatch('projects/setProjects', projects)
        projPromise.then(val => {
          this.$q.loading.hide()
          this.$router.push({ name: 'ProjectsPage' })
        }).catch(() => this.handleLoginError())
      } else { // there are projects and has selected a project (projects && currentProjId)
        let currProjIndex = projects.map(item => item.id).indexOf(res.data.current_proj_id)
        let documents = projects[currProjIndex].documents
        let labels = projects[currProjIndex].labels
        let activeDocumentsId = projects[currProjIndex].active_documents.map(item => item.document_id)
        let currentSelectedDocsId = activeDocumentsId
        this.$store.dispatch('documents/setCurrentSelectedDocsId', currentSelectedDocsId)
        if (!documents && !labels) {
          const projPromise = this.$store.dispatch('projects/setProjects', projects)
          projPromise.then(val => {
            this.$q.loading.hide()
            if (!currentProjId) {
              this.$router.push({ name: 'ProjectsPage' })
            } else {
              this.$router.push({ name: 'DocumentsPage' })
            }
          }).catch(() => this.handleLoginError())
        } else if (!documents && labels) {
          const projPromise = this.$store.dispatch('projects/setProjects', projects)
          const labelPromise = this.$store.dispatch('labels/setLabels', labels)
          Promise.all([projPromise, labelPromise])
            .then(res => {
              this.$q.loading.hide()
              this.$router.push({ name: 'DocumentsPage' })
            }).catch(() => this.handleLoginError())
        } else if (documents && !labels) {
          let currentDocId = projects[currProjIndex].current_doc_id
          this.$store.dispatch('documents/setCurrentDocId', currentDocId)
          const projPromise = this.$store.dispatch('projects/setProjects', projects)
          const docPromise = this.$store.dispatch('documents/setDocuments', documents)
          Promise.all([projPromise, docPromise])
            .then(res => {
              this.$q.loading.hide()
              if (!activeDocumentsId) {
                this.$router.push({ name: 'DocumentsPage' })
              } else {
                this.$router.push({ name: 'AnnotatePage' })
              }
            }).catch(() => this.handleLoginError())
        } else { // projects && documents && labels
          let currentDocId = projects[currProjIndex].current_doc_id
          this.$store.dispatch('documents/setCurrentDocId', currentDocId)
          const projPromise = this.$store.dispatch('projects/setProjects', projects)
          const docPromise = this.$store.dispatch('documents/setDocuments', documents)
          const labelPromise = this.$store.dispatch('labels/setLabels', labels)
          Promise.all([projPromise, docPromise, labelPromise])
            .then(res => {
              this.$q.loading.hide()
              if (!currentProjId) {
                this.$router.push({ name: 'ProjectsPage' })
              } else if (!currentDocId) {
                this.$router.push({ name: 'DocumentsPage' })
              } else if (currentProjId && currentDocId) {
                this.$router.push({ name: 'AnnotatePage' })
              }
            })
            .catch(() => this.handleLoginError())
        }
      }
    },
    failedLogin () {
      this.loginFailed = true
    },
    failedRegister () {
      this.registerFailed = true
    },
    login (username, password) {
      let credentials = {
        username: username,
        password: password
      }
      AuthService.login(qs.stringify(credentials))
        .then(res => { this.getuser(res) }) // qs.stringify is important for form data http request
        .catch(error => {
          console.log('err status: ' + error.response.status)
          this.failedLogin()
        })
    },
    showLoading () {
      this.$hf.showLoadingForTime(3000) // time in ms
    }
    // getuser (res) {
    //   this.loginFailed = false
    //   try {
    //     this.updateAccessToken(res.data.access_token)
    //     // this.$q.localStorage.set('access_token', res.data.access_token)
    //   } catch (e) {
    //     console.log('data not saved.')
    //   }
    //   UserService.getMe(this.access_token).then((res) => {
    //     console.log(res.data)
    //     const userDetails = {
    //       username: res.data.username,
    //       currentUserId: res.data.id,
    //       currentProjId: res.data.current_proj_id,
    //       currentDocId: res.data.current_doc_id
    //     }
    //     this.updateUserDetails(userDetails)
    //   }, (error) => {
    //     console.log(error)
    //   })
    //   this.$router.push({ name: 'ProjectsPage' })
    // }
  }
}
</script>

<style scoped lang="sass">
.auth-page
  display: flex
  flex-flow: column
  justify-content: center
  align-content: center
  align-items: center
  width: 1800px
  max-width: 100vw
  height: 100%
  background-color: $body-background
.auth-page-item
  display: block
  width: 40vw
  max-width: 40vw
.auth-card
  background-color: $toolbar-color
</style>
