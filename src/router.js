import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index.vue";
import Register from "./views/Register";
import Login from "./views/login";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path:'/index',
      name:'index',
      component:Index
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
  ]
})
