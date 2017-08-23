// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' //处理移动端延迟问题
import VueLazyload from 'vue-lazyload'
// import store from './store'

fastclick.attach(document.body)
Vue.config.productionTip = false

import 'common/stylus/index.styl'

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  render:h=>h(App)
})
