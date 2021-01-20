<template>
  <q-page>
    <div class="labelspage flex row q-pa-md">
      <q-btn-dropdown color="primary" label="Actions" class="col-2 max-width=20vw">
      <q-list separator>
        <q-item clickable v-close-popup @click="dialog = true">
          <q-item-section>
            <q-item-label>Create New Label</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Import Label</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Export Label</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    </div>
    <!-- TABLE -->
    <div class="labelspage q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    />
  </div>
  <div>
      <customlabel v-if="dialog" :dialog="dialog" @close="dialog = false"></customlabel>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Annotate',
  components: {
    customlabel: require('components/CustomLabel.vue').default
  },
  data () {
    return {
      dialog: false,
      columns: [
        {
          name: 'labelname',
          required: true,
          label: 'Label Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'shortcutkey', align: 'left', label: 'Short Cut Key', field: 'shortcutkey', sortable: true },
        { name: 'color', align: 'left', label: 'Color', field: 'color', sortable: true }
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      ],
      data: [
        {
          name: 'Person',
          shortcutkey: 'p',
          color: 159
        },
        {
          name: 'Location',
          shortcutkey: 'l',
          color: 237
        },
        {
          name: 'Organization',
          shortcutkey: 'o',
          color: 262
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.doc-h2
  border-bottom: 1px solid #ccc
  font-size: 1.5rem
  line-height: 1.5rem
  padding: 0.5rem 0
  font-weight: 400
  color: $primary
  margin: 4rem 0 1.5rem
.labelspage
  width: 80vw
  max-width: 90vw
</style>
