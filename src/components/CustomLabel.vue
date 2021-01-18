<template>
  <div>
    <q-btn flat color="primary" label="Custom Label" v-ripple @click="dialog = true">
    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Add your own label to the list of labels below.</q-tooltip>
    </q-btn>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">New Label</div>
        </q-card-section>
        <!-- CUSTOM LABEL NAME -->
        <q-card-section>
            <q-input filled v-model="customLabelName" label="Label Name" placeholder="E.g: Location" />
        </q-card-section>
        <!-- COLOR PICKER -->
      <q-card-section>
          <q-input
        filled
        v-model="customLabelColor"
        :rules="['anyColor']"
        hint="Input desired HEX color or select from the color picker."
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="customLabelColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Create"/>
          <!-- <q-btn flat label="Open another dialog" @click="secondDialog = true" /> -->
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      secondDialog: false,
      customLabelName: '',
      customLabelColor: '#26A69A'
    }
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
  .q-page-container
    background-color: $body-background !important
  .app-menu-item
    border-radius: 0 10px 10px 0
    margin-right: 12px
  .my-input
    max-width: 250px
</style>
