<template>
  <q-page style="width:1800px; max-width:85vw">
    <div>
      <!-- LABELS -->
      <labels
        :labels="labels"
        :entities="currentDoc.annotations"
        :add-entity="addEntity"
      > </labels>
      <!-- ANNOTATOR -->
      <div>
      <q-card class="q-toolbar text-white" bordered>
        <q-card-section>
            <annotationbar/>
          <q-space/>
          <q-menu>
          </q-menu>
        </q-card-section>
        <q-card-section class="words-container no-margin no-padding">
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
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AnnotatePage',
  data () {
    return {
    }
  },
  components: {
    labels: require('components/datalabelling/annotate/Labels.vue').default,
    entitynaming: require('components/datalabelling/annotate/EntityNaming.vue').default,
    annotationbar: require('components/datalabelling/annotate/AnnotationBar.vue').default
  },
  computed: {
    ...mapGetters('documents', ['currentDoc']),
    ...mapGetters('labels', ['labels'])
  },
  methods: {
    ...mapActions('documents', ['deleteAnnotation', 'addAnnotation', 'updateAnnotation']),
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
    updateEntity (newLabelId, annotationId) {
      const payload = {
        annotationId,
        newLabelId
        // projectId: this.$route.params.id
      }
      console.log(newLabelId, annotationId)
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
.words-container
  max-height: 70vh;
  overflow: auto;
.doc-h2
  border-bottom: 1px solid #ccc
  font-size: 1.5rem
  line-height: 1.5rem
  padding: 0.5rem 0
  font-weight: 400
  color: $primary
  margin: 4rem 0 1.5rem
</style>
