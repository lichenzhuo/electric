import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from "./http";
import axios from "axios";
import QS from "qs";
import ElementUI from 'element-ui';
// import BaiduMap from 'vue-baidu-map'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css';
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)
Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(BaiduMap, {
//   ak: 'z7TojHQEi0GxfxXkhKtTUzjlKYXrOdbP'
// })
// Vue.use(VCharts)
Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')