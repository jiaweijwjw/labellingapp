<template>
  <div>
      <q-card>
          <q-card-section
          v-for="(document, index, key) in documents" :key="key" style="background-color: black; color: white">
          {{document.text}}
          <q-separator spaced color="primary" v-if="index != documents.length-1"/>
          </q-card-section>
      </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('documents', ['documents'])
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
.my-table-details
    font-size: 0.85em
    font-style: italic
    max-width: 200px
    white-space: normal
    color: #555
    margin-top: 4px
</style>
