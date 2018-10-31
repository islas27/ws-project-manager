<template>
  <v-container fill-height grid-list-lg>
    <v-layout row fill-height>
      <task-list />
      <task-detail />
    </v-layout>
  </v-container>
</template>

<script>
import TaskList from '@/components/Tasks/TaskList'
import TaskDetail from '@/components/Tasks/TaskDetail'

export default {
  components: { TaskList, TaskDetail }
}
</script>

<style>

</style>
