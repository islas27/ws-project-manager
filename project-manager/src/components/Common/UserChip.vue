<template>
  <v-chip close @input="removeAsignee">
    <v-avatar>
      <img :src="user.avatar" :alt="user.fullName">
    </v-avatar>
    {{user.fullName}}
  </v-chip>
</template>

<script>
export default {
  props: ['userId'],
  computed: {
    user () {
      return this.$store.getters.getUserById(this.userId) || {}
    },
    task () {
      return this.$store.getters.getDisplayedTask
    },
    taskId () {
      return this.$store.state.displayTask
    }
  },
  methods: {
    removeAsignee () {
      const updatedTask = { ...this.task }
      updatedTask.asignee = updatedTask.asignee.filter(user => user !== this.userId)
      this.$store.commit('updateTask', { taskId: this.taskId, task: updatedTask })
    }
  }
}
</script>

<style>

</style>
