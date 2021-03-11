import qs from 'qs'
import request from '@/utils/request'

export default {
  /*
   * 首页数据
   * @param payload
   */
  queryWeatherData(payload) {
    return request({
      url: '/api/simpleWeather/query',
      // method: 'GET',
      // params: { ...payload },
      method: 'POST',
      data: qs.stringify({ ...payload })
    })
  }
}
