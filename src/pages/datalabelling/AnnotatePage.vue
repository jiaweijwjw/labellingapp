<template>
  <q-page class="annotate-page" style="width:1800px;">
    <div>
      <!-- LABELS -->
      <labels
        class="labels-box"
        :labels="labels"
        :entities="currentDoc.annotations"
        :add-entity="addEntity"
      > </labels>
      <!-- ANNOTATOR -->
    <q-carousel
      @before-transition="switchSlide"
      class="carousel text-white rounded-borders no-padding no-margin"
      v-model="currentSlide"
      keep-alive
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      arrows
      dark
      navigation
      navigation-position="bottom"
      navigation-icon="fiber_manual_record"
      navigation-active-icon="create"
      control-type="flat"
      control-color="black"
      control-text-color="primary"
    >
    <q-carousel-slide v-for="document in selectedDocs" v-bind:key="document.id" :name="document.id" class="q-pa-none">
        <q-scroll-area class="fit">
          <div class="column no-wrap flex-center q-carousel--padding">
            <q-card class="q-toolbar text-white" bordered style="width: 85vw">
        <q-card-section>
            <annotationbar/>
          <q-space/>
          <q-menu>
          </q-menu>
        </q-card-section>
        <q-card-section class="words-container no-margin no-padding">
            <entitynaming
              :labels="labels"
              :text="document.text"
              :entities="document.annotations"
              :delete-annotation="removeEntity"
              :update-entity="updateEntity"
              :add-entity="addEntity"
            >
      </entitynaming>
        </q-card-section>
      </q-card>
          </div>
        </q-scroll-area>
      </q-carousel-slide>

    </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AnnotatePage',
  data () {
    return {
      currentSlide: '1'
    }
  },
  components: {
    labels: require('components/datalabelling/annotate/Labels.vue').default,
    entitynaming: require('components/datalabelling/annotate/EntityNaming.vue').default,
    annotationbar: require('components/datalabelling/annotate/AnnotationBar.vue').default
  },
  computed: {
    ...mapGetters('documents', ['currentDoc', 'selectedDocs']),
    ...mapGetters('labels', ['labels'])
    // currentSlide () {
    //   return '1' // this.selectedDocs[1].id
    // }
  },
  methods: {
    ...mapActions('documents', ['updateCurrent', 'deleteAnnotation', 'addAnnotation', 'updateAnnotation']),
    switchSlide (newSlideName, oldSlideName) {
      this.updateCurrent(newSlideName)
      console.log('currentdocid: ' + this.currentDoc.id)
      console.log(this.currentDoc, this.selectedDocs)
      console.log(newSlideName, oldSlideName)
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
.annotate-page
  display: flex
  flex-flow: column
  align-content: center
  max-width: 100vw
  height: 100%
.labels-box
  margin: auto
  width: 85vw
  max-width: 100vw
.carousel
  width: 100vw
  height: 45vw
  background-color: purple
.words-container
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
