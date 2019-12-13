import request from '@/utils/request'

export default {
  /**
   * 首页数据
   * @param payload
   */
  queryHomeData(payload) {
    const content = { ...payload }
    return request({
      url: '/home',
      method: 'POST',
      params: { content }
    })
  }
}
