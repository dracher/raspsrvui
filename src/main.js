import Vue from 'vue'
import Home from './components/Home'
import App from './components/App'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }

const routes = [
  {path: '/home', component: Home},
  {path: '/foo', component: Foo},
  {path: '*', redirect: '/home'}
]

const router = new VueRouter({
  routes
})

new Vue({
  components: {
    App
  },
  router
}).$mount('#app')
