import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from "./http";
import axios from "axios";
import QS from "qs";
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'z7TojHQEi0GxfxXkhKtTUzjlKYXrOdbP'
})
Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')