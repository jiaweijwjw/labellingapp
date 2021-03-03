<template>
  <q-page class="page projects-page">
    <div class="page-item row q-py-md">
      <q-btn
      flat
      text-color="primary"
      label="New Project"
      class="col-2 max-width=20vw"
      @click="dialog = true">
      </q-btn>
      <q-btn v-if="isSelected" class="col-2 max-width=20vw" label="Delete Selected" flat text-color="primary" @click="deleteSelected">
      </q-btn>
    </div>
    <div class="page-item table-container">
      <projectstable @clearSelected="clearSelectedProjs" @updateSelected="updateSelectedProjs($event)"/>
    </div>
    <q-btn type="submit" color="primary" label="check selection" @click="checkselection"/>
    <div>
      <newproject
        v-if="dialog"
        :dialog="dialog"
        @close="dialog = false"
      ></newproject>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
// import ProjectService from '../../services/project.service'
export default {
  name: 'ProjectsPage',
  components: {
    newproject: require('components/admin/projects/NewProject.vue').default,
    projectstable: require('components/admin/projects/ProjectsTable.vue').default
    // documentlist: require('components/datalabelling/documents/DocumentList.vue').default,
    // texteditor: require('components/datalabelling/annotate/TextEditor.vue').default,
    // submitbtn: require('components/datalabelling/annotate/SubmitBtn.vue').default
  },
  data () {
    return {
      selected: [],
      dialog: false,
      allprojs: []
    }
  },
  computed: {
    ...mapState('documents', ['inputText']),
    ...mapGetters('documents', ['currentDoc']),
    ...mapState('general', ['currentUserId', 'currentProjId', 'access_token']),
    ...mapGetters('general', ['getAccessToken']),
    isSelected: function () {
      if (this.selected.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('documents', ['addDocument', 'updateInputText', 'updateSelected']),
    ...mapActions('projects', ['getProjectList', 'deleteSelectedProjects']),
    deleteSelected () {
      let payload = { token: this.access_token, selectedProjsId: this.selected }
      this.deleteSelectedProjects(payload) // Only when user starts annotating then update annotate page.
    },
    updateSelectedProjs (selectedProjsId) { // to keep track of selected documents in documents table
      this.selected = selectedProjsId
      console.log(this.selected)
    },
    clearSelectedProjs () {
      this.selected = []
      console.log(this.selected)
    },
    addToDocuments () {
      console.log('submitted document successfully')
      let cloneDocumentToSubmit = { ...this.documentToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      cloneDocumentToSubmit.text = this.inputText
      this.addDocument(cloneDocumentToSubmit)
      this.documentToSubmit.text = ''
      this.documentToSubmit.annotations = []
      // console.log(cloneDocumentToSubmit)
      let arr = ['a', 'b', 'c', 'd', 'e']
      console.log(arr.slice(0, -1))
      console.log(this.currentDoc.text.split('\n'))
      this.updateInputText('') // clear the textfield after user submission
    },
    checkselection () {
      console.log(this.selected)
    }
  }
}
</script>

<style lang="sass">
.table-container
.page
  display: flex
  flex-flow: column
  align-content: center
  align-items: center
  width: 1800px
  max-width: 100vw
  height: 100%
.page-item
  display: block
  width: 85vw
  max-width: 100vw
.projects-page
  background-color: $body-background
</style>
