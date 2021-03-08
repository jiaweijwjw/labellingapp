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
          <q-uploader
            label="Imports"
            class="uploader"
            :factory="handleUpload"
            text-color="black"
            dark
            flat
            bordered
            accept=".txt"
            @added="fileAdded"
            @rejected="onRejected"
            @uploaded="uploaded"
            @failed="failedUpload"
            :filter="checkFileSize"
          >
            <template v-slot:header="scope">
              <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                <!-- <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                  <q-tooltip>Clear All</q-tooltip>
                </q-btn> -->
                <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                  <q-tooltip>Remove Uploaded Files</q-tooltip>
                </q-btn>
                <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                <div class="col">
                  <div class="q-uploader__title">Select your file</div>
                  <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
                </div>
                <q-btn v-if="scope.canAddFiles" type="a" icon="create_new_folder" round dense flat>
                  <q-uploader-add-trigger />
                  <q-tooltip>Pick Files</q-tooltip>
                </q-btn>
                <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat >
                  <q-tooltip>Upload Files</q-tooltip>
                </q-btn>

                <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                  <q-tooltip>Abort Upload</q-tooltip>
                </q-btn>
              </div>
            </template>
          </q-uploader>
        </q-card-section>
        <q-card-section>
          <div class="text-green" v-if="isUploaded">File successfully uploaded.</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['dialog'],
  data () {
    return {
      isUploaded: false,
      files: null,
      model: null,
      secondDialog: false,
      documentToSubmit: {
        id: '',
        name: '',
        text: '',
        annotations: []
      }
    }
  },
  computed: {
    ...mapState('general', ['access_token'])
    // ...mapGetters()
  },
  methods: {
    ...mapActions('documents', ['uploadedDocument']),
    checkFileSize (files) {
      return files.filter(file => file.size < 4096)
    },
    onRejected (rejectedEntries) {
      // https://quasar.dev/quasar-plugins/notify#Installation
      console.log(rejectedEntries)
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    close () {
      this.$emit('close')
    },
    handleUpload (files) {
      console.log(files)
      return {
        url: 'http://localhost:8000/documents/upload/',
        method: 'POST',
        headers: [{ name: 'Authorization', value: `Bearer ${this.access_token}` }],
        withCredentials: true
        // formFields: files => [{ name: 'my-field', value: 'my-value' + files.length }] use for custom document name.
      }
    },
    uploaded (info) {
      this.isUploaded = true
      console.log(this.files)
      console.log('info: ' + info)
    },
    failedUpload (info) {
      console.log(info)
    },
    fileAdded (file) {
      console.log(file)
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
