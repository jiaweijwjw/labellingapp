<template>
  <div>
    <q-dialog :value="dialog" persistent>
      <q-card
        style="width: 40vw"
        bordered
        class="popup"
      >
        <q-card-section class="row">
          <div class="text-h6 text-white">Choose new label</div>
          <q-space />
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="primary"
            @click="close"
          />
        </q-card-section>
        <q-card-section>
        <div v-if="remainingLabels.length !== 0" class="row justify-center q-gutter-x-sm q-gutter-y-sm no-padding">
          <q-btn-group size="0.8rem" class="no-padding row roundedbtn"
          v-for="(labelbtn, key) in remainingLabels"
          :key="key"
          v-bind:class="{ border: labelbtn.id === newLabelId }"
          clickable>
            <q-btn class="q-px-sm no-margin ellipsis roundedbtn"
            v-shortkey="[labelbtn.shortcutkey]"
            @shortkey="selectedNewLabel(labelbtn.id)"
            @click="selectedNewLabel(labelbtn.id)"
            :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';' + 'max-width:15vw'" v-text="labelbtn.name">
            </q-btn>
            <q-btn class="q-px-sm no-margin roundedbtn"
            v-shortkey="[labelbtn.shortcutkey]"
            @shortkey="selectedNewLabel(labelbtn.id)"
            @click="selectedNewLabel(labelbtn.id)"
            :style="'background-color: white'" v-text="labelbtn.shortcutkey">
            </q-btn>
          </q-btn-group>
        </div>
        <div v-else class="row justify-center q-gutter-x-sm q-gutter-y-sm no-padding text-white">No other labels to change to. Create more labels!</div>
        </q-card-section>
        <q-card-actions class="text-primary">
        <span class="hint" v-if="!selected">Please select a label</span>
        <q-space/>
          <q-btn
            flat
            type="submit"
            label="Confirm"
            @click="update"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['dialog', 'labels', 'labelToEdit'],
  data () {
    return {
      newLabelId: '',
      selected: false
    }
  },
  // mounted () {
  //   console.log('mounted')
  //   // const labelbtnsRef = this.$refs.labelbtns
  //   // labelbtnsRef.focus()
  // },
  // updated () {
  //   console.log('after click update')
  //   console.log(this.$refs)
  //   const labelbtnsRef = this.$refs.labelbtns
  //   labelbtnsRef.focus()
  // },
  computed: {
    remainingLabels () {
      let arr = this.labels.filter(item => item.id !== this.labelToEdit.currentLabelId)
      console.log(arr)
      console.log(arr.length)
      return arr // this.labels.filter(item => item.name !== this.currentlabelId)
    }
  },
  methods: {
    //  ...mapActions('labels', ['addLabel']),
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    close () {
      this.selected = false
      this.$emit('close')
    },
    selectedNewLabel (labelbtnId) {
      this.selected = true
      this.newLabelId = labelbtnId
      console.log('label selected')
    },
    update () {
      if (this.newLabelId !== '') {
        let changes = {
          newLabelId: this.newLabelId,
          annotationId: this.labelToEdit.entityId
        }
        this.$emit('update', changes)
        this.newLabelId = ''
        this.close()
      } else {
        console.log('nothing selected')
      }
    }
    // dialogShow () {
    //   this.focusLabels()
    // },
    // focusLabels () {
    //   // this.$nextTick(() => this.$refs.labelbtns.focus())
    //   // console.log(this.$refs.labelbtns)
    //   // this.$refs.labelbtns.focus()
    //   this.$nextTick(() => {
    //     const labelbtnsRef = this.$refs.labelbtns
    //     // labelbtnsRef.focus()
    //     console.log(labelbtnsRef)
    //   })
    // }
  }
}
</script>

<style scoped>
.hint {
  vertical-align: middle;
  align-items: center;
  padding-left: 2%;
  color: #fcba03;
}
.border {
  border: 3px solid;
  border-radius: 11px;
  border-color: #fcba03;
  /* margin: 1px 3px 1px 3px;
  vertical-align: baseline;
  box-shadow: 2px 4px 20px rgba(0,0,0,.1);
  position: relative;
  cursor: pointer;
  min-width: 26px;
  line-height: 100%;
  display: inline-flex; */
}
</style>
