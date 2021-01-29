<template>
  <q-page>
    <div class="documentspage flex row q-pa-md">
      <documentlist/>
  </div>
        <!-- TEXT INPUT -->
      <texteditor> </texteditor>
      <div class="row">
      <q-space/><submitbtn @submit="addToDocuments"/>
      </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LabelsPage',
  components: {
    documentlist: require('components/datalabelling/documents/DocumentList.vue').default,
    texteditor: require('components/datalabelling/annotate/TextEditor.vue').default,
    submitbtn: require('components/datalabelling/annotate/SubmitBtn.vue').default
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('documents', ['addDocument']),
    addToDocuments () {
      console.log('submitted document successfully')
      let cloneDocumentToSubmit = { ...this.documentToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      cloneDocumentToSubmit.text = this.inputText
      this.addDocument(cloneDocumentToSubmit)
      this.documentToSubmit.text = ''
      this.documentToSubmit.annotations = []
      this.updateInputText('') // clear the textfield after user submission
    }
  }
}
</script>

<style lang="sass">
.documentspage
  width: 80vw
  max-width: 80vw
</style>
