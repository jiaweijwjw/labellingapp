<template>
  <q-page>
    <div class="annotatingpage flex column">
      <h2 class="doc-h2 col-12">DSOViz Data Labelling</h2>
      <p class="text-white col-12">A text annotation tool for NLP.</p>
    </div>
    <div class="annotatingpage col-12">
      <!-- LABELS -->
      <labels> </labels>
      <!-- ANNOTATOR -->
      <div class="q-pa-md">
      <q-card class="q-toolbar text-white" bordered>
        <q-card-section>
            <entitynaming
              :labels="labels"
              :text="currentDoc.text"
              :entities="currentDoc.annotations"
              :delete-annotation="removeEntity"
              :update-entity="updateEntity"
              :add-entity="addEntity"
            >
      </entitynaming>
        </q-card-section>
      </q-card>
  </div>
      <!-- TEXT INPUT -->
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
  components: {
    texteditor: require('components/datalabelling/annotate/TextEditor.vue').default,
    labels: require('components/datalabelling/annotate/Labels.vue').default,
    entitynaming: require('components/datalabelling/annotate/EntityNaming.vue').default,
    submitbtn: require('components/datalabelling/annotate/SubmitBtn.vue').default
  },
  computed: {
    ...mapGetters('documents', ['currentDoc']),
    ...mapGetters('labels', ['labels']),
    ...mapState('documents', ['inputText'])
  },
  methods: {
    ...mapActions('documents', ['addDocument', 'updateInputText', 'deleteAnnotation', 'addAnnotation']),
    addToDocuments () {
      console.log('submitted document successfully')
      let cloneDocumentToSubmit = { ...this.documentToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      cloneDocumentToSubmit.text = this.inputText
      this.addDocument(cloneDocumentToSubmit)
      this.documentToSubmit.text = ''
      this.documentToSubmit.annotations = []
      this.updateInputText('') // clear the textfield after user submission
    },
    // removeEntity (annotationId) {
    //   this.currentDoc.annotations = this.currentDoc.annotations.filter(item => item.id !== annotationId)
    // },
    // updateEntity (labelId, annotationId) {
    //   const index = this.currentDoc.annotations.findIndex(item => item.id === annotationId)
    //   this.currentDoc.annotations[index].label = labelId
    // },
    // addEntity (startOffset, endOffset, labelId) {
    //   const payload = {
    //     id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    //     start_offset: startOffset,
    //     end_offset: endOffset,
    //     label: labelId
    //   }
    //   this.currentDoc.annotations.push(payload)
    // },
    removeEntity (annotationId) {
      // const payload = {
      //   annotationId
      //   // projectId: this.$route.params.id
      // }
      this.deleteAnnotation(annotationId)
    },
    updateEntity (labelId, annotationId) {
      const payload = {
        annotationId,
        label: labelId,
        projectId: this.$route.params.id
      }
      this.updateAnnotation(payload)
    },
    addEntity (startOffset, endOffset, labelId) {
      const payload = {
        start_offset: startOffset,
        end_offset: endOffset,
        label: labelId
        // projectId: this.$route.params.id
      }
      this.addAnnotation(payload)
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
