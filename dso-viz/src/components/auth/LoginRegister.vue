<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-9 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your saved data!
      </q-banner>
    </div>
    <!-- <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        ref="email"
        lazy-rules
        class="col"
        label="Email"
        outlined
        stack-label
      />
    </div> -->
    <div class="row q-mb-md">
      <q-input
        v-model="formData.username"
        :rules="[ val => val && val.length > 0 || 'Please input username.' ]"
        ref="username"
        lazy-rules
        class="col"
        label="Username"
        dark filled
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
        ref="password"
        lazy-rules
        type="password"
        label="Password"
        class="col"
        dark filled
        stack-label
      />
    </div>
    <div class="row">
    <div class="text-red" v-if="loginFailed">Incorrect Username or Password.</div>
      <q-space />
      <q-btn
        flat
        color="primary"
        :label="tab"
        type="submit"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: ['tab', 'loginFailed'],
  data () {
    return {
      formData: {
        // email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // isValidEmailAddress (email) {
    //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   return re.test(String(email).toLowerCase())
    // },
    submitForm () {
      this.$refs.username.validate()
      this.$refs.password.validate()
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        let credentials = { ...this.formData }
        if (this.tab === 'login') {
          this.resetForm()
          this.$emit('login', credentials)
        }
        if (this.tab === 'register') {
          this.resetForm()
          this.$emit('register', credentials)
        }
      }
    },
    resetForm () {
      this.formData.username = ''
      this.formData.password = ''
      this.$refs.username.resetValidation()
      this.$refs.password.resetValidation()
    }
  },
  filters: {
    titleCase (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
