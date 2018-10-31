<template>
  <v-list>
    <v-list-tile v-if="!me" to="/">
      <v-list-tile-action>
        <v-icon>fas fa-home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-if="me" to="/projects">
      <v-list-tile-action>
        <v-icon>fas fa-list-alt</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Projects</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider v-if="me" inset />

    <v-subheader v-if="project.name" inset>{{project.name}}</v-subheader>

    <v-list-tile v-if="project.name" :to="`/project/${projectId}/project-dashboard`">
      <v-list-tile-action>
        <v-icon>fas fa-tachometer-alt</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Dashboard</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-if="project.name" :to="`/project/${projectId}/tasks`">
      <v-list-tile-action>
        <v-icon>fas fa-clipboard-list</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Tasks</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-if="project.name" :to="`/project/${projectId}/team`">
      <v-list-tile-action>
        <v-icon>fas fa-users</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Team</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider />
    <v-list-tile v-if="project.name" to="/about">
      <v-list-tile-action>
        <v-icon color="grey darken-1">fas fa-hand-point-right</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="grey--text text--darken-1">About</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      projectId: 123
    }
  },
  computed: {
    project () {
      return this.$store.state.project || {}
    },
    me () {
      return this.$store.getters.me
    }
  }
}
</script>

<style>
</style>
