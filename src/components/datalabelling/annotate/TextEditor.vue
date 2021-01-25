<template>
    <div class="q-pa-md bg-grey-10 text-white">
      <q-input
      class="editorstyle"
      v-model="text"
      outlined
      dark filled
      color="black"
      type="textarea"
      rows="10"
      stack-label
      clearable
      placeholder= ' Input text here.'
      hint= '  Paste text paragraph here or select the import from file option.'
      clear-icon="close"
      />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      // Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  },
  props: {
    // text: {
    //   type: String,
    //   default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //   required: true
    // }
  },
  methods: {
    ...mapActions('documents', ['updateInputText'])
  },
  components: {

  },
  computed: {
    ...mapState('documents', ['InputText']), // v-model a computed property requires a setter.
    text: {
      // getter
      get: function () {
        return this.InputText
      },
      // setter
      set: function (userInputValue) {
        this.updateInputText(userInputValue)
      }
    }
  }
}
</script>

<style lang="sass">
  .editorstyle
    color: $primary
</style>
