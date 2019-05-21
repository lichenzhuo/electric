import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index.vue";
import Register from "./views/Register";
import Login from "./views/login";
import NotFound from "./views/404";
import defaulthome from "./components/defaulthome";
import singalwarn from "./components//singalwarn";
import singalwarning from "./components//singalwarning";
import singalsite from "./components/singalsite";
import personinfo from "./components/personinfo";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        { path: '', component: defaulthome },
        { path: '/defaulthome', name: 'defaulthome', component: defaulthome },
        { path: '/singalwarn', name: 'singalwarn', component: singalwarn },
        { path: '/singalwarning', name: 'singalwarning', component: singalwarning },
        { path: '/singalsite', name: 'singalsite', component: singalsite },
        { path: '/personinfo', name: 'personinfo', component: personinfo },
      ]
       
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})