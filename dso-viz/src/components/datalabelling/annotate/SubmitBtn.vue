<template>
  <div>
    <q-btn
      flat
      color="primary"
      label="Submit"
      v-ripple
      @click="dialog = true"
    >
    <q-tooltip anchor="bottom middle" self="center middle" :offset="[20, 20]">Submit this chunk of text and start labelling.</q-tooltip>
    </q-btn>
    <q-form>
    <q-dialog :value="dialog" persistent>
      <q-card class="popup" style="width: 30vw" bordered>
        <q-card-section class="row">
          <div class="text-h6 text-white">Confirm submission?</div>
          <q-space/>
          <q-btn v-close-popup flat round dense icon="close" color="primary" @click="dialog = false"/>
        </q-card-section>
        <q-card-section class="row text-primary">
          <q-btn class="col-6" flat type="submit" label="Yes" @click="confirmSubmission"/>
          <q-btn class="col-6 text-negative" flat type="submit" label="No" @click="dialog = false"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    </q-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
  },
  methods: {
    confirmSubmission () {
      this.dialog = false
      this.$emit('submit')
    }
  }
}
</script>

<style lang="sass">
</style>
