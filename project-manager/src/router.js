import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import(/* webpackChunkName: "projects" */ './views/Projects.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue')
    },
    {
      path: '/project/:projectId/project-dashboard/',
      name: 'project-dashboard',
      component: () => import(/* webpackChunkName: "project-dashboard" */ './views/ProjectDashboard.vue')
    },
    {
      path: '/project/:projectId/tasks/',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue')
    },
    {
      path: '/project/:projectId/calendar/',
      name: 'calendar',
      component: () => import(/* webpackChunkName: "calendar" */ './views/Calendar.vue')
    },
    {
      path: '/project/:projectId/team/',
      name: 'team',
      component: () => import(/* webpackChunkName: "team" */ './views/Team.vue')
    },
    {
      path: '/project/:projectId/chats/',
      name: 'chats',
      component: () => import(/* webpackChunkName: "chats" */ './views/Chats.vue')
    }
  ]
})
