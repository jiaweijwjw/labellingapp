<template>
<div>
    <q-bar class="row">
        <q-checkbox class="col-2" dark v-model="docStatus" :label="this.status ? 'Checked' : 'Unchecked'" color="primary" @input="updateStatus()"/>
        <q-chip  v-if="docSentiment !== ''"
        :icon="docSentiment === 'positive' ? 'sentiment_very_satisfied' : (docSentiment === 'negative' ? 'sentiment_very_dissatisfied' : 'remove') "
        dense
        :style="'background-color:'+getSentimentColor()+';'+'color:'+autoTextColor(getSentimentColor())+';' + 'max-width:15vw'"
        :label="docSentiment"></q-chip>
        <q-space/>
        <q-btn flat class="col-1" @click="dialog = true"><q-icon name="menubook"/></q-btn>
        <q-option-group
          :options="options"
          v-model="toggles"
          type="toggle"
          inline dense dark
          color="primary"
          @input="changeMode"
          size="xs">
        </q-option-group>
    </q-bar>
    <div>
    <q-dialog v-model="dialog">
        <q-card dark style="width:50vw; max-width:70vw">
        <q-card-section>
          <div class="text-h6">Annotation Guideline</div>
        </q-card-section>

        <q-card-section class="q-toolbar text-white q-pa-md">
          Type some guideline here.
        </q-card-section>

        <q-card-actions class="q-toolbar" align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    marked: {
      type: Boolean
    },
    currentDocId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      status: false,
      // annotationToggles: [],
      // options: [
      //   { label: 'Fast Mode', value: 'fast', checkedIcon: 'speed', iconColor: 'black', disable: true },
      //   { label: 'Focus Mode', value: 'focus', checkedIcon: 'zoom_out_map', uncheckedIcon: 'unfold_less', iconColor: 'black' }
      // ],
      dialog: false
    }
  },
  mounted () {
    this.docStatus = this.marked
    console.log('what type: ' + this.currentProjType)
  },
  computed: {
    ...mapGetters('classify', ['classifyBtns']),
    ...mapGetters('documents', ['currentDocSentiment']),
    ...mapGetters('projects', ['currentProjType']),
    ...mapGetters('settings', ['getAnnotationSettings']),
    options: { // SINCE DISABLE IS DYNAMIC< HAVE TO BE COMPUTED
      get: function () {
        let optionsArr = [
          { label: 'Fast Mode', value: 'fast', checkedIcon: 'speed', iconColor: 'black', disable: this.currentProjType !== 'Document Classification' },
          { label: 'Focus Mode', value: 'focus', checkedIcon: 'zoom_out_map', uncheckedIcon: 'unfold_less', iconColor: 'black' }
        ]
        return optionsArr
      }
    },
    toggles: {
      get: function () {
        return this.getAnnotationSettings
      },
      set: function (settingsArr) {
        this.setAnnotationSettings(settingsArr)
      }
    },
    docStatus: { //  IMPORTANT. Need getters and setter if v-model computed property.
      get: function () { return this.status },
      set: function (marked) { this.status = marked }
    },
    docSentiment: {
      get: function () { return this.currentDocSentiment }
    }
  },
  methods: {
    ...mapActions('documents', ['updateDocStatus']),
    ...mapActions('settings', ['setAnnotationSettings']),
    updateStatus () {
      let payload = {
        newStatus: this.docStatus,
        documentId: this.currentDocId,
        token: this.$store.state.general.access_token
      }
      this.updateDocStatus(payload)
    },
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    getSentimentColor () {
      switch (this.docSentiment) {
        case 'positive':
          return '#a4ff70'
        case 'negative':
          return '#ff5252'
        default:
          return 'primary'
      }
    },
    changeMode (togglesState) {
      let isFocus = togglesState.includes('focus')
      let isFast = togglesState.includes('fast')
      console.log(togglesState)
      if (isFocus && isFast) {
        this.$emit('focus-on')
        this.$emit('fast-on')
      } else if (isFocus) {
        console.log('currentprojtype: ' + this.currentProjType)
        console.log(this.currentProjType !== 'Document Classification')
        console.log(this.currentProjType === 'Document Classification')
        this.$emit('focus-on')
        this.$emit('fast-off')
      } else if (isFast) {
        this.$emit('focus-off')
        this.$emit('fast-on')
      } else {
        this.$emit('focus-off')
        this.$emit('fast-off')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
