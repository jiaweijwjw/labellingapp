<template>
  <q-page v-shortkey="{left: ['arrowleft'], right: ['arrowright']}" @shortkey="slideCarousel" class="page">
    <div>
      <!-- LABELS -->
      <labelctrls
        v-if="this.currentProjType === 'Sequence Labelling'"
        class="labels-box page-item"
        :labels="labels"
        :entities="currentDoc.annotations"
        :add-entity="addEntity"
      > </labelctrls>
      <classificationctrls
        v-if="this.currentProjType === 'Document Classification'"
        class="labels-box page-item"
        :classifyDocument="classifyDocument"
      ></classificationctrls>
      <div v-if="this.currentProjType === null">
      </div>
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
    <q-carousel-slide v-for="document in selectedDocuments" v-bind:key="document.id" :name="document.id" class="q-pa-none">
        <q-scroll-area dark :thumb-style="thumbStyle" class="fit">
          <!-- q-carousel--padding -->
          <div class="column no-wrap flex-center carousel-padding">
            <q-card class="q-toolbar text-white" bordered style="width: 85vw">
        <q-card-section>
            <annotationbar :marked="document.is_marked" :currentDocId="document.id"
            @focus-on="enterFullscreen" @fast-on="enterFastMode"
            @focus-off="exitFullscreen" @fast-off="exitFastMode"/>
            <div><q-btn class="text-primary" label="testfullscreen" @click="toggle"/></div>
        </q-card-section>
        <q-card-section class="words-container no-margin no-padding">
            <entitynaming
              :labels="labels"
              :text="document.content"
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
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'AnnotatePage',
  mounted () {
    console.log('currentDocId on mount annotatepage: ' + this.currentDocId)
    this.slide = this.currentDocId // OR currentDoc.id???
  },
  data () {
    return {
      slide: null,
      thumbStyle: {
        borderRadius: '10px'
      }
    }
  },
  components: {
    labelctrls: require('components/datalabelling/annotate/LabelCtrls.vue').default,
    entitynaming: require('components/datalabelling/annotate/EntityNaming.vue').default,
    annotationbar: require('components/datalabelling/annotate/AnnotationBar.vue').default,
    classificationctrls: require('components/datalabelling/classification/ClassificationCtrls.vue').default
  },
  computed: {
    ...mapState('general', ['access_token', 'currentProjId']),
    ...mapGetters('documents', ['currentDoc', 'selectedDocs', 'currentDocId', 'currentSelectedDocsId']),
    ...mapGetters('labels', ['labels']),
    ...mapGetters('projects', ['currentProjType']),
    selectedDocuments: { // Vuex getters are not reactive, have to use computed porperty
      get: function () { return this.selectedDocs }
    },
    currentSlide: { //  IMPORTANT. Need getters and setter if v-model computed property.
      get: function () {
        return this.slide
      },
      set: function (newSlide) {
        this.slide = newSlide
      }
    },
    allSlides () {
      let slides = this.selectedDocuments.map(docs => docs.id)
      return slides
    }
  },
  methods: {
    ...mapActions('documents', ['updateCurrent', 'deleteAnnotation', 'addAnnotation', 'updateAnnotation']),
    ...mapActions('documents', ['updateCurrentDocId', 'addSentiment']),
    switchSlide (newSlideName, oldSlideName) {
      console.log('entered switch slide')
      console.log('newSlideName: ' + newSlideName + ' oldSlideName: ' + oldSlideName)
      this.updateCurrentDocId({ token: this.access_token, id: newSlideName, proj_id: this.currentProjId })
      // this.updateCurrent(newSlideName)
      console.log('currentdoc.id: ' + this.currentDoc.id)
      console.log('currentDocId: ' + this.currentDocId)
      // console.log(this.currentDoc, this.selectedDocs)
    },
    slideCarousel (event) {
      if (this.allSlides.length <= 1) { return }
      let index = this.allSlides.indexOf(this.currentSlide)
      switch (event.srcKey) {
        case 'left':
          if (index < 0 || index >= this.allSlides.length) {
            break
          } else if (index !== 0) {
            --index
            this.currentSlide = this.allSlides[index]
          } else {
            index = this.allSlides.length - 1
            this.currentSlide = this.allSlides[index]
          }
          break
        case 'right':
          if (index < 0 || index >= this.allSlides.length) {
            break
          } else if (index !== this.allSlides.length - 1) {
            ++index
            this.currentSlide = this.allSlides[index]
          } else {
            index = 0
            this.currentSlide = this.allSlides[index]
          }
          break
        default: break
      }
    },
    removeEntity (annotationId) {
      const details = {
        annotationId: annotationId,
        token: this.access_token
      }
      this.deleteAnnotation(details)
    },
    updateEntity (newLabelId, annotationId) {
      const details = {
        annotationId,
        newLabelId,
        token: this.access_token
      }
      console.log(newLabelId, annotationId)
      this.updateAnnotation(details)
    },
    addEntity (startOffset, endOffset, labelId) {
      const details = {
        start_offset: startOffset,
        end_offset: endOffset,
        label_id: labelId,
        token: this.access_token
      }
      this.addAnnotation(details)
    },
    classifyDocument (classificationId) {
      let details = {
        token: this.access_token,
        classificationId
      }
      this.addSentiment(details)
    },
    toggle (e) {
      const target = e.target.parentNode.parentNode.parentNode
      this.$q.fullscreen.toggle(target)
        .then(() => {
          // success!
        })
        .catch((err) => {
          alert(err)
          // uh, oh, error!!
          // console.error(err)
        })
    },
    enterFullscreen () {
      console.log('enterfullscreen')
    },
    exitFullscreen () {
      console.log('exitfullscreen')
    },
    enterFastMode () {
      console.log('enterfastmode')
    },
    exitFastMode () {
      console.log('exitfastmode')
    }
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
  }
}
</script>

<style lang="sass">
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
.labels-box
  margin: auto
  width: 85vw
  max-width: 100vw
.carousel
  width: 100vw
  height: 45vw
  background-color: $body-background
.words-container
  overflow: auto;
.carousel-padding
  margin-bottom: 5vw
.doc-h2
  border-bottom: 1px solid #ccc
  font-size: 1.5rem
  line-height: 1.5rem
  padding: 0.5rem 0
  font-weight: 400
  color: $primary
  margin: 4rem 0 1.5rem
.q-toolbar
  background-color: $toolbar-color
</style>
