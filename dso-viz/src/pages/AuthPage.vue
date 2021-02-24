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
import axios from 'axios'
import qs from 'qs'
import { mapActions, mapState } from 'vuex'
// import ApiService from 'src/services/api.service.js'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000'
})

export default {
  data () {
    return {
      tab: 'login',
      test: '',
      token: '',
      username: ''
    }
  },
  components: {
    'login-register': require('components/auth/LoginRegister.vue').default
  },
  computed: {
    ...mapState('general', ['loginStatus', 'access_token'])
  },
  methods: {
    ...mapActions('general', ['updateLoginStatus', 'updateAccessToken']),
    testtest () {
      const config = {
        method: 'get',
        url: '/users/me/',
        headers: { 'Authorization': `Bearer ${this.access_token}` }
      }
      axiosInstance(config).then(console.log(response => (this.username = response.data)))
    },
    register (username, password) {
      let credentials = {
        username: username,
        password: password
      }
      axiosInstance
        .post('/users/register/', credentials)
        .then(response => (this.test = response.data))
    },
    getuser (res) {
      console.log('entered chain axios req')
      console.log(res.status)
      if (res.status === 401) {
        console.log('Invalid username or password')
      }
      try {
        this.updateAccessToken(res.data.access_token)
        // this.$q.localStorage.set('access_token', res.data.access_token)
        // this.updateLoginStatus(true)
      } catch (e) {
        console.log('data not saved.')
      }
      // this.token = this.$q.localStorage.getItem('access_token')// res.data.access_token     FOR VISUALIZING ONLY
      // this.token = this.access_token
      const config = {
        method: 'get',
        url: '/users/me/',
        headers: { 'Authorization': `Bearer ${this.access_token}` }
      }
      axiosInstance(config).then(console.log(response => (this.username = response.data)))

      // axiosInstance
      //   .get('/users/me/', data, { headers: { 'Authorization': `Bearer ${this.token}` } })
      //   .then(console.log(response => (this.username = response.data.myusername)))
    },
    login (username, password) {
      let credentials = {
        username: username,
        password: password
      }
      axiosInstance
        .post('/token', qs.stringify(credentials), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(res => { this.getuser(res) })
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
