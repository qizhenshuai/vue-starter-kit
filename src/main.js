import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import 'amfe-flexible/index.js'
import global from 'utils/global'
import filters from '@/filters'
import GlobalComponent from 'components/global'

import App from './App.vue'
import router from './router'
import store from './store'
import defaultSettings from './settings'

import './libs/vant'
import './icons' // icon

// 全局过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// __DEV__ 全局开发环境
if (__DEV__ && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}

Vue.config.productionTip = false
Vue.use(global)
Vue.use(GlobalComponent)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
