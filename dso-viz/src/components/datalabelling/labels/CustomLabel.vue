<template>
  <div>
    <!-- <q-btn
      flat
      color="primary"
      label="Custom Label"
      v-ripple
      @click="dialog = true"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
        >Add your own label to the list of labels below.</q-tooltip
      >
    </q-btn> -->
    <q-form @submit="submitNewLabel">
    <q-dialog :value="dialog" persistent>
      <q-card style="width: 40vw" bordered>
        <q-card-section class="row">
          <div class="text-h6 text-white">New Label</div>
          <q-space />
          <q-btn v-close-popup flat round dense icon="close" color="primary" @click="close"/>
        </q-card-section>
        <!-- CUSTOM LABEL NAME -->
        <q-card-section>
          <q-input
            dark filled
            ref="name"
            v-model="customLabelToSubmit.name"
            label="Label Name"
            placeholder="E.g: Location"
            :rules="[ val => val && val.length > 0 || 'Please input label name.',
            val => !val.includes(' ') || 'Please input only a single word. Spaces are not allowed.',
            val => this.$hf.checkAvailability(this.$hf.unavailableNames(labels), this.customLabelToSubmit.name) || 'Label name is already in use. Please choose another name.']"
          />
        </q-card-section>
        <q-card-section>
            <q-select
            dark filled
            ref="shortcutkey"
            v-model="customLabelToSubmit.shortcutkey"
            :options="availableShortkeys()"
            :options-dense="true"
            :rules="[val => val !== null && val !== '' || 'Please select a short cut.']"
            label="Short Cut Key">
        <!-- <template v-slot:append>
          <q-icon name="event" color="orange" />
        </template> -->
      </q-select>
        </q-card-section>
        <!-- <q-card-section>
            <q-select
            dark filled
            max-height="130px"
            ref="color"
            v-model="customLabelToSubmit.color"
            :options="colorOptions"
            label="Label Color"
            :rules="[val => val !== null && val !== '' || 'Please select a color.']"
            placeholder="E.g: pink-1"
            hint="Select a color from the dropdown list."
            :options-dense="true" />
        </q-card-section> -->
        <!-- COLOR PICKER -->
        <q-card-section>
          <q-input
            dark filled
            ref="color"
            v-model="customLabelToSubmit.color"
            :rules="[val => val !== null && val !== '' || 'Please select a color.',
            val => this.$hf.isHex(val) && val.length < 8 || 'Input value is not a HEX value.',
            val => this.$hf.checkAvailability(this.$hf.unavailableColors(labels), this.customLabelToSubmit.color) || 'Label color is already in use. Please choose another color.']"
            label="Label Color"
            placeholder="E.g: #26A69A"
            hint="Input desired HEX color or select from the color picker."
          >
            <template v-slot:append>
              <q-icon color="primary" name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color
                  dark bordered
                  default-value="#000000"
                  format-model="hex"
                  v-model="customLabelToSubmit.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat type="submit" label="Create" @click="submitNewLabel"/>
          <!-- <q-btn flat label="Open another dialog" @click="secondDialog = true" /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  props: ['dialog'],
  data () {
    return {
      secondDialog: false,
      customLabelToSubmit: {
        name: '',
        shortcutkey: '',
        color: ''
      }
    }
  },
  computed: {
    ...mapGetters('labels', ['labels', 'shortcutkeys']),
    ...mapState('general', ['currentUserId', 'access_token'])
  },
  methods: {
    ...mapActions('labels', ['createLabel']),
    submitNewLabel () {
      this.$refs.name.validate()
      this.$refs.color.validate()
      this.$refs.shortcutkey.validate()
      if (!this.$refs.name.hasError && !this.$refs.color.hasError && !this.$refs.shortcutkey.hasError) {
        this.submitLabel()
      }
    },
    submitLabel () {
      console.log('submitted successfully')
      this.customLabelToSubmit.name = this.$hf.toTitleCase(this.customLabelToSubmit.name)
      let cloneLabelToSubmit = { ...this.customLabelToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      let payload = {
        token: this.access_token,
        newLabel: cloneLabelToSubmit
      }
      this.createLabel(payload)
      this.$emit('close')
      this.customLabelToSubmit.name = ''
      this.customLabelToSubmit.shortcutkey = ''
    },
    close () {
      this.$emit('close')
    },
    availableShortkeys () {
      const usedKeys = this.labels.map(item => item.shortcutkey)
      const unusedKeys = this.shortcutkeys.filter(item => !usedKeys.includes(item))
      return unusedKeys
    }
  }
}
</script>

<style lang="sass">
.my-card
    width: 100%
.q-card
    background-color: $popover-background
.q-toolbar
    background-color: $toolbar-color
.q-drawer__content
    background-color: $drawer-color !important
.q-drawer
    background-color: $drawer-color
.q-page-container
    background-color: $body-background !important
.app-menu-item
    border-radius: 0 10px 10px 0
    margin-right: 12px
</style>
