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
import ProjectService from '../../../services/project.service'

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
    this.getProjectList()
  },
  computed: {
    ...mapState('general', ['currentUserId', 'currentDocId', 'access_token']),
    ...mapGetters('projects', ['projects'])
  },
  methods: {
    ...mapActions('projects', ['getProjectList']),
    ...mapActions('general', ['updateCurrentProjId']),
    getSelectedString () { // there is a @selection event
      return this.selected.length === 0 ? '' : `${this.selected.length} project${this.selected.length > 1 ? 's' : ''} selected of ${this.projects.length}`
    },
    // async enterProject (evt, rowProj, index) {
    //   this.$hf.showLoadingForTime(3000)
    //   let details = { id: rowProj.id }
    //   let payload = { token: this.access_token, details: details }
    //   const updateCurrentProjIdPromise = await this.updateCurrentProjId(payload)
    //   console.log(updateCurrentProjIdPromise)
    //   updateCurrentProjIdPromise.then(() => {
    //     ProjectService.getProject(this.access_token, rowProj.id)
    //       .then(res => {
    //         this.loadProject(res)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   })
    //   // ProjectService.getProject(this.access_token, rowProj.id)
    //   //   .then(res => {
    //   //     this.loadProject(res)
    //   //   })
    // },
    async enterProject (evt, rowProj, index) {
      this.$hf.showLoadingForTime(3000)
      let details = { id: rowProj.id }
      this.updateCurrentProjId(details)
        .then(() => {
          ProjectService.getProject(rowProj.id)
            .then(res => {
              this.loadProject(res)
            })
            .catch(err => {
              console.log(err)
            })
        })
    },
    async loadProject (res) {
      console.log(res.data)
      let documents = res.data.documents
      let labels = res.data.labels
      let activeDocumentsId = res.data.active_documents.map(item => item.document_id)
      let currentSelectedDocsId = activeDocumentsId
      let currentDocId = res.data.current_doc_id
      this.$store.dispatch('documents/setCurrentSelectedDocsId', currentSelectedDocsId)
      this.$store.dispatch('documents/setCurrentDocId', currentDocId)
      if (!documents && !labels) {
        this.$q.loading.hide()
        this.$router.push({ name: 'DocumentsPage' })
      } else if (!documents && labels) {
        const labelPromise = this.$store.dispatch('labels/setLabels', labels)
        labelPromise.then(res => {
          this.$q.loading.hide()
          this.$router.push({ name: 'DocumentsPage' })
        })
      } else if (documents && !labels) {
        const docPromise = this.$store.dispatch('documents/setDocuments', documents)
        docPromise.then(res => {
          this.$q.loading.hide()
          if (!currentDocId) {
            this.$router.push({ name: 'DocumentsPage' })
          } else {
            this.$router.push({ name: 'AnnotatePage' })
          }
        })
      } else {
        const labelPromise = this.$store.dispatch('labels/setLabels', labels)
        const docPromise = this.$store.dispatch('documents/setDocuments', documents)
        Promise.all([labelPromise, docPromise])
          .then(res => {
            this.$q.loading.hide()
            if (!currentDocId) {
              this.$router.push({ name: 'DocumentsPage' })
            } else {
              this.$router.push({ name: 'AnnotatePage' })
            }
          })
      }
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
