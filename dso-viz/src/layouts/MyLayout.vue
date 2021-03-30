<template>
  <q-layout view="hHh lpr fff">
    <q-header v-if="this.$route.name !== 'AuthPage'" elevated>
      <q-toolbar class="q-pa-sm">
        <!-- <q-btn flat @click="miniState = !miniState" round dense icon="menu" /> -->
        <q-toolbar-title class="q-ml-lg">
          DSOViz
        </q-toolbar-title>
        <div class="q-mr-sm">
          <q-breadcrumbs gutter="xs">
            <template v-slot:separator>
              <q-icon
                size="1.5em"
                name="chevron_right"
                color="primary"
              />
            </template>
            <!-- <q-breadcrumbs-el icon="home" to="/" /> -->
            <q-breadcrumbs-el :label="`Project` + `${whichProjectName()}`" icon="folder" :to="{ name: 'ProjectsPage' }" />
            <q-breadcrumbs-el v-if="this.$route.name === 'DocumentsPage'" label="Documents" icon="description" :to="{ name: 'DocumentsPage' }" />
            <q-breadcrumbs-el v-if="this.$route.name === 'LabelsPage'"  label="Labels" icon="label" :to="{ name: 'LabelsPage' }" />
            <q-breadcrumbs-el v-if="this.$route.name === 'AnnotatePage'" label="Annotate" icon="create" :to="{ name: 'AnnotatePage' }" />
          </q-breadcrumbs>
        </div>
        <q-space/>
        <q-btn v-if="isReadyToAnnotate" flat round dense icon="create" class="q-mr-sm" clickable :to="{ name: 'AnnotatePage' }">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Annotate</q-tooltip>
          </q-btn>
        <q-btn v-if="isInProject && (this.currentProjType === 'Sequence Labelling')" flat round dense icon="label" class="q-mr-sm" clickable :to="{ name: 'LabelsPage' }">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Labels</q-tooltip>
          </q-btn>
        <q-btn v-if="isInProject" flat round dense icon="description" class="q-mr-sm" clickable :to="{ name: 'DocumentsPage' }">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Documents</q-tooltip>
          </q-btn>
        <!-- <q-btn flat round dense icon="folder" class="q-mr-md" clickable to="/datalabelling/projectspage">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Projects</q-tooltip>
          </q-btn> -->
          <q-separator vertical dark />
        <q-btn v-if="!isLoggedIn" outline color="primary" icon="account_box" label="Login" class="q-mr-md q-ml-md" clickable :to="{ name: 'AuthPage' }">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Login</q-tooltip>
          </q-btn>
        <q-btn-dropdown v-if="isLoggedIn" outline color="primary" icon="account_box" :label="username" class="q-mr-md q-ml-md">
          <!-- <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Account Settings</q-tooltip> -->
            <q-list bordered separator>
              <q-item clickable :to="{ name: 'ProjectsPage' }" v-close-popup>
                <q-item-section avatar>
                  <q-icon name="folder"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Projects</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon name="exit_to_app"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
        </q-btn-dropdown>
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
    <q-page-container class="fixed-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop,
      // miniState: !this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('general', ['access_token', 'username', 'currentProjId', 'currentUserId']),
    ...mapState('documents', ['currentDocId', 'currentSelectedDocsId']),
    ...mapGetters('documents', ['currentDoc']),
    ...mapGetters('projects', ['currentProjName', 'currentProjType']),
    name: {
      get () {
        return this.username
      }
    },
    isLoggedIn: function () { return (this.access_token && this.currentUserId && this.username) },
    isReadyToAnnotate: function () { return (this.currentDocId && this.currentSelectedDocsId && this.currentDoc && this.currentProjId) },
    isInProject: function () { return this.currentProjId },
    title: function () {
      let extra = ''
      if (!this.currentProjName) {
        extra = ''
      } else { extra = ` > ${this.currentProjName}` }
      switch (this.$route.name) {
        case 'AnnotatePage':
          return 'Annotate' + extra
        case 'LabelsPage':
          return 'Labels' + extra
        case 'DocumentsPage':
          return 'Documents' + extra
        case 'ProjectsPage':
          return 'Projects' + extra
        default: return ''
      }
    }
  },
  methods: {
    ...mapActions('general', ['clearUserDetails']),
    async logout () {
      try {
        await this.resetStore()
        // this.clearUserDetails()
        this.$router.push({ name: 'AuthPage' })
      } catch (e) {
        console.log(e)
        console.log('Setting access_token to null is unsuccessful.')
        // exit this func?
      }
    },
    async resetStore () {
      this.$store.dispatch('documents/resetState')
      this.$store.dispatch('general/resetState')
      this.$store.dispatch('labels/resetState')
      this.$store.dispatch('projects/resetState')
      this.$store.dispatch('classify/resetState')
      this.$store.dispatch('settings/resetState')
    },
    whichProjectName () {
      return this.currentProjName ? ` (${this.currentProjName})` : ''
    }
  }
}
</script>

<style lang="sass">
  .q-layout
    background-color: $body-background !important
    overflow: auto
  .q-header
    background-color: $toolbar-color
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
