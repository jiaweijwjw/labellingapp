<template>
<div class="q-pa-md column">
    <q-bar class="q-toolbar text-white">
      <div class="cursor-pointer non-selectable">
        Import File
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>test</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>JSON</q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable>
              <q-item-section>Preferences</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>

              <q-menu anchor="top end" self="top start">
                <q-list>
                  <q-item
                    v-for="n in 3"
                    :key="n"
                    dense
                    clickable
                  >
                    <q-item-section>Submenu Label</q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                    <q-menu auto-close anchor="top end" self="top start">
                      <q-list>
                        <q-item
                          v-for="n in 3"
                          :key="n"
                          dense
                          clickable
                        >
                          <q-item-section>3rd level Label</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>

            <q-separator />
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        Add Label
        <q-menu auto-close>
            <q-item clickable>
              <q-item-section>Cut</q-item-section>
            </q-item>
        </q-menu>
      </div>

      <q-space />
    </q-bar>
<!-- LABEL DEFAULT OPTIONS -->
      <q-card class="col-12 my-card">
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return { lorem: ' testing' }
  },
  // props: ['options'],
  methods: {

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
</style>
