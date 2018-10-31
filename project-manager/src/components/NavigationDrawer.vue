<template>
  <v-list>
    <v-list-tile to="/projects">
      <v-list-tile-action>
        <v-icon>fas fa-list-alt</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Projects</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/settings">
      <v-list-tile-action>
        <v-icon>fas fa-wrench</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider inset />

    <v-subheader inset>My Start-up</v-subheader>

    <v-list-tile :to="`/project/${projectId}/project-dashboard`">
      <v-list-tile-action>
        <v-icon>fas fa-tachometer-alt</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Dashboard</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="`/project/${projectId}/tasks`">
      <v-list-tile-action>
        <v-icon>fas fa-clipboard-list</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Tasks</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!--<v-list-tile :to="`/project/${projectId}/calendar`">
      <v-list-tile-action>
        <v-icon>fas fa-calendar-alt</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Calendar</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile> -->
    <v-list-tile :to="`/project/${projectId}/team`">
      <v-list-tile-action>
        <v-icon>fas fa-users</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Team</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <!-- <v-list-tile :to="`/project/${projectId}/chats`">
      <v-list-tile-action>
        <v-icon>fas fa-comments</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Chats</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile> -->
    <v-divider />
    <v-list-tile to="/about">
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
  }
}
</script>

<style>
</style>
