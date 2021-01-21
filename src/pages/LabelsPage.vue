<template>
  <q-page>
    <div class="labelspage flex row q-pa-md">
      <q-btn-dropdown flat color=$dropdown text-color="primary" label="Actions" class="col-2 max-width=20vw">
      <q-list separator>
        <q-item clickable v-close-popup @click="dialog = true">
          <q-item-section>
            <q-item-label>Create New Label</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Import Label</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Export Label</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    </div>
    <!-- TABLE -->
    <div class="width=70vw max-width=80vw q-pa-md">
        <labeltable/>
  </div>
  <div>
      <customlabel v-if="dialog" :dialog="dialog" @close="dialog = false"></customlabel>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'LabelsPage',
  components: {
    customlabel: require('components/CustomLabel.vue').default,
    labeltable: require('components/LabelTable.vue').default
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="sass">
.labelspage
  width: 80vw
  max-width: 90vw
</style>
