// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from './App'
import Home from './components/Home'
import TopBar from './components/TopBar'
import ServiceList from './components/ServiceList'
import AirQualityIndex from './components/AirQualityIndex'
import PiStatus from './components/PiStatus'

import '../node_modules/semantic-ui-css/semantic.min.css'
// import semantic from 'semantic'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/srvs', component: ServiceList},
  {path: '/aqi', component: AirQualityIndex},
  {path: '/pistatus', component: PiStatus}
]

const router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  components: {
    TopBar
  },
  router: router
}).$mount('#app')
