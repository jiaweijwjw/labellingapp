<template>
  <q-page>
    <div style="width: 70vw; max-width: 90vw;" class="flex flex-center row">
      <h2 class="doc-h2 col-12">DSOViz Data Labelling</h2>
      <p class="text-white col-12">A text annotation tool for NLP.</p>
    </div>
    <div class="col-12 text-black" style="width: 70vw; max-width: 90vw;">
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Labelling',
  data () {
    return { editor: '  Input text here to be annotated.' }
  },
  methods: {
    saveWork () {
      this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    uploadIt () {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      })
    }
  }
}
</script>

<style lang="sass">
  .doc-h2
    border-bottom: 1px solid #ccc
    font-size: 1.5rem
    line-height: 1.5rem
    padding: 0.5rem 0
    font-weight: 400
    color: $primary
    margin: 4rem 0 1.5rem
</style>
