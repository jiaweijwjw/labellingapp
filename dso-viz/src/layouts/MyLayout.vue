<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-black">
      <q-toolbar class="q-pa-sm">
        <!-- <q-btn flat @click="miniState = !miniState" round dense icon="menu" /> -->
        <q-toolbar-title class="q-ml-lg">
          DSOViz
        </q-toolbar-title>
        <q-btn flat round dense icon="create" class="q-mr-sm" clickable to="/datalabelling/annotate/">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Annotate</q-tooltip>
          </q-btn>
        <q-btn flat round dense icon="label" class="q-mr-sm" clickable to="/datalabelling/labelspage">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Labels</q-tooltip>
          </q-btn>
        <q-btn flat round dense icon="description" class="q-mr-sm" clickable to="/datalabelling/documentspage">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Documents</q-tooltip>
          </q-btn>
        <q-btn flat round dense icon="folder" class="q-mr-md" clickable to="/datalabelling/projectspage">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Projects</q-tooltip>
          </q-btn>

        <q-btn flat round dense icon="close" class="q-mr-md" @click="test"></q-btn>

          <q-separator vertical dark />
        <q-btn v-if="!isLoggedIn" outline color="primary" icon="account_box" label="Login" class="q-mr-md q-ml-md" clickable to="/auth">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Login</q-tooltip>
          </q-btn>
        <q-btn v-if="isLoggedIn" outline color="primary" icon="account_box" label="Logout" class="q-mr-md q-ml-md" @click="logout">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Logout</q-tooltip>
          </q-btn>
      </q-toolbar>
    </q-header>
    <!-- <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :breakpoint="500" show-if-above>
      <q-list dark>
        <q-item-label header></q-item-label>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          expand-separator
          icon="bubble_chart"
          label="Charts"
          to="/charts/"
          default-opened
        >
          <q-item clickable class="app-menu-item" to="/charts/radar">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-item-label>Radar</q-item-label>
              <q-item-label caption>Comparing variation of multiple datasets</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable class="app-menu-item" to="/charts/polar">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-item-label>Polar Area</q-item-label>
              <q-item-label caption>Symmetrical Pie Charts</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense clickable class="app-menu-item" to="/charts/bar">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-item-label>Bar</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="blur_circular"
          label="Graphs"
        >
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="timeline"
          label="Time"
        >
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="my_location"
          label="Geospatial"
        >
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="colorize"
          label="Annotate"
          to="/datalabelling/annotate/"
          default-opened
          caption="Sequence labelling"
        >
        <q-item clickable class="app-menu-item" to="/datalabelling/labelspage">
          <q-item-section avatar>
            <q-icon name="label" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Labels</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable class="app-menu-item" to="/datalabelling/documentspage">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Documents</q-item-label>
          </q-item-section>
        </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer> -->

    <!-- pages will be inserted here -->
    <q-page-container class="absolute-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      // isLoggedIn: this.loginStatus
      // leftDrawerOpen: this.$q.platform.is.desktop,
      // miniState: !this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('general', ['loginStatus', 'access_token']),
    isLoggedIn: function () {
      if (this.access_token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('general', ['updateLoginStatus', 'updateAccessToken']),
    test () {
      console.log(this.isLoggedIn)
      console.log(this.access_token)
    },
    // checkisLoggedIn () {
    //   if (this.access_token) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    logout () {
      try {
        // this.$q.localStorage.set('access_token', null)
        this.updateAccessToken('')
      } catch (e) {
        console.log('Setting access_token to null is unsuccessful.')
        // exit this func?
      }
      // this.updateisLoggedIn(false)
    }
  }
}
</script>

<style lang="sass">
  .q-layout
    background-color: $body-background !important
    overflow: auto
  .q-toolbar
    background-color: $toolbar-color
  .q-drawer__content
    background-color: $drawer-color !important
  .q-drawer
    background-color: $drawer-color
  .q-page-container
    background-color: $body-background !important
  .app-menu-item
    border-radius: 0 10px 10px 0
    margin-right: 12px
  .popup
    background-color: $darker
    text-color: white
</style>
