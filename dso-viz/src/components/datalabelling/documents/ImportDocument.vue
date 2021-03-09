<template>
  <div>
    <q-form>
    <q-dialog :value="dialog" persistent>
      <q-card style="width: 40vw" bordered>
        <q-card-section class="row">
          <div class="text-h6 text-white">New Document</div>
          <q-space />
          <q-btn v-close-popup flat round dense icon="close" color="primary" @click="close"/>
        </q-card-section>
        <q-card-section>
          <q-input
            dark filled
            ref="name"
            v-model="documentName"
            label="Document Name"
            placeholder="E.g: All about Singapore"
            :rules="[ val => val && val.length > 0 || 'Please input document name.',
            val => val.length <= 50 || 'Maximum name length is 50 characters.']"
            lazy-rules
          />
        </q-card-section>
        <q-card-section>
            <q-file
            name="upload_document"
            ref="uploaddocument"
            clearable multiple append dark filled use-chips bottom-slots
            v-model="files"
            label="Imports"
            :filter="checkFileSize"
            accept=".txt"
            :rules="[ val => val && val.length >= 1 || 'Please select a document']"
            lazy-rules="ondemand"
            @rejected="onRejected">
            <template v-slot:prepend>
                <q-icon name="create_new_folder" @click.prevent/>
            </template>
            <template v-slot:hint>
                 Maximum of 3 files per upload. File size not exceeding xxx.
                </template>
            </q-file>
        </q-card-section>
        <q-card-actions align="left" class="text-primary">
          <div class="text-green" v-if="uploading && uploadSuccessful">File successfully uploaded.</div>
          <div class="text-red" v-if="uploading && !uploadSuccessful">Upload unsuccessful.</div>
          <q-space/>
          <q-btn flat type="submit" label="Reset" @click="resetForm"/>
          <q-btn flat type="submit" label="Import" @click="submitNewDocument"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DocumentService from '../../../services/document.service'

export default {
  props: ['dialog'],
  data () {
    return {
      uploadSuccessful: false,
      uploading: false,
      files: null,
      secondDialog: false,
      documentName: ''
    }
  },
  computed: {
    ...mapState('general', ['access_token'])
    // ...mapGetters()
  },
  methods: {
    ...mapActions('documents', ['uploadDocument']),
    checkFileSize (files) {
      return files.filter(file => file.size < 4096)
    },
    // clearable multiple append dark filled use-chips bottom-slots
    // max-files="3" counter :counter-label="counterLabelFn"
    // counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
    //   return `${filesNumber} files of ${maxFiles} | ${totalSize}`
    // },
    onRejected (rejectedEntries) {
      // https://quasar.dev/quasar-plugins/notify#Installation
      console.log(rejectedEntries)
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    close () {
      this.uploading = false
      this.uploadSuccessful = false
      this.$emit('close')
    },
    submitNewDocument () {
      this.uploading = true
      this.$refs.name.validate()
      this.$refs.uploaddocument.validate()
      if (!this.$refs.name.hasError && !this.$refs.uploaddocument.hasError) {
        // this.uploadDocument(this.files)
        DocumentService.uploadDocument(this.access_token, this.documentName, this.files)
          .then(res => {
            this.uploadSuccessful = true
            this.reset()
          })
          .catch(error => {
            console.log(error.response.status)
            this.uploadSuccessful = false
          })
      }
    },
    resetForm () {
      this.reset()
      this.uploadSuccessful = false
      this.uploading = false
    },
    reset () {
      this.documentName = ''
      this.files = null
      this.$refs.name.resetValidation()
      this.$refs.uploaddocument.resetValidation()
    }
  }
}
</script>

<style lang="sass">
.uploader
    margin-left: 0px
    margin-right: 0px
    width: 100%
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
