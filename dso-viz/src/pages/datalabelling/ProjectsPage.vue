<template>
  <q-page class="page projects-page">
    <div class="page-item row q-py-md">
      <q-btn
      flat
      text-color="primary"
      label="New Project"
      class="col-2 max-width=20vw"
      @click="dialog = true">
      </q-btn>
    </div>
    <div class="page-item table-container">
      <documentstable @updateSelected="updateSelectedDocs($event)"/>
    </div>
    <div>
      <newproject
        v-if="dialog"
        :dialog="dialog"
        @close="dialog = false"
      ></newproject>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ProjectsPage',
  components: {
    newproject: require('components/management/projects/NewProject.vue').default,
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
.projects-page
  background-color: $body-background
</style>
