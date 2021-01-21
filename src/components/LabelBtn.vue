<template>
  <div class="row justify-center">
      <q-btn class="q-ma-xs col-2"
      v-for="(labelbtn, key) in labels"
        :key="key"
        clickable
        v-ripple
        :label="labelbtn.name"
        :color="labelbtn.color" />
      <!-- <q-btn class="q-ma-xs col-2"
      v-for="(customlabelbtn, key) in customLabels"
        :key="key"
        clickable
        v-ripple
        :label="customlabelbtn.name"
        :color="customlabelbtn.color" /> -->
      <!-- <q-btn class="q-ma-xs col-2" color="secondary" icon-right="mail" label="On Right" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  // computed: {
  //   LabelBtns () {
  //     return this.$store.getters['labels/labels'] // labels module (index.js) and labels getter (store-labels.js)
  //   },
  //   CustomLabelBtns () {
  //     return this.$store.getters['labels/customLabels']
  //   }
  // }
  computed: {
    ...mapGetters('labels', ['labels'])
  }
}
</script>

<style lang="sass" scoped>
</style>
