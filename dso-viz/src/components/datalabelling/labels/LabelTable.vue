<template>
  <div>
    <q-table
      :data="labels"
      :columns="columns"
      :row-key="row => row.id"
      dark
      :visible-columns="visibleColumns"
      color="primary"
      class="q-toolbar"
      rows-per-page-label="Labels per page"
      :rows-per-page-options="[20, 50, 0]"
      :pagination.sync="pagination"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      no-data-label="No labels created yet."
    >
    <!-- COLORING -->
      <template v-slot:body-cell-color="props">
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
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  props: ['isCleared'],
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 10
      },
      visibleColumns: ['name', 'shortcutkey', 'color'],
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
  watch: {
    selected: function (newSelection, oldSelection) {
      if (newSelection.length === 0) {
        console.log('clear selection')
        this.$emit('clearSelection')
      } else if (newSelection.length > 0) {
        console.log('emit new selections')
        let selectedProjsId = this.selected.map(proj => proj.id)
        this.$emit('updateSelection', selectedProjsId)
      }
    },
    isCleared: function (newVal, OldVal) {
      if (newVal === true) {
        this.selected = []
      }
    }
  },
  mounted () {
    this.getLabelList(this.access_token)
  },
  computed: {
    ...mapState('general', ['currentUserId', 'currentDocId', 'access_token']),
    ...mapGetters('labels', ['labels'])
  },
  methods: {
    ...mapActions('labels', ['getLabelList']),
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    getSelectedString () { // there is a @selection event
      return this.selected.length === 0 ? '' : `${this.selected.length} document${this.selected.length > 1 ? 's' : ''} selected of ${this.labels.length}`
    }
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
