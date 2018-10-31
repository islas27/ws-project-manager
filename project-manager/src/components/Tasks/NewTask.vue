<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-text-field
        class="task-input"
        v-model="newTask.title"
        clearable
        prepend-icon="fas fa-check-circle"
        @click:prepend="addTask"
        @keyup.enter="addTask"
        placeholder="Write a new task"
      ></v-text-field>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  computed: {
    me () {
      return this.$store.getters.me
    }
  },
  data () {
    return {
      newTask: {
        title: '',
        owner: null
      }
    }
  },
  mounted () {
    this.clearTask()
  },
  methods: {
    addTask () {
      this.$store.dispatch('addTask', this.newTask)
      this.clearTask()
    },
    clearTask () {
      this.newTask = {
        title: '',
        owner: [this.me]
      }
    }
  }
}
</script>

<style>
  .task-input {
    width: 100%;
  }
</style>
