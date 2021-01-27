<template>
  <q-page>
    <div class="documentspage flex row q-pa-md">
      <documentlist/>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'LabelsPage',
  components: {
    documentlist: require('components/datalabelling/documents/DocumentList.vue').default
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
.documentspage
  width: 80vw
  max-width: 80vw
</style>
