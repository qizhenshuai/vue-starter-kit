import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import 'amfe-flexible/index.js'
import global from 'utils/global'
import filters from '@/filters'

import App from './App.vue'
import router from './router'
import store from './store'
import defaultSettings from './settings'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon

import './libs/vant'

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
Vue.component('svg-icon', SvgIcon)
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
