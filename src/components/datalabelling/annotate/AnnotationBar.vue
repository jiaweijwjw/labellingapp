<template>
<div>
    <q-bar class="row">
        <q-checkbox class="col-2" dark v-model="docStatus" label="Teal" color="teal" @input="updateStatus()"/>
        <q-space/>
        <q-chip clickable @click="onClick" class="col-2" color="primary" text-color="white" icon="cake">test</q-chip>
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
      type: String,
      default: ''
    },
    selected: {
      type: Array,
      default: () => ([])
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
    console.log(this.currentDocId)
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
        documentId: this.currentDocId
      }
      console.log(payload)
      this.updateDocStatus(payload)
    },
    onClick () {
      let test = this.selected.map(doc => doc.isMarked)
      console.log(test)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
