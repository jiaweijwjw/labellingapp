<template>
  <div class="row justify-center">
      <q-btn class="q-ma-xs col-2"
      :color="labelbtn.btncolor"
      v-for="labelbtn in labels"
        :key="labelbtn.id"
        clickable
        v-ripple
        :label="labelbtn.name" />
      <q-btn class="q-ma-xs col-2" color="secondary" icon-right="mail" label="On Right" />
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
  //   }
  // }
  computed: {
    ...mapGetters('labels', ['labels'])
  }
}
</script>

<style lang="sass" scoped>
</style>
