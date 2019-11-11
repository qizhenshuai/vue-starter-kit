import Vue from 'vue'
import api from 'api'

/**
 * 错误处理
 * @param error
 * @param vm
 */
const errorHandler = (error, vm) => {
  console.error(vm)
  console.error(error)
}

Vue.config.errorHandler = errorHandler

export default {
  install(Vue) {
    //  添加组件
    //  添加过滤器
    //  全局报错处理
    Vue.prototype.$throw = (error) => errorHandler(error, this)
    Vue.prototype.$http = api
    // 其他配置
  }
}
