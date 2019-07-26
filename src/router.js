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
import usermanage  from "./components/usermanage";
import positionmanage from "./components/positionmanage";
import manufacturerindex from "./components/manufacturerindex";
import personaldata from "./components/personaldata";
import changepassword from "./components/changepassword";
import infocomplete from "./components/infocomplete";
import manufacturermachine from "./components/manufacturermachine";
import edit from "./components/edit";
// const Vue = () => import('vue')
// const Router = () => import('vue-router')
// const Index = () => import('./views/index.vue')
// const Register = () => import('./views/Register')
// const Login = () => import('./views/login')
// const NotFound = () => import('./views/404.vue')
// const defaulthome = () => import('./components/defaulthome')
// const singalwarn = () => import('./components/singalwarn')
// const singalwarning = () => import('./components/singalwarning')
// const singalsite = () => import('./components/singalsite')
// const personinfo = () => import('./components/personinfo')
// const warnlog = () => import('./components/warnlog')
// const warninglog = () => import('./components/warninglog')
// const machinemanage = () => import('./components/machinemanage')
// const sitemanage = () => import('./components/sitemanage')
// const companyinfo = () => import('./components/companyinfo')
// const machineinfo = () => import('./components/machineinfo')
// const message = () => import('./components/message')
// const morefunction = () => import('./components/morefunction')
// const usermanage = () => import('./components/usermanage')
// const positionmanage = () => import('./components/positionmanage')
Vue.use(Router)
export default new Router({
  mode:'hash',
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
        { path: '/usermanage', name: 'usermanage', component: usermanage },
        { path: '/positionmanage', name: 'positionmanage', component: positionmanage },
        { path: '/manufacturerindex', name: 'manufacturerindex', component: manufacturerindex },
        { path: '/personaldata', name: 'personaldata', component: personaldata },
        { path: '/changepassword', name: 'changepassword', component: changepassword },
        { path: '/infocomplete', name: 'infocomplete', component: infocomplete },
        { path: '/manufacturermachine', name: 'manufacturermachine', component: manufacturermachine },
        { path: '/edit', name: 'edit', component: edit },
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
 