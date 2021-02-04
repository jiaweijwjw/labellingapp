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
      navigation-icon="close"
      navigation-active-icon="bathtub"
      control-type="flat"
      control-color="black"
      control-text-color="primary"
    >
    <q-carousel-slide name="1" class="q-pa-none">
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
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide name="2" class="q-pa-none">
        <q-scroll-area class="fit">
          <div class="column no-wrap flex-center q-carousel--padding">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md">
              {{ lorem }}
            </div>
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
      currentSlide: '1',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  },
  // watch: {
  //   vertical (val) {
  //     this.navPos = val === true
  //       ? 'right'
  //       : 'bottom'
  //   }
  // },
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
  backgroundColor: $darker
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
