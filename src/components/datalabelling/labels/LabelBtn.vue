<template>
  <div class="row justify-center q-gutter-x-md q-gutter-y-xs no-padding">
        <!-- :label="labelbtn.name"
        :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';'" -->

        <!-- <q-btn size="0.8rem" class="no-padding row"
        v-for="(labelbtn, key) in labels"
        :key="key"
        clickable
        v-ripple
        v-shortkey="[labelbtn.shortcutkey]"
        @shortkey="assignLabel(labelbtn.id)"
        @click="assignLabel(labelbtn.id)">
        <div class="q-px-sm no-margin" :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';'" v-text="labelbtn.name"/>
        <div class="q-px-xs no-margin" :style="'background-color: white'" v-text="labelbtn.shortcutkey"/>
        </q-btn> -->

        <q-btn-group size="0.8rem" class="no-padding row"
        v-for="(labelbtn, key) in labels"
        :key="key"
        clickable
        v-shortkey="[labelbtn.shortcutkey]"
        @shortkey="assignLabel(labelbtn.id)"
        @click="assignLabel(labelbtn.id)">
          <q-btn class="q-px-sm no-margin ellipsis" :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';' + 'max-width:10vw'" v-text="labelbtn.name">
          </q-btn>
          <q-btn class="q-px-xs no-margin" :style="'background-color: white'" v-text="labelbtn.shortcutkey">
          </q-btn>
        </q-btn-group>
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
