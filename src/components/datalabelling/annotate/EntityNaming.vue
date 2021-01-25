<template>
  <div>
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
      </q-select>
        </q-card-section>
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
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['dialog'],
  data () {
    return {
      documentToSubmit: {
        id: '1',
        text: 'Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.',
        annotations: [
          {
            id: 17,
            prob: 0.0,
            label: 4,
            start_offset: 60,
            end_offset: 70,
            user: 1,
            document: 8
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('labels', ['labels', 'shortcutkeys'])
  },
  methods: {
    ...mapActions('labels', ['addLabel'])
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
