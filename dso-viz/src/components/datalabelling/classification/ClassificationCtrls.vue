<template>
  <div class="q-py-md column">
    <q-card class="col-12 my-card bg-grey-4">
      <q-card-section>
        <classificationbtn
        :classifyBtns="classifyBtns"
        :classifyDocument="classifyDocument">
        </classificationbtn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    classifyDocument: {
      type: Function,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
  },
  computed: {
    ...mapGetters('classify', ['classifyBtns'])
  },
  components: {
    classificationbtn: require('components/datalabelling/classification/ClassificationBtn.vue').default
  }
}
</script>

<style lang="sass">
.my-card
  width: 100%
.q-toolbar
  background-color: $toolbar-color
.q-drawer__content
  background-color: $drawer-color !important
.q-drawer
  background-color: $drawer-color
  q-page-container
  background-color: $body-background !important
.app-menu-item
  border-radius: 0 10px 10px 0
  margin-right: 12px
</style>
