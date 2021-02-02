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
        <q-card-section ref="labelbtns">
        <div class="row justify-center q-gutter-x-sm q-gutter-y-sm no-padding">
        <q-btn-group size="0.8rem" class="no-padding row roundedbtn"
        v-for="(labelbtn, key) in remainingLabels"
        :key="key"
        clickable
        v-shortkey="[labelbtn.shortcutkey]"
        @shortkey="selectedNewLabel(labelbtn.id)"
        @click="selectedNewLabel(labelbtn.id)">
          <q-btn class="q-px-sm no-margin ellipsis roundedbtn" :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';' + 'max-width:15vw'" v-text="labelbtn.name">
          </q-btn>
          <q-btn class="q-px-sm no-margin roundedbtn" :style="'background-color: white'" v-text="labelbtn.shortcutkey">
          </q-btn>
        </q-btn-group>
  </div>
        </q-card-section>
        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            type="submit"
            label="Confirm"
            @click="update"
          />
          <!-- <q-btn flat label="Open another dialog" @click="secondDialog = true" /> -->
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
      newLabelId: ''
    }
  },
  // mounted () {
  //   this.focusLabels()
  // },
  computed: {
    remainingLabels () {
      let arr = this.labels.filter(item => item.id !== this.labelToEdit.currentLabelId)
      return arr // this.labels.filter(item => item.name !== this.currentlabelId)
    }
  },
  methods: {
    //  ...mapActions('labels', ['addLabel']),
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    close () {
      this.$emit('close')
    },
    selectedNewLabel (labelbtnId) {
      this.newLabelId = labelbtnId
      console.log('label selected')
    },
    update () {
      let changes = {
        newLabelId: this.newLabelId,
        annotationId: this.labelToEdit.entityId
      }
      this.$emit('update', changes)
      this.close()
    }
    // focusLabels () {
    //   // this.$nextTick(() => this.$refs.labelbtns.focus())
    //   this.$refs.labelbtns.focus()
    //   console.log(this.$refs)
    // }
  }
}
</script>

<style lang="sass">
</style>
