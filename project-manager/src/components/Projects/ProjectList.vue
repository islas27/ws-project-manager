<template>
  <v-flex xs12 m6 fill-height>
    <v-card>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>My Projects</v-toolbar-title>
      </v-toolbar>
      <v-list subheader two-line>
        <v-list-tile v-if="projects.length === 0">
          <v-list-tile-content>
            <v-list-tile-title>No Project found</v-list-tile-title>
            <v-list-tile-sub-title>why not add one using the form?</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>
        <project v-for="project in projects" :id="project.id" :key="project.id" />
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import Project from '@/components/Projects/Project'
export default {
  components: { Project },
  computed: {
    projects () {
      return this.$store.getters.getDataAsArray('projectList')
    }
  }
}
</script>

<style>

</style>
