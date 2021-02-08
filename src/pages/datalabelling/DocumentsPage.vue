<template>
  <q-page class="page documents-page">
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
      <q-btn class="col-2 max-width=20vw" label="Annotate Selected" flat text-color="primary" @click="annotateSelected" :to="{ name: 'AnnotatePage' }">
      </q-btn>
    </div>
    <div class="page-item table-container">
      <documentstable @updateSelected="updateSelectedDocs($event)"/>
    </div>
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
      documentToSubmit: {
        id: '',
        text: '',
        annotations: [
          // {
          //   id: 17,
          //   prob: 0.0,
          //   label: 4,
          //   start_offset: 60,
          //   end_offset: 70,
          //   user: 1,
          //   document: 8
          // }
        ]
      }
    }
  },
  computed: {
    ...mapState('documents', ['inputText']),
    ...mapGetters('documents', ['currentDoc'])
  },
  methods: {
    ...mapActions('documents', ['addDocument', 'updateInputText', 'updateSelected']),
    annotateSelected () {
      this.updateSelected(this.selected) // Only when user starts annotating then update annotate page.
    },
    updateSelectedDocs (selectedDocsId) { // to keep track of selected documents in documents table
      this.selected = selectedDocsId
    },
    addToDocuments () {
      console.log('submitted document successfully')
      let cloneDocumentToSubmit = { ...this.documentToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      cloneDocumentToSubmit.text = this.inputText
      this.addDocument(cloneDocumentToSubmit)
      this.documentToSubmit.text = ''
      this.documentToSubmit.annotations = []
      // console.log(cloneDocumentToSubmit)
      let arr = ['a', 'b', 'c', 'd', 'e']
      console.log(arr.slice(0, -1))
      console.log(this.currentDoc.text.split('\n'))
      this.updateInputText('') // clear the textfield after user submission
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
