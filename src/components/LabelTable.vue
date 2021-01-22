<template>
  <div>
    <q-table
      :data="labels"
      :columns="columns"
      row-key="name"
      dark
      color="primary"
      rows-per-page-label="Labels per page"
      :rows-per-page-options="[20, 50, 0]"
      :pagination="{rowsPerPage: 10}"
    >
      <template v-slot:body-cell-color="props">
        <q-td :props="props">
          <div>
            <q-badge
              color=pink
              :label="props.value"
            />
          </div>
          <div>
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Label Name',
          align: 'left',
          // field: row => row.some.nested.prop,
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'shortcutkey',
          align: 'left',
          label: 'Short Cut Key',
          field: 'shortcutkey',
          sortable: true
        },
        {
          name: 'color',
          align: 'left',
          label: 'Color',
          field: 'color',
          sortable: true
        }
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      ]
    }
  },
  computed: {
    ...mapGetters('labels', ['labels'])
  }
}
</script>

<style lang="sass" scoped>
.my-table-details
    font-size: 0.85em
    font-style: italic
    max-width: 200px
    white-space: normal
    color: #555
    margin-top: 4px
</style>
