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
        <q-btn flat round dense icon="description" class="q-mr-md" clickable to="/datalabelling/documentspage">
          <q-tooltip anchor="bottom middle" self="center middle" :offset="[15, 15]">Documents</q-tooltip>
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
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop,
      // miniState: !this.$q.platform.is.desktop
    }
  }
}
</script>

<style lang="sass">
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
</style>
