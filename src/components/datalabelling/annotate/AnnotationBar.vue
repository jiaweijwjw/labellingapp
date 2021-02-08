<template>
<div>
    <q-bar class="row">
        <q-checkbox class="col-2" dark v-model="marked" label="Teal" color="teal"/>
        <q-space/>
        <q-chip class="col-2" color="primary" text-color="white" icon="cake">test</q-chip>
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
export default {
  props: ['marked'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>
