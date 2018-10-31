<template>
  <v-menu offset-y v-if="userList.length > 0 && taskId !== ''">
    <v-chip slot="activator">
      <v-icon>fas fa-user</v-icon>
      Add user
    </v-chip>
    <v-list>
      <v-list-tile
        v-for="(item, index) in userList"
        :key="index"
        @click="addAsignee(item.value)"
      >
        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    task () {
      return this.$store.getters.getDisplayedTask
    },
    taskId () {
      return this.$store.state.displayTask
    },
    userList () {
      return this.$store.getters.getUnselectedUsers || {}
    }
  },
  methods: {
    addAsignee (userId) {
      const updatedTask = { ...this.task }
      updatedTask.asignee.push(userId)
      this.$store.commit('updateTask', { taskId: this.taskId, task: updatedTask })
    }
  }
}
</script>

<style>

</style>
