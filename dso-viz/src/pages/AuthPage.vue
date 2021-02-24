<template>
  <q-page padding>
    <q-card class="auth-tabs">
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

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" @login="login($event.username, $event.password)"/>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" @register="register($event.username, $event.password)"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div>
    <q-btn type="submit" color="primary" label="test" @click="testtest"/>
    <!-- <q-btn type="submit" color="primary" label="getusers" @click="getusers"/>
    <q-btn type="submit" color="primary" label="login" @click="login"/> -->
    </div>
    <div class="text-white">
    </div>
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
  mounted () { // SHOULD BE IN LAYOUT?
    this.token = this.$q.localStorage.getItem('access_token')
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
      // if res.status == error, do smth
      // let value = this.$q.localStorage.getItem(key)
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

<style>
  .auth-tabs {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
