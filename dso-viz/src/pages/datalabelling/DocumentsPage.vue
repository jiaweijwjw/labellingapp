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
    ...mapState('documents', ['inputText']),
    ...mapGetters('documents', ['currentDoc', 'selectedDocs']),
    ...mapState('general', ['currentUserId', 'currentProjId', 'access_token']),
    ...mapGetters('general', ['getAccessToken']),
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
    ...mapActions('documents', ['addDocument', 'updateInputText', 'updateSelectedDocs', 'deleteSelectedDocuments']),
    ...mapActions('general', ['updateCurrentDocId']),
    deleteSelected () {
      console.log('deleted')
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
    annotateSelected () {
      let details = { id: this.selected[0] }
      let payload = { token: this.access_token, details: details }
      try {
        this.updateCurrentDocId(payload)
        this.updateSelectedDocs(this.selected) // Only when user starts annotating then update annotate page.
      } catch (error) {
        console.log(console.error())
      } finally {
        // this.$router.push({ name: 'AnnotatePage' })
      }
    },
    test () {
      console.log(this.currentDoc)
      console.log(this.selectedDocs)
      console.log(this.$route.name)
    }
    // addToDocuments () {
    //   console.log('submitted document successfully')
    //   let cloneDocumentToSubmit = { ...this.documentToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
    //   cloneDocumentToSubmit.text = this.inputText
    //   this.addDocument(cloneDocumentToSubmit)
    //   this.documentToSubmit.text = ''
    //   this.documentToSubmit.annotations = []
    //   // console.log(cloneDocumentToSubmit)
    //   let arr = ['a', 'b', 'c', 'd', 'e']
    //   console.log(arr.slice(0, -1))
    //   console.log(this.currentDoc.text.split('\n'))
    //   this.updateInputText('') // clear the textfield after user submission
    // }
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
