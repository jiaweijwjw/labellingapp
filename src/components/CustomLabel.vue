<template>
  <div>
    <q-btn
      flat
      color="primary"
      label="Custom Label"
      v-ripple
      @click="dialog = true"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
        >Add your own label to the list of labels below.</q-tooltip
      >
    </q-btn>
    <q-form @submit="submitNewLabel">
    <q-dialog v-model="dialog">
      <q-card style="width: 40vw" bordered>
        <q-card-section class="row">
          <div class="text-h6 text-white">New Label</div>
          <q-space />
          <q-btn v-close-popup flat round dense icon="close" color="primary"/>
        </q-card-section>
        <!-- CUSTOM LABEL NAME -->
        <q-card-section>
          <q-input
            dark filled
            ref="name"
            v-model="customLabelToSubmit.name"
            label="Label Name"
            placeholder="E.g: Location"
            :rules="[ val => val && val.length > 0 || 'Please input label name.']"
          />
        </q-card-section>
        <q-card-section>
            <q-select
            dark filled
            max-height="130px"
            ref="color"
            v-model="customLabelToSubmit.color"
            :options="options"
            label="Label Color"
            :rules="[val => val !== null && val !== '' || 'Please select a color.']"
            placeholder="E.g: pink-1"
            hint="Select a color from the dropdown list."
            :options-dense="true" />
        </q-card-section>
        <!-- COLOR PICKER -->
        <!-- <q-card-section>
          <q-input
            dark filled
            ref="color"
            v-model="customLabelToSubmit.color"
            :rules="[val => val !== null && val !== '' || 'Please select a color.']"
            label="Label Color"
            placeholder="E.g: #26A69A"
            hint="Input desired HEX color or select from the color picker."
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="customLabelToSubmit.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section> -->

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
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      secondDialog: false,
      customLabelToSubmit: {
        name: '',
        color: ''
      },
      options: [
        'pink', 'cyan', 'grey', 'deep-purple', 'indigo', 'red', 'blue', 'light-blue', 'teal', 'green', 'orange', 'brown', 'blue-grey'
      ]
    }
  },
  methods: {
    // ...mapActions('labels', ['newLabel']),
    ...mapActions('labels', ['addCustomLabel']),
    submitNewLabel () {
      this.$refs.name.validate()
      this.$refs.color.validate()
      if (!this.$refs.name.hasError && !this.$refs.color.hasError) {
        this.submitLabel()
      }
    },
    submitLabel () {
      console.log('submitted successfully')
      let cloneLabelToSubmit = { ...this.customLabelToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      this.addCustomLabel(cloneLabelToSubmit)
      this.dialog = false
      this.customLabelToSubmit.name = ''
      this.customLabelToSubmit.color = ''
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
