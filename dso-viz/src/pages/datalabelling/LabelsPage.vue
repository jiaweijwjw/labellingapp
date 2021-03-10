<template>
  <q-page class="page labels-page">
    <div class="page-item row q-py-md">
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
    <div class="page-item">
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
      dialog: true
    }
  }
}
</script>

<style lang="sass">
.page
  display: flex
  flex-flow: column
  align-content: center
  align-items: center
  width: 1800px
  max-width: 100vw
  height: 100%
.page-item
  display: block
  width: 85vw
  max-width: 100vw
.labels-page
  background-color: $body-background
.labeltable
  width: 70vw
  max-width: 80vw
</style>
