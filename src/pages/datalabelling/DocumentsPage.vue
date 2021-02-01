<template>
  <q-page>
    <div class="documentspage flex row q-py-lg" style="width:1800px; max-width:85vw">
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
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'DocumentsPage',
  components: {
    documentlist: require('components/datalabelling/documents/DocumentList.vue').default,
    texteditor: require('components/datalabelling/annotate/TextEditor.vue').default,
    submitbtn: require('components/datalabelling/annotate/SubmitBtn.vue').default
  },
  data () {
    return {
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
    ...mapActions('documents', ['addDocument', 'updateInputText']),
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
.documentspage
  width: 80vw
  max-width: 80vw
</style>
