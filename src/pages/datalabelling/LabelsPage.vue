<template>
  <q-page style="width: 100vw">
    <div class="row q-pa-lg">
      <q-btn-dropdown
        flat
        text-color="primary"
        label="Actions"
        class="col-2 max-width=20vw"
      >
        <q-list separator>
          <q-item
            clickable
            v-close-popup
            @click="dialog = true"
          >
            <q-item-section>
              <q-item-label>Create New Label</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-item-label>Import Label</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-item-label>Export Label</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <!-- TABLE -->
    <div class="q-px-lg q-py-xs">
      <labeltable />
    </div>
    <div>
      <customlabel
        v-if="dialog"
        :dialog="dialog"
        @close="dialog = false"
      ></customlabel>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LabelsPage',
  components: {
    customlabel: require('components/datalabelling/labels/CustomLabel.vue').default,
    labeltable: require('components/datalabelling/labels/LabelTable.vue').default
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
  width: 70vw
  max-width: 80vw
  background-color: white
.labeltable
  width: 70vw
  max-width: 80vw
</style>
