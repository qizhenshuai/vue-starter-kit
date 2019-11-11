import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

const modules = {}
const requireAll = requireContext => requireContext.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = requireContext(key).default
})
const req = require.context('./modules', false, /\.js$/)
requireAll(req)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    direction: 'forward' // 页面切换方向
  },
  mutations: {
    // 更新页面切换方向
    updateDirection (state, payload) {
      state.direction = payload
    }
  },
  modules,
  getters
})
