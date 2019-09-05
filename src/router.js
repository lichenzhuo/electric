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
import usermanage from "./components/usermanage";
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
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children: [{
          path: '',
          component: defaulthome,
          meta: {
            title: "首页"
          }
        },
        {
          path: '/defaulthome',
          name: 'defaulthome',
          component: defaulthome,
          meta: {
            title: "首页"
          }
        },
        {
          path: '/singalwarn',
          name: 'singalwarn',
          component: singalwarn,
          meta: {
            title: "单个预警"
          }
        },
        {
          path: '/singalwarning',
          name: 'singalwarning',
          component: singalwarning,
          meta: {
            title: "单个报警"
          }
        },
        {
          path: '/singalsite',
          name: 'singalsite',
          component: singalsite,
          meta: {
            title: "单个站点"
          }
        },
        {
          path: '/personinfo',
          name: 'personinfo',
          component: personinfo,
          meta: {
            title: "相关人员资料"
          }
        },
        {
          path: '/warnlog',
          name: 'warnlog',
          component: warnlog,
          meta: {
            title: "预警日志"
          }
        },
        {
          path: '/warninglog',
          name: 'warninglog',
          component: warninglog,
          meta: {
            title: "报警日志"
          }
        },
        {
          path: '/machinemanage',
          name: 'machinemanage',
          component: machinemanage,
          meta: {
            title: "设备管理"
          }
        },
        {
          path: '/sitemanage',
          name: 'sitemanage',
          component: sitemanage,
          meta: {
            title: "站点管理"
          }
        },
        {
          path: '/companyinfo',
          name: 'companyinfo',
          component: companyinfo,
          meta: {
            title: "单位信息"
          }
        },
        {
          path: '/machineinfo',
          name: 'machineinfo',
          component: machineinfo,
          meta: {
            title: "设备查看"
          }
        },
        {
          path: '/message',
          name: 'message',
          component: message,
          meta: {
            title: "消息反馈"
          }
        },
        {
          path: '/morefunction',
          name: 'morefunction',
          component: morefunction,
          meta: {
            title: "更多功能"
          }
        },
        {
          path: '/usermanage',
          name: 'usermanage',
          component: usermanage,
          meta: {
            title: "用户管理"
          }
        },
        {
          path: '/positionmanage',
          name: 'positionmanage',
          component: positionmanage,
          meta: {
            title: "职务管理"
          }
        },
        {
          path: '/manufacturerindex',
          name: 'manufacturerindex',
          component: manufacturerindex,
          meta: {
            title: "首页"
          }
        },
        {
          path: '/personaldata',
          name: 'personaldata',
          component: personaldata,
          meta: {
            title: "个人信息"
          }
        },
        {
          path: '/changepassword',
          name: 'changepassword',
          component: changepassword,

        },
        {
          path: '/infocomplete',
          name: 'infocomplete',
          component: infocomplete,

        },
        {
          path: '/manufacturermachine',
          name: 'manufacturermachine',
          component: manufacturermachine,

        },
        {
          path: '/edit',
          name: 'edit',
          component: edit,
          meta: {
            title: "编辑"
          }
        },
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