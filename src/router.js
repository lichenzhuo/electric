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
import warnlog from "./components/warnlog";
import warninglog from "./components/warninglog";
import machinemanage from "./components/machinemanage";
import sitemanage from "./components/sitemanage";
import companyinfo from "./components/companyinfo";
import machineinfo from "./components/machineinfo";
import message from "./components/message";
import morefunction from "./components/morefunction";
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children:[
        { path: '', component: defaulthome },
        { path: '/defaulthome', name: 'defaulthome', component: defaulthome },
        { path: '/singalwarn', name: 'singalwarn', component: singalwarn },
        { path: '/singalwarning', name: 'singalwarning', component: singalwarning },
        { path: '/singalsite', name: 'singalsite', component: singalsite },
        { path: '/personinfo', name: 'personinfo', component: personinfo },
        { path: '/warnlog', name: 'warnlog', component: warnlog },
        { path: '/warninglog', name: 'warninglog', component: warninglog },
        { path: '/machinemanage', name: 'machinemanage', component: machinemanage },
        { path: '/sitemanage', name: 'sitemanage', component: sitemanage },
        { path: '/companyinfo', name: 'companyinfo', component: companyinfo },
        { path: '/machineinfo', name: 'machineinfo', component: machineinfo },
        { path: '/message', name: 'message', component: message },
        { path: '/morefunction', name: 'morefunction', component: morefunction },
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