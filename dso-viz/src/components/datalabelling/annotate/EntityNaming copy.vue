<template>
  <div class="q-pa-md">
      <q-card class="q-toolbar text-white" bordered>
        <q-card-section>
          <div class="color: white">{{text}}</div>
        </q-card-section>
      </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true
    },
    annotations: {
      type: Array,
      default: () => ([]),
      required: true
    },
    labels: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {
      documentToSubmit: {
        id: '1',
        text: 'Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.',
        annotations: [
          {
            id: 17,
            prob: 0.0,
            label: 4,
            start_offset: 60,
            end_offset: 70,
            user: 1,
            document: 8
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('documents', ['documents'])
    // text: {
    //   // getter
    //   get: function () {
    //     return this.inputText
    //   },
    //   // setter
    //   set: function (userInputValue) {
    //     this.updateInputText(userInputValue)
    //   }
    // }
  },
  methods: {
    ...mapActions('labels', ['addLabel'])
  }
}
</script>

<style lang="sass">
</style>
