import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const generateKey = () => Math.random().toString(36).substr(2, 5)

export default new Vuex.Store({
  state: {
    user: {},
    userSettings: {},
    projectList: {},
    project: {},
    team: {},
    tasks: {},
    displayTask: ''
  },
  getters: {
    me: state => state.user.id,
    getUserById: state => id => state.team[id],
    getTaskById: state => id => state.tasks[id],
    getDisplayedTask: state => state.tasks[state.displayTask] || {},
    getUnselectedUsers: state => {
      const selected = (state.tasks[state.displayTask] || {}).asignee
      const unselectedIds = Object.keys(state.team)
        .filter(userId => (selected || []).indexOf(userId) === -1)
      return unselectedIds.map(id => ({ value: id, text: state.team[id].fullName }))
    }
  },
  mutations: {
    devData (state, data) {
      Object.keys(data).forEach(key => {
        state[key] = data[key]
      })
    },
    addTask (state, payload) {
      const key = generateKey()
      const task = { date: '', notes: '', asignee: [], done: false, ...payload }
      Vue.set(state.tasks, key, task)
      state.displayTask = key
    },
    updateTask (state, { taskId, task }) {
      Vue.set(state.tasks, taskId, task)
    },
    addProject (state, project) {
      const key = generateKey()
      Vue.set(state.projectList, key, project)
    },
    addTeamMembers (state, user) {
      Vue.set(state.team, user.id, user)
    },
    setDisplayTask (state, taskId) {
      state.displayTask = taskId
    }
  },
  actions: {

  }
})
