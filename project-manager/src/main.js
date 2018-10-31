import '@babel/polyfill'
import Vue from 'vue'
import moment from 'moment'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vueMoment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(vueMoment, {
  moment
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
