import Vue from 'vue'
import { Button, Table } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import highChartsSet from "highcharts/highcharts";
typeof highChartsSet.defaultOptions.credits === "object"
  ? highChartsSet.defaultOptions.credits.enabled = false
  : "";

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
