import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import VuePaginate from 'vue-paginate'
import { store } from './store/store.js'

Vue.component('farm-navbar', NavBar)
Vue.component('farm-footer', Footer)

Vue.use(VueRouter);
Vue.use(VuePaginate);

// Global Filters
Vue.filter('readMore', function(value, length, suffix) {
    if (value.length < length)
    return value;	
    return value.substring(0, length) + suffix;
});

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
  store,
  render: h => h(App)
})