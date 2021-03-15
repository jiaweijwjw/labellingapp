<template>
<div>
    <q-bar class="row">
        <q-checkbox class="col-2" dark v-model="docStatus" :label="this.status ? 'Checked' : 'Unchecked'" color="primary" @input="updateStatus()"/>
        <q-space/>
        <q-btn flat class="col-1" @click="dialog = true"><q-icon name="menubook"/></q-btn>
    </q-bar>
    <div>
    <q-dialog v-model="dialog">
        <q-card dark style="width:50vw; max-width:70vw">
        <q-card-section>
          <div class="text-h6">Annotation Guideline</div>
        </q-card-section>

        <q-card-section class="q-toolbar text-white q-pa-md">
          Type some guideline here.
        </q-card-section>

        <q-card-actions class="q-toolbar" align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    marked: {
      type: Boolean
    },
    currentDocId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      status: false,
      dialog: false
    }
  },
  mounted () {
    this.docStatus = this.marked
  },
  computed: {
    docStatus: { //  IMPORTANT. Need getters and setter if v-model computed property.
      get: function () {
        return this.status
      },
      set: function (marked) {
        this.status = marked
      }
    }
  },
  methods: {
    ...mapActions('documents', ['updateDocStatus']),
    updateStatus () {
      let payload = {
        newStatus: this.docStatus,
        documentId: this.currentDocId,
        token: this.$store.state.general.access_token
      }
      this.updateDocStatus(payload)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
