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
    <q-btn type="submit" color="primary" label="test" @click="testgetuser"/>
    <!-- <q-btn type="submit" color="primary" label="getusers" @click="getusers"/>
    <q-btn type="submit" color="primary" label="login" @click="login"/> -->
    </div>
    <div class="text-white">
      {{test}}
      {{users}}
      {{token}}
      {{username}}
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
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
      users: [],
      token: 'intial string token',
      username: ''
    }
  },
  components: {
    'login-register': require('components/auth/LoginRegister.vue').default
  },
  methods: {
    // log () {
    //   console.log(this.test)
    // },
    testgetuser () {
      const config = {
        method: 'get',
        url: '/users/me/',
        headers: { 'Authorization': `Bearer ${this.token}` }
      }
      axiosInstance(config).then(console.log(response => (this.username = response.data)))
      // axiosInstance(config).then(console.log(response => (this.username = response.data.myusername)))
    },
    register (username, password) {
      console.log('registered')
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
      // $window.sessionStorage.accessToken = response.body.access_token;
      // if res.status == error, do smth
      // let value = this.$q.localStorage.getItem(key)
      try {
        this.$q.localStorage.set('access_token', res.data.access_token)
      } catch (e) {
        console.log('data not saved.')
        // data wasn't successfully saved due to
        // a Web Storage API error
      }
      this.token = res.data.access_token
      // const config = {
      //   method: 'get',
      //   url: '/users/me/',
      //   headers: { 'Authorization': `Bearer ${this.token}` }
      // }
      // axiosInstance(config).then(console.log(response => (this.username = response.data.myusername)))

      // axiosInstance
      //   .get('/users/me/', data, { headers: { 'Authorization': `Bearer ${this.token}` } })
      //   .then(console.log(response => (this.username = response.data.myusername)))
    },
    login (username, password) {
      console.log(this.tab)
      let login = {
        username: username,
        password: password
      }
      axiosInstance
        .post('/token', qs.stringify(login), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
