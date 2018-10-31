import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import config from './config'
require('firebase/auth')
require('firebase/firestore')

firebase.initializeApp(config)
const db = firebase.firestore()
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

Vue.use(Vuex)

const generateKey = () => Math.random().toString(36).substr(2, 5)

export default new Vuex.Store({
  state: {
    auth: firebase.auth,
    db,
    observers: {},
    user: {},
    userSettings: {},
    projectList: {},
    project: {},
    team: {},
    tasks: {},
    displayTask: ''
  },
  getters: {
    me: state => (state.user || {}).uid,
    getUserById: state => id => state.team[id],
    getTaskById: state => id => state.tasks[id],
    getDataAsArray: state => stateKey => Object.keys(state[stateKey]).map(key => ({ id: key, ...state[stateKey][key] })),
    getDisplayedTask: state => (state.tasks || {})[state.displayTask] || {},
    getUnselectedUsers: state => {
      if (state.displayTask === '') return []
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
    recordUser (state) {
      Vue.set(state, 'user', state.auth().currentUser)
    },
    storeObserver (state, payload) {
      const key = Object.keys(payload)[0]
      Vue.set(state.observers, key, payload[key])
    },
    dropObserver (state, key) {
      const unsubscribe = state.observers[key]
      const observersToKeep = Object.keys(state.observers)
        .filter(obKey => obKey !== key)
        .reduce((obj, obKey) => {
          obj[obKey] = state.observers[obKey]
        }, {})
      unsubscribe()
      Vue.set(state, 'observers', observersToKeep)
    },
    displayTask (state, key) {
      state.displayTask = key
    },
    addTaskList (state, taskList) {
      Vue.set(state, 'tasks', taskList)
    },
    addUserList (state, userList) {
      Vue.set(state, 'users', userList)
    },
    updateTask (state, { taskId, task }) {
      Vue.set(state.tasks, taskId, task)
    },
    addProject (state, project) {
      const key = generateKey()
      Vue.set(state.projectList, key, project)
      Vue.set(state, 'project', { ...project, id: key })
    },
    selectProject (state, projectId) {
      Vue.set(state, 'project', { ...state.projectList[projectId], id: projectId })
    },
    updateProject (state, payload) {
      const project = { ...state.project, ...payload }
      Vue.set(state, 'project', project)
    },
    addTeamMembers (state, user) {
      Vue.set(state.team, user.id, user)
    },
    setDisplayTask (state, taskId) {
      state.displayTask = taskId
    }
  },
  actions: {
    // Actions receive a 'context' which is actually made of:
    // { state, rootState, commit, dispatch, getters, rootGetters }
    trackUserSession ({ state, commit }) {
      if ((state.observers || {}).authUnsubscribe) return
      const auth = state.auth
      const authUnsubscribe = auth().onAuthStateChanged(function () {
        commit('recordUser')
      })
      commit('storeObserver', { auth: authUnsubscribe })
    },
    createUserWithPassword ({ state, dispatch }, payload) {
      const auth = state.auth
      auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(function () {
          dispatch('trackUserSession')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    loginUserWithPassword ({ state, dispatch }, payload) {
      const auth = state.auth
      auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(function () {
          dispatch('trackUserSession')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    loginWithGoogle ({ state, dispatch }) {
      const auth = state.auth
      const provider = new auth.GoogleAuthProvider()
      auth().signInWithPopup(provider)
        .then(function () {
          dispatch('trackUserSession')
        }).catch(function (error) {
          console.log(error)
        })
    },
    logout ({ state, commit }) {
      const auth = state.auth
      auth().signOut()
        .then(function () {
          commit('dropObserver', 'auth')
          commit('recordUser')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    trackTasks ({ state, commit }) {
      db.collection('tasks')
        .onSnapshot(function (collection) {
          const tasksIds = collection.docs.map(task => task.id)
          const taskList = tasksIds.reduce((obj, taskId) => {
            obj[taskId] = collection.docs.filter(task => task.id === taskId)[0].data()
            return obj
          }, {})
          commit('addTaskList', taskList)
        })
    },
    addTask ({ state, commit }, newTask) {
      const task = { date: '', notes: '', asignee: [], done: false, ...newTask }
      state.db.collection('tasks').add(task)
        .then(function (docRef) {
          commit('displayTask', docRef.id)
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    updateTask ({ state, commit }, { taskId, update }) {
      state.db.collection('tasks').doc(taskId).update(update)
        .then(function (docRef) {
          console.log('success updating task')
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    trackUsers ({ state, commit }) {
      db.collection('users')
        .onSnapshot(function (collection) {
          const userIds = collection.docs.map(user => user.uid)
          const userList = userIds.reduce((obj, userId) => {
            obj[userId] = collection.docs.filter(user => user.uid === userId)[0].data()
            return obj
          }, {})
          commit('addUserList', userList)
        })
    }
  }
})
