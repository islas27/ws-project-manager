<template>
  <v-flex xs12 m6 fill-height id="date-input-anchor">
    <v-card fill-height>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title class="full-width">
          <v-text-field class="full-width" box v-if="enableInput === 'title'" v-model="inputContent" @keyup.enter="updateTask('title')" @keyup.esc="cancelInput">
            <v-icon slot="append" @click="updateTask('title')">fas fa-check-circle</v-icon>
            <v-icon slot="append" class="right-icon" @click="cancelInput">fas fa-times-circle</v-icon>
          </v-text-field>
          <span v-else @click="setInput('title')">{{task.title}}</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-responsive>
          <v-card-text>
            <div>
              Date:
              <span @click="setInput('date')">{{task.date | moment("dddd, MMMM Do YYYY") || '----'}} {{task.date | moment("hh:mm a")}}</span>
              <v-menu :close-on-content-click="false" :close-on-click="false" v-model="showDateTimePicker" attach="#date-input-anchor">
                <v-list>
                  <v-date-picker
                    :value="taskDate.date"
                    landscape
                    actions
                    @input="updateDate"
                  ></v-date-picker>
                  <v-time-picker
                    :value="taskDate.time"
                    landscape
                    format="ampm"
                    actions
                    @input="updateDate"
                  ></v-time-picker>
                  <v-btn color="success" @click="updateTask('date')" >
                    <v-icon>fas fa-check</v-icon>
                  </v-btn>
                  <v-btn color="error" @click="cancelInput" >
                    <v-icon>fas fa-times</v-icon>
                  </v-btn>
                  </v-list>
              </v-menu>
            </div>
            <div>
              notes:
              <v-textarea box v-if="enableInput === 'notes'" label="Task notes" v-model="inputContent" @keyup.enter="updateTask('notes')" @keyup.esc="cancelInput">
                <v-icon slot="append" class="textarea-icon" @click="updateTask('notes')">fas fa-check-circle</v-icon>
                <v-icon slot="append" class="textarea-icon right-icon" @click="cancelInput">fas fa-times-circle</v-icon>
              </v-textarea>
              <span v-else @click="setInput('notes')">{{task.notes || '----'}}</span>
            </div>
            <div>
              asignee:
              <user-chip v-if="task && task.asignee.length > 0" v-for="user in task.asignee" :userId="user" :key="user" />
              <add-user/>
            </div>
          </v-card-text>
        </v-responsive>
      </v-card>
    </v-card>
  </v-flex>
</template>

<script>
import UserChip from '@/components/Common/UserChip'
import AddUser from '@/components/Common/AddUser'
export default {
  components: { UserChip, AddUser },
  computed: {
    task () {
      return this.$store.getters.getDisplayedTask
    },
    taskId () {
      return this.$store.state.displayTask
    },
    showDateTimePicker () {
      return this.enableInput === 'date'
    },
    taskDate () {
      if (this.task.date && this.enableInput === 'date') {
        const dateString = this.inputContent.split('T')[0]
        const timeArray = this.inputContent.split('T')[1].split(':')
        const timeString = `${timeArray[0]}:${timeArray[1]}`
        return { date: dateString, time: timeString }
      }
      return { date: '', time: '' }
    }
  },
  data () {
    return {
      inputContent: '',
      enableInput: ''
    }
  },
  methods: {
    updateTask (section) {
      if (this.inputContent.length === 0) return
      debugger
      this.$store.dispatch('updateTask', { taskId: this.taskId, update: { [section]: this.inputContent } })
      this.cancelInput()
    },
    setInput (section) {
      if (!this.taskId) return
      if (section === 'date' && !this.task.date) {
        this.inputContent = new Date().toISOString()
      } else {
        this.inputContent = this.task[section]
      }
      this.enableInput = section
    },
    cancelInput () {
      this.inputContent = ''
      this.enableInput = ''
    },
    updateDate (data) {
      if (data.indexOf('-') !== -1) {
        const time = this.inputContent.split('T')[1]
        this.inputContent = `${data}T${time}`
      } else {
        const date = this.inputContent.split('T')[0]
        this.inputContent = `${date}T${data}`
      }
    }
  }
}
</script>

<style scoped>
  .textarea-icon {
    margin: auto;
  }
  .right-icon {
    margin-left: 0.5em;
  }
  .full-width {
    width: 100%;
  }
</style>
