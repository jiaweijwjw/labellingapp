<template>
    <div class="q-pa-md bg-grey-10 text-white">
      <q-input
      class="editorstyle"
      v-model="text"
      outlined
      dark filled
      color="black"
      type="textarea"
      rows="10"
      stack-label
      clearable
      placeholder= ' Input text here.'
      hint= '  Paste text paragraph here or select the import from file option.'
      clear-icon="close"
      />
    </div>
</template>

<script>
// import { PolarArea, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins

export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="sass">
  .editorstyle
    color: $primary
</style>
