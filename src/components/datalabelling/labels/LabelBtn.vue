<template>
  <div class="row justify-center q-gutter-x-md q-gutter-y-sm">
      <!-- <q-btn class="q-ma-xs col-2"
      v-for="(labelbtn, key) in labels"
        :key="key"
        clickable
        v-ripple
        :label="labelbtn.name"
        :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';'"
        @click="assignLabel(labelbtn.id)"/> -->
        <q-btn size="0.8rem" class="no-padding row"
        v-for="(labelbtn, key) in labels"
        :key="key"
        clickable
        v-ripple
        v-shortkey="[labelbtn.shortcutkey]"
        @shortkey="assignLabel(labelbtn.id)"
        @click="assignLabel(labelbtn.id)">
        <q-item class="no-margin no-padding">
        <q-item-section class="q-px-sm" :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';'">
          {{labelbtn.name}}
          </q-item-section>
        </q-item>
        <q-item class="no-margin no-padding">
        <q-item-section class="q-px-xs" :style="'background-color: white'">
          {{labelbtn.shortcutkey}}
        </q-item-section>
        </q-item>
        </q-btn>
      <!-- <q-btn class="q-ma-xs col-2"
      v-for="(customlabelbtn, key) in customLabels"
        :key="key"
        clickable
        v-ripple
        :label="customlabelbtn.name"
        :color="customlabelbtn.color" /> -->
      <!-- <q-btn class="q-ma-xs col-2" color="secondary" icon-right="mail" label="On Right" /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    labels: {
      type: Array,
      default: () => ([]),
      required: true
    },
    entities: { // annotations
      type: Array,
      default: () => ([]),
      required: true
    },
    addEntity: {
      type: Function,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {
    }
  },
  // computed: {
  //   LabelBtns () {
  //     return this.$store.getters['labels/labels'] // labels module (index.js) and labels getter (store-labels.js)
  //   },
  //   CustomLabelBtns () {
  //     return this.$store.getters['labels/customLabels']
  //   }
  // }
  computed: {
    ...mapState('documents', ['start', 'end'])
  },
  methods: {
    ...mapActions('documents', ['updateStartEnd']),
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    validateSpan () {
      if ((typeof this.start === 'undefined') || (typeof this.end === 'undefined')) {
        return false
      }
      if (this.start === this.end) {
        return false
      }
      for (const entity of this.entities) {
        if ((entity.start_offset <= this.start) && (this.start < entity.end_offset)) {
          return false
        }
        if ((entity.start_offset < this.end) && (this.end <= entity.end_offset)) {
          return false
        }
        if ((this.start < entity.start_offset) && (entity.end_offset < this.end)) {
          return false
        }
      }
      return true
    },
    assignLabel (labelId) {
      if (this.validateSpan()) {
        this.addEntity(this.start, this.end, labelId)
        console.log(this.start, this.end)
        this.showMenu = false
        let startEnd = {
          start: 0,
          end: 0
        }
        this.updateStartEnd(startEnd)
      }
    }
  }
}
</script>

<style lang="sass">
</style>
