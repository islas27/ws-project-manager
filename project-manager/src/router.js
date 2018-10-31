import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import ProjectDashboard from './views/ProjectDashboard.vue'
import Projects from './views/Projects.vue'
import Tasks from './views/Tasks.vue'
import Team from './views/Team.vue'

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
      component: About
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/project/:projectId/project-dashboard/',
      name: 'project-dashboard',
      component: ProjectDashboard
    },
    {
      path: '/project/:projectId/tasks/',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/project/:projectId/team/',
      name: 'team',
      component: Team
    }
  ]
})
