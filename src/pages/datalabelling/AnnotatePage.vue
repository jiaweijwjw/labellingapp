<template>
  <q-page>
    <div class="annotatingpage flex column">
      <h2 class="doc-h2 col-12">DSOViz Data Labelling</h2>
      <p class="text-white col-12">A text annotation tool for NLP.</p>
    </div>
    <div class="annotatingpage col-12">
      <labels> </labels>
      <!-- <entitynaming
        :documents="documents">
      </entitynaming> -->
      <texteditor> </texteditor>
      <div class="row">
      <q-space/><submitbtn @submit="addToDocuments"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Annotate',
  data () {
    return {
      documentToSubmit: {
        id: '1',
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
  components: {
    texteditor: require('components/datalabelling/annotate/TextEditor.vue').default,
    labels: require('components/datalabelling/annotate/Labels.vue').default,
    // entitynaming: require('components/datalabelling/annotate/EntityNaming.vue').default,
    submitbtn: require('components/datalabelling/annotate/SubmitBtn.vue').default
  },
  computed: {
    ...mapGetters('documents', ['documents']),
    ...mapState('documents', ['InputText'])
  },
  methods: {
    ...mapActions('documents', ['addDocument', 'updateInputText']),
    addToDocuments () {
      console.log('submitted document successfully')
      let cloneDocumentToSubmit = { ...this.documentToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      cloneDocumentToSubmit.text = this.InputText
      this.addDocument(cloneDocumentToSubmit)
      this.documentToSubmit.text = ''
      this.documentToSubmit.annotations = []
      this.updateInputText('') // clear the textfield after user submission
    }
  }
}
</script>

<style lang="sass">
.doc-h2
  border-bottom: 1px solid #ccc
  font-size: 1.5rem
  line-height: 1.5rem
  padding: 0.5rem 0
  font-weight: 400
  color: $primary
  margin: 4rem 0 1.5rem
.annotatingpage
  width: 70vw
  max-width: 90vw
</style>
