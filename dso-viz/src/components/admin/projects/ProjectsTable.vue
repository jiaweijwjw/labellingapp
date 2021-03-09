<template>
  <div>
    <q-table
      :data="projects"
      :columns="columns"
      :row-key="row => row.id"
      dark
      :visible-columns="visibleColumns"
      color="primary"
      class="q-toolbar"
      rows-per-page-label="Projects per page"
      :rows-per-page-options="[20, 50, 0]"
      :pagination.sync="pagination"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      no-data-label="No projects created yet."
      @row-dblclick="enterProject"
    >
    </q-table>
    <!-- <div class="q-mt-md text-white">
      Selected: {{ JSON.stringify(selected[0].id) }}
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  props: ['isCleared'],
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 10
      },
      visibleColumns: ['name', 'type', 'description'],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Project Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`, // template literals
          style: '',
          classes: 'test',
          sortable: true
        },
        {
          name: 'type',
          align: 'left',
          label: 'Type',
          field: 'proj_type',
          style: 'max-width: 50vw',
          classes: 'ellipsis',
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: 'Description',
          field: 'description',
          style: 'max-width: 50vw',
          classes: 'ellipsis',
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
    this.getProjectList(this.access_token)
  },
  computed: {
    ...mapState('general', ['currentUserId', 'currentDocId', 'access_token']),
    ...mapGetters('projects', ['projects'])
  },
  methods: {
    ...mapActions('projects', ['getProjectList']),
    ...mapActions('general', ['updateCurrentProjId']),
    getSelectedString () { // there is a @selection event
      return this.selected.length === 0 ? '' : `${this.selected.length} document${this.selected.length > 1 ? 's' : ''} selected of ${this.projects.length}`
    },
    enterProject (evt, rowProj, index) {
      console.log('enter this project')
      let details = { id: rowProj.id }
      let payload = { token: this.access_token, details: details }
      try {
        this.updateCurrentProjId(payload)
      } catch (error) {
        console.log(console.error())
      } finally {
        this.$router.push({ name: 'DocumentsPage' })
      }
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
