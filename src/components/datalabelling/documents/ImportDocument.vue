<template>
  <div>
    <q-form @submit="submitNewDocument">
    <q-dialog :value="dialog" persistent>
      <q-card style="width: 40vw" bordered>
        <q-card-section class="row">
          <div class="text-h6 text-white">New Document</div>
          <q-space />
          <q-btn v-close-popup flat round dense icon="close" color="primary" @click="close"/>
        </q-card-section>
        <!-- CUSTOM DOCUMENT NAME -->
        <q-card-section>
          <q-input
            dark filled
            ref="name"
            v-model="documentToSubmit.name"
            label="Document Name"
            placeholder="E.g: All about Singapore"
            :rules="[ val => val && val.length > 0 || 'Please input document name.']"
          />
        </q-card-section>
        <q-card-section>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat type="submit" label="Import" @click="submitNewDocument"/>
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
      file: null,
      model: null,
      secondDialog: false,
      documentToSubmit: {
        id: '',
        name: '',
        text: '',
        annotations: []
      },
      customLabelToSubmit: {
        id: '',
        name: '',
        shortcutkey: '',
        color: ''
      }
    }
  },
  computed: {
    ...mapGetters('labels', ['labels', 'shortcutkeys'])
  },
  methods: {
    ...mapActions('labels', ['addLabel']),
    submitNewDocument () {
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
      this.addLabel(cloneLabelToSubmit)
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
