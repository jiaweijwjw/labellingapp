<template>
  <q-page class="auth-page">
    <q-card class="auth-page-item" bordered>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" dark animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" @login="login($event.username, $event.password)"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" @register="register($event.username, $event.password)"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!-- <div>
    <q-btn type="submit" color="primary" label="test" @click="testtest"/>
    </div> -->
  </q-page>
</template>

<script>
import qs from 'qs'
import { mapActions, mapState, mapGetters } from 'vuex'
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

export default {
  data () {
    return {
      tab: 'login',
      test: '',
      token: ''
    }
  },
  components: {
    'login-register': require('components/auth/LoginRegister.vue').default
  },
  computed: {
    ...mapState('general', ['access_token', 'currentUserId', 'currentProjId', 'username']),
    ...mapGetters('general', ['getAccessToken'])
  },
  methods: {
    ...mapActions('general', ['updateAccessToken', 'updateUserDetails']),
    register (username, password) {
      let credentials = {
        username: username,
        password: password
      }
      AuthService
        .register(credentials).then((res) => {
          console.log(res.data)
        }, (error) => {
          console.log(error)
        })
    },
    getuser (res) {
      if (res.status === 401) {
        console.log('Invalid username or password')
      }
      try {
        this.updateAccessToken(res.data.access_token)
        // this.$q.localStorage.set('access_token', res.data.access_token)
      } catch (e) {
        console.log('data not saved.')
      }
      // let test = this.getAccessToken
      // console.log('test: ' + test)
      UserService.getMe(this.access_token).then((res) => {
        console.log(res.data)
        const userDetails = {
          username: res.data.username,
          currentUserId: res.data.id,
          currentProjId: res.data.current_proj_id,
          currentDocId: res.data.current_doc_id
        }
        this.updateUserDetails(userDetails)
        console.log(this.username, this.currentUserId, this.currentProjId)
      }, (error) => {
        console.log(error)
      })
    },
    login (username, password) {
      let credentials = {
        username: username,
        password: password
      }
      AuthService.login(qs.stringify(credentials)).then(res => { this.getuser(res) }) // qs.stringify is important for form data http request
    }
  }
}
</script>

<style lang="sass">
.q-card
  background-color: $popover-background
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
  position: fixed
  right: 50%
  width: 30vw
  height: 50%
</style>
