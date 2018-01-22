import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import VuePaginate from 'vue-paginate'

Vue.component('farm-header', Header)
Vue.component('farm-footer', Footer)

Vue.use(VueRouter);
Vue.use(VuePaginate);

const router = new VueRouter({
	routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})