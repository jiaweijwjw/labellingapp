<template>
<div>
    <q-bar class="row">
        <q-btn class="col-2" @click="dialog = true"><q-icon name="menubook"/></q-btn>
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
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
