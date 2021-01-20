<template>
  <div class="q-pa-md column">
    <q-bar class="q-toolbar text-white">
      <!-- IMPORT FROM FILE -->
      <div class="cursor-pointer non-selectable" color="primary" >
        <q-btn flat color="primary" label="Import from file" v-ripple>
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Import text from your own files to be annotated.</q-tooltip>
          </q-btn>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>test</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>JSON</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </div>
      <!-- ADD NEW LABEL -->
    <customlabel></customlabel>
    </q-bar>
    <!-- DEFAULT LABEL OPTIONS -->
    <q-card class="col-12 my-card bg-grey-4">
      <q-card-section>
        <labelbtn> </labelbtn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  // props: ['options'],
  methods: {
    newCustomLabel () {
      console.log('hi')
    }
  },
  components: {
    labelbtn: require('components/LabelBtn.vue').default,
    customlabel: require('components/CustomLabel.vue').default
  }
}
</script>

<style lang="sass">
.my-card
  width: 100%
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
