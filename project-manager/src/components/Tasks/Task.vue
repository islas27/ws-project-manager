<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-checkbox :value="task.done" @click.stop="action"></v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content @click="showDetails">
      <v-list-tile-title>{{task.title}}</v-list-tile-title>
      <v-list-tile-sub-title>{{task.notes}}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-avatar>
      <img :src="avatar" alt="avatar">
    </v-list-tile-avatar>
  </v-list-tile>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    task () {
      return this.$store.getters.getTaskById(this.id) || { done: false }
    },
    avatar () {
      const user = this.$store.getters.getUserById(this.task.owner)
      if (user) {
        return user.avatar
      }
      return 'https://placeimg.com/640/640/people/'
    }
  },
  methods: {
    showDetails () {
      this.$store.commit('setDisplayTask', this.id)
    },
    action () {
      const updatedTask = { ...this.task, done: !this.task.done }
      this.$store.commit('updateTask', { taskId: this.id, task: updatedTask })
    }
  }
}
</script>

<style>

</style>
