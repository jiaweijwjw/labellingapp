<template>
  <div>
    <q-table
      :data="whichDocuments"
      :columns="columns"
      :row-key="row => row.id"
      dark
      :visible-columns="visibleColumns"
      color="primary"
      class="q-toolbar"
      rows-per-page-label="Documents per page"
      :rows-per-page-options="[20, 50, 0]"
      :pagination.sync="pagination"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      no-data-label="No documents to show."
    >
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  props: ['isInProject', 'isCleared'],
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 10
      },
      visibleColumns: ['name', 'text'],
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
          field: 'content',
          style: 'max-width: 50vw',
          classes: 'ellipsis',
          sortable: true
        }
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      ]
    }
  },
  mounted () {
    console.log('doc table mounted')
    this.getDocumentList(this.access_token)
  },
  destroyed: function () {
    console.log('doc table destroyed')
  },
  watch: {
    selected: function (newSelection, oldSelection) {
      if (newSelection.length === 0) {
        console.log('clear selection')
        this.$emit('clearSelection')
      } else if (newSelection.length > 0) {
        console.log('emit new selections')
        let selectedDocsId = this.selected.map(doc => doc.id)
        this.$emit('updateSelection', selectedDocsId)
      }
    },
    isCleared: function (newVal, OldVal) {
      if (newVal === true) {
        this.selected = []
      }
    }
  },
  computed: {
    ...mapState('general', ['currentUserId', 'currentDocId', 'access_token']),
    ...mapGetters('documents', ['documents']),
    whichDocuments () {
      if (this.isInProject === true) {
        return this.documents
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions('documents', ['getDocumentList']),
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} document${this.selected.length > 1 ? 's' : ''} selected of ${this.documents.length}`
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
