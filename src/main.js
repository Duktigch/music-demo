import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"
import "@/styles/reset.css"
import router from "@/router"
// 全局导入vant组件
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, icon, Search, List   } from 'vant';
// 全局注册
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(icon);
Vue.use(Search);
Vue.use(List);




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
