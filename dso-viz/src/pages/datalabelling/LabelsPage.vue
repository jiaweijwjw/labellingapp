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
      <q-btn v-if="isSelected" class="col-2 max-width=20vw" label="Delete Selected" flat text-color="primary" @click="deleteSelected"></q-btn>
    </div>
    <!-- TABLE -->
    <div class="page-item">
      <labeltable :isCleared="isCleared" @clearSelection="clearLabelSelection" @updateSelection="updateLabelSelection($event)"/>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LabelsPage',
  components: {
    customlabel: require('components/datalabelling/labels/CustomLabel.vue').default,
    labeltable: require('components/datalabelling/labels/LabelTable.vue').default
  },
  data () {
    return {
      dialog: false,
      selected: [],
      isCleared: false
    }
  },
  computed: {
    ...mapState('general', ['currentUserId', 'currentProjId', 'access_token']),
    isSelected: function () {
      if (this.selected.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('labels', ['deleteSelectedLabels']),
    deleteSelected () {
      let selectedLabelsId = this.selected
      this.deleteSelectedLabels(selectedLabelsId) // Only when user starts annotating then update annotate page.
      this.selected = []
      this.isCleared = true
    },
    updateLabelSelection (selectedLabelsId) { // to keep track of selected documents in documents table
      this.isCleared = false
      this.selected = selectedLabelsId
    },
    clearLabelSelection () {
      this.selected = []
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
