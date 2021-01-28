<template>
  <div>
    <q-dialog :value="dialog" persistent>
      <q-card
        style="width: 40vw"
        bordered
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
          <div class="row justify-center q-gutter-x-md q-gutter-y-sm">
            <q-btn
              size="0.8rem"
              class="no-padding row"
              v-for="(labelbtn, key) in remainingLabels"
              :key="key"
              clickable
              v-ripple
              v-shortkey="[labelbtn.shortcutkey]"
              @shortkey="assignLabel(labelbtn.id)"
              @click="assignLabel(labelbtn.id)"
            >
              <q-item class="no-margin no-padding">
                <q-item-section
                  class="q-px-sm"
                  :style="'background-color:'+labelbtn.color+';'+'color:'+autoTextColor(labelbtn.color)+';'"
                >
                  <q-item-label v-text="labelbtn.name" />
                </q-item-section>
              </q-item>
              <q-item class="no-margin no-padding">
                <q-item-section
                  class="q-px-xs"
                  :style="'background-color: white'"
                >
                  <q-item-label v-text="labelbtn.shortcutkey" />
                </q-item-section>
              </q-item>
            </q-btn>
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
            @click="close"
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
  props: ['dialog', 'labels', 'currentlabelId'],
  computed: {
    remainingLabels () {
      let arr = this.labels.filter(item => item.id !== this.currentlabelId)
      console.log(arr)
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
    }
  }
}
</script>

<style lang="sass">
</style>
