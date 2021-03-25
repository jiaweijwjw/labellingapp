<template>
  <q-page class="page documents-page">
    <div v-if="isInProject" class="page-item row q-py-md">
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
              <q-item-label>Import</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-item-label>test</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn v-if="isSelected" class="col-2 max-width=20vw" label="Delete Selected" flat text-color="primary" @click="deleteSelected"></q-btn>
      <!-- <q-btn v-if="isSelected" class="col-2 max-width=20vw" label="Annotate Selected" flat text-color="primary" @click="annotateSelected" :to="{ name: 'AnnotatePage' }"></q-btn> -->
      <q-btn v-if="isSelected" class="col-2 max-width=20vw" label="Annotate Selected" flat text-color="primary" @click="annotateSelected"></q-btn>
    </div>
    <div v-else class="text-white">Add Padding</div>
    <div class="page-item table-container">
      <documentstable :isInProject="isInProject" :isCleared="isCleared" @clearSelection="clearDocSelection" @updateSelection="updateDocSelection($event)"/>
    </div>
    <q-btn color="primary" label="test" @click="test"/>
        <!-- TEXT INPUT -->
      <!-- <texteditor> </texteditor>
      <div class="row">
      <q-space/><submitbtn @submit="addToDocuments"/>
      </div> -->

    <div>
      <importdocument
        v-if="dialog"
        :dialog="dialog"
        @close="dialog = false"
      ></importdocument>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'DocumentsPage',
  activated: function () { // testing keep alive. remove after
    console.log('activated')
  },
  deactivated: function () {
    console.log('deactivated')
  },
  mounted: function () {
    console.log('mounted documentpage')
  },
  destroyed: function () {
    console.log('destroyed documentpage')
  },
  components: {
    importdocument: require('components/datalabelling/documents/ImportDocument.vue').default,
    documentstable: require('components/datalabelling/documents/DocumentsTable.vue').default
    // documentlist: require('components/datalabelling/documents/DocumentList.vue').default,
    // texteditor: require('components/datalabelling/annotate/TextEditor.vue').default,
    // submitbtn: require('components/datalabelling/annotate/SubmitBtn.vue').default
  },
  data () {
    return {
      selected: [],
      dialog: false,
      isCleared: false
    }
  },
  computed: {
    ...mapState('documents', ['currentDocId', 'currentSelectedDocsId']),
    ...mapGetters('documents', ['currentDoc', 'selectedDocs']),
    ...mapState('general', ['currentUserId', 'currentProjId', 'access_token']),
    ...mapGetters('documents', ['currentDocId', 'currentSelectedDocsId']),
    getCurrentDocId: { // Vuex getters are not reactive, have to use computed porperty
      get: function () { return this.currentDocId }
    },
    getCurrentSelectedDocsId: { // Vuex getters are not reactive, have to use computed porperty
      get: function () { return this.currentSelectedDocsId }
    },
    currentProj () {
      return this.currentProjId
    },
    isInProject: function () {
      if (!this.currentProjId) { // this.currentProjId === 0 || this.currentProjId === null
        return false
      } else {
        return true
      }
    },
    isSelected: function () {
      if (this.selected.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('documents', ['updateCurrentDocId', 'updateCurrentSelectedDocsId', 'deleteSelectedDocuments']),
    deleteSelected () {
      let payload = { token: this.access_token, selectedDocsId: this.selected }
      this.deleteSelectedDocuments(payload) // Only when user starts annotating then update annotate page.
      this.selected = []
      this.isCleared = true
    },
    updateDocSelection (selectedDocsId) { // to keep track of selected documents in documents table
      this.selected = selectedDocsId
    },
    clearDocSelection () {
      this.selected = []
    },
    async annotateSelected () {
      // let details = { id: this.selected[0] }
      // let docIdPayload = { token: this.access_token, details: details }
      let docIdPayload = {
        token: this.access_token,
        id: this.selected[0],
        proj_id: this.currentProjId
      }
      // let selectedDocsIdPayload = { token: this.access_token, details: { ids: this.selected } }
      let selectedDocsIdPayload = {
        token: this.access_token,
        ids: this.selected,
        proj_id: this.currentProjId
      }

      try {
        console.log('currProjId: ' + this.currentProjId)
        const currDocPromise = this.updateCurrentDocId(docIdPayload)
        const currSelectedDocsPromise = this.updateCurrentSelectedDocsId(selectedDocsIdPayload)
        Promise.all([currDocPromise, currSelectedDocsPromise]).then(res => {
          this.$router.push({ name: 'AnnotatePage' })
          console.log(this.getCurrentDocId)
          console.log(this.getCurrentSelectedDocsId)
        })
        //  this.updateSelectedDocs(this.selected) // Only when user starts annotating then update annotate page.
      } catch (error) {
        console.log(console.error())
      } finally {
        // finally will occur even if error
        // this.$router.push({ name: 'AnnotatePage' }) // SHOULD NOT BE HERE BECAUSE IF ERROR, WE DONT WANT TO GO TO ANNOTATE PAGE
      }
    },
    test () {
      console.log('currentDocId: ' + this.currentDocId)
      console.log('currentSelectedDocsId: ' + this.currentSelectedDocsId)
      console.log(this.$route.name)
      console.log('docs here: ' + this.$store.getters['documents/selectedDocs'])
      // console.log('labels here: ' + this.$store.getters['labels/labels'])
      // console.log('projs here: ' + this.$store.getters['projects/projects'])
      // this.$q.loading.show({ delay: 400 })
      // this.$q.loading.hide()
    }
  }
}
</script>

<style lang="sass">
.table-container
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
.documents-page
  background-color: $body-background
</style>
