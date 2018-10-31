<template>
  <v-list-tile @click="selectProject">
    <v-list-tile-content >
      <v-list-tile-title>{{project.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{project.description}}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-avatar>
      <v-icon>fas fa-cog</v-icon>
    </v-list-tile-avatar>
  </v-list-tile>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    project () {
      return this.$store.state.projectList[this.id]
    }
  },
  methods: {
    selectProject() {
      this.$store.commit('selectProject', this.id)
    }
  }
}
</script>

<style>

</style>
