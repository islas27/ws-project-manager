import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    userSettings: {},
    projects: {},
    currentProject: {},
    currentTeam: [],
    currentChat: [],
    currentTasks: [],
    currentCalendar: {}
  },
  mutations: {
    devData (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {

  }
})
