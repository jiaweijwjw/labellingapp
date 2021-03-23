<template>
  <div class="row justify-center q-gutter-x-sm q-gutter-y-sm no-padding">
        <q-btn-group size="0.8rem" class="no-padding row roundedbtn"
        v-for="(btn, key) in classifyBtns"
        :key="key"
        clickable>
          <q-btn class="q-px-sm no-margin ellipsis roundedbtn"
          dense
          v-shortkey="[btn.shortcutkey]"
          @shortkey="classify(btn.id)"
          @click="classify(btn.id)"
          :style="'background-color:'+btn.color+';'+'color:'+autoTextColor(btn.color)+';' + 'max-width:15vw'"
          :label="btn.name">
          </q-btn>
          <q-btn class="no-padding no-margin roundedbtn"
          dense
          size="0.7rem"
          v-shortkey="[btn.shortcutkey]"
          @shortkey="classify(btn.id)"
          @click="classify(btn.id)"
          :style="'background-color: white'"
          :icon="whichIcon(btn.shortcutkey)"
          :label="whichLabel(btn.shortcutkey)">
          </q-btn>
        </q-btn-group>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  props: {
    classifyBtns: {
      type: Array,
      default: () => ([]),
      required: true
    },
    classifyDocument: {
      type: Function,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    classify (classificationId) {
      console.log('classificationId: ' + classificationId)
      this.classifyDocument(classificationId)
    },
    whichIcon (shortkey) {
      switch (shortkey) {
        case 'arrowup':
          return 'arrow_upward'
        case 'arrowdown':
          return 'arrow_downward'
        case 'space':
          return 'space_bar'
        default:
          return ''
      }
    },
    whichLabel (shortkey) {
      if (shortkey === 'arrowup' || shortkey === 'arrowdown' || shortkey === 'space') {
        return ''
      } else {
        return shortkey
      }
    }
  }
}
</script>

<style lang="sass">
.roundedbtn
  border-radius: 7px;
</style>
