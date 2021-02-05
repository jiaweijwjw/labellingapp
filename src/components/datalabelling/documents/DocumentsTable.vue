<template>
  <div>
    <q-table
      :data="documents"
      :columns="columns"
      :row-key="row => row.id"
      dark
      visible-columns="['name', 'text']"
      color="primary"
      class="q-toolbar"
      rows-per-page-label="Documents per page"
      :rows-per-page-options="[20, 50, 0]"
      :pagination.sync="pagination"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"

    >
    <!-- COLORING -->
      <!-- <template v-slot:body-cell-color="props">
        <q-td :props="props">
          <div>
            <q-badge
              :style="'background-color:'+props.value+';'+'color:'+autoTextColor(props.value)+';'"
              :label="props.value"
            />
          </div>
          <div>
            {{ props.row.details }}
          </div>
        </q-td>
      </template> -->
    </q-table>
    <!-- <div class="q-mt-md text-white">
      Selected: {{ JSON.stringify(selected[0].id) }}
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Document Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`, // template literals
          style: '',
          classes: 'test',
          sortable: true
        },
        {
          name: 'text',
          align: 'left',
          label: 'Text',
          field: 'text',
          style: 'max-width: 50vw',
          classes: 'ellipsis',
          sortable: true
        }
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      ]
    }
  },
  computed: {
    ...mapGetters('documents', ['documents'])
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} document${this.selected.length > 1 ? 's' : ''} selected of ${this.documents.length}`
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
