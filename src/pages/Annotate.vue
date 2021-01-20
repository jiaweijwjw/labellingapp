<template>
  <q-page>
    <div class="annotatingpage flex column">
      <h2 class="doc-h2 col-12">DSOViz Data Labelling</h2>
      <p class="text-white col-12">A text annotation tool for NLP.</p>
    </div>
    <div class="annotatingpage col-12">
      <labels> </labels>
    </div>
    <div class="annotatingpage col-12">
      <texteditor> </texteditor>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Annotate',
  components: {
    texteditor: require('components/TextEditor.vue').default,
    labels: require('components/Labels.vue').default
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
.annotatingpage
  width: 70vw
  max-width: 90vw
</style>
