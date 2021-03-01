<template>
  <div>
    <q-form @submit="submitNewProject">
    <q-dialog :value="dialog" persistent>
      <q-card style="width: 40vw" bordered>
        <q-card-section class="row">
          <div class="text-h6 text-white">New Project</div>
          <q-space />
          <q-btn v-close-popup flat round dense icon="close" color="primary" @click="close"/>
        </q-card-section>
        <q-card-section>
          <q-input
            dark filled
            ref="name"
            v-model="projectToSubmit.name"
            label="Project Name"
            placeholder="E.g: myfavproject"
            :rules="[ val => val && val.length > 0 || 'Please input project name.',
            val => val.length <= 50 || 'Maximum name length is 50 characters.']"
          />
        </q-card-section>
        <q-card-section>
            <q-select
            dark filled
            ref="type"
            v-model="projectToSubmit.proj_type"
            :options="projectTypes"
            :rules="[val => val !== null && val !== '' || 'Please select a project type.']"
            label="Project Type">
            </q-select>
        </q-card-section>
        <q-card-section>
          <q-input
            dark filled
            clearable
            ref="description"
            v-model="projectToSubmit.description"
            label="Project Description"
            placeholder="E.g: i love data labelling"
            :rules="[ val => val && val.length > 0 || 'Please input project description.',
            val => val.length <= 200 || 'Maximum description length is 200 characters.']"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat type="submit" label="Create" @click="submitNewProject"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['dialog'],
  data () {
    return {
      files: null,
      model: null,
      secondDialog: false,
      projectToSubmit: {
        name: '',
        proj_type: '',
        description: '',
        user_id: null
      },
      projectTypes: ['Sequence Labelling', 'Document Classification']
    }
  },
  computed: {
    ...mapState('general', ['currentUserId', 'access_token'])
  },
  methods: {
    ...mapActions('projects', ['createProject']),
    submitNewProject () {
      this.$refs.name.validate()
      this.$refs.type.validate()
      this.$refs.description.validate()
      if (!this.$refs.name.hasError && !this.$refs.type.hasError && !this.$refs.description.hasError) {
        console.log('Created new project')
        this.submitProject()
      }
    },
    submitProject () {
      console.log('submitted project successfully')
      this.projectToSubmit.user_id = this.currentUserId
      let cloneProjectToSubmit = { ...this.projectToSubmit } // THIS LINE IS IMPT TO NOT COPY BY REFERENCE.
      console.log(cloneProjectToSubmit, this.access_token)
      const payload = {
        project: cloneProjectToSubmit,
        token: this.access_token
      }
      this.createProject(payload)
      this.$emit('close')
      this.projectToSubmit.name = ''
      this.projectToSubmit.proj_type = ''
      this.projectToSubmit.description = ''
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass">
.my-card
    width: 100%
.q-card
    background-color: $popover-background
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
