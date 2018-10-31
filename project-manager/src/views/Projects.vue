<template>
  <v-container fill-height grid-list-lg>
    <v-layout justify-center align-center fill-height>
        <project-list></project-list>
        <project-form></project-form>
    </v-layout>
  </v-container>
</template>

<script>
import ProjectForm from '@/components/Projects/ProjectForm'
import ProjectList from '@/components/Projects/ProjectList'
export default {
  components: { ProjectForm, ProjectList }
}
</script>

<style>

</style>
