import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import 'amfe-flexible/index.js'
import FastClick from 'fastclick'
import global from 'utils/global'
import filters from '@/filters'

import App from './App.vue'
import router from './router'
import store from './store'
import defaultSettings from './settings'

import './registerServiceWorker'
import './libs/vant'

// 解决移动端click事件300毫秒延迟方法
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.attach(document.body)
    },
    false
  )
}
// 全局过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}

Vue.config.productionTip = false
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
