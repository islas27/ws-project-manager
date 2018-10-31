<template>
  <v-flex xs12 m6 fill-height>
    <v-card>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>My Tasks</v-toolbar-title>
      </v-toolbar>
      <v-list subheader two-line>
        <task v-for="(task, taskId) in tasks" :id="taskId" :key="taskId" />
        <new-task />
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import Task from '@/components/Tasks/Task'
import NewTask from '@/components/Tasks/NewTask'

export default {
  components: { Task, NewTask },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  mounted () {
    this.$store.dispatch('trackTasks')
  }
}
</script>

<style>
</style>
