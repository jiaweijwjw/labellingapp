<template>
  <div class="row justify-center">
      <q-btn class="q-ma-xs col-2"
      :color="labelbtn.btncolor"
      v-for="labelbtn in LabelBtns"
        :key="labelbtn.id"
        clickable
        v-ripple
        :label="labelbtn.name" />
      <q-btn class="q-ma-xs col-2" color="secondary" icon-right="mail" label="On Right" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      LabelBtns: [
        {
          id: 1,
          name: 'Person',
          btncolor: 'pink'
        },
        {
          id: 2,
          name: 'Location',
          btncolor: 'pink-2'
        },
        {
          id: 3,
          name: 'Date',
          btncolor: 'pink-3'
        },
        {
          id: 4,
          name: 'Organisation',
          btncolor: 'pink-4'
        },
        {
          id: 5,
          name: 'Filler1',
          btncolor: 'pink-5'
        },
        {
          id: 6,
          name: 'Filler2',
          btncolor: 'pink-6'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
