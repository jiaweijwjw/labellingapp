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
            :rules="[ val => val && val.length > 0 || 'Please input document name.',
            val => val.length <= 50 || 'Maximum name length is 50 characters.']"
          />
        </q-card-section>
        <q-card-section>
            <q-file
            name="upload_document"
            ref="uploaddocument"
            clearable multiple append dark filled use-chips bottom-slots
            v-model="files"
            label="Imports"
            max-files="3" counter :counter-label="counterLabelFn"
            :filter="checkFileSize"
            accept=".txt"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please select at least 1 document.']"
             @rejected="onRejected">
            <template v-slot:prepend>
                <q-icon name="create_new_folder" @click.prevent/>
            </template>
            <template v-slot:hint>
                 Maximum of 3 files per upload. File size not exceeding xxx.
                </template>
            </q-file>
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
      files: null,
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
    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`
    },
    checkFileSize (files) {
      return files.filter(file => file.size < 2048)
    },
    onRejected (rejectedEntries) {
      // https://quasar.dev/quasar-plugins/notify#Installation
      console.log(rejectedEntries)
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    submitNewDocument () {
      this.$refs.name.validate()
      this.$refs.uploaddocument.validate()
      if (!this.$refs.name.hasError && !this.$refs.uploaddocument.hasError) {
        console.log('Submit')
        console.log(this.files)
        // this.submitLabel()
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
