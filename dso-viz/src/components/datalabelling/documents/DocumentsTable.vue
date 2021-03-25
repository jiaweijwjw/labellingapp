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
      visibleColumns: ['name', 'text', 'status', 'sentiment'],
      standardColumns: [
        {
          name: 'name',
          required: true,
          label: 'Document Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`, // template literals
          style: '',
          classes: '',
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
        },
        {
          name: 'status',
          label: 'Checked?',
          align: 'left',
          field: row => row.is_marked ? 'Yes' : 'No',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    console.log('doc table mounted')
    this.getDocumentList(this.access_token)
    if (this.currentProjType === 'Document Classification') {
      this.columns = {
        name: 'sentiment',
        label: 'Sentiment',
        align: 'left',
        field: row => {
          if (row.sentiment !== null) {
            return row.sentiment
          } else {
            return ''
          }
        },
        sortable: true
      }
    }
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
    ...mapState('general', ['currentUserId', 'access_token']),
    ...mapState('documents', ['currentDocId']),
    ...mapGetters('documents', ['documents']),
    ...mapGetters('projects', ['currentProjType']),
    columns: {
      get: function () { return this.standardColumns },
      set: function (additionalColObj) {
        return this.standardColumns.push(additionalColObj)
      }
    },
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
