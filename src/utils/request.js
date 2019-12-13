import axios from 'axios'
import { cloneDeep } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { Toast } from 'vant'

import router from '@/router'
import { CANCEL_REQUEST_MESSAGE } from './constant'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  /* eslint-disable */
  let { params, url, method = 'get', loading = true } = options
  const cloneData = cloneDeep(params)
  let loadingInstance = null
  if (loading) {
    loadingInstance = Toast.loading({
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
      message: 'loading...'
    })
  }
  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(params)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    Toast.fail(e.message || 'Error')
  }

  options.url = url
  options.params = cloneData
  options.headers = {
    'Content-Type': 'application/json'
  }
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel
    })
  })

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response
      loadingInstance && loadingInstance.close()
      // 添加统一的错误处理
      if (data.code !== '0') {
        console.log(data.code, data.msg)
        Toast.fail(data.msg)
        // const errorCode = data.code
      }
      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result
      })
    })
    .catch(error => {
      loadingInstance && loadingInstance.close()
      const { response, message } = error
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return { success: false }
    }

    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    router.replace({ path: '/status', query: { type: 'DIY', desc: msg }})
    /* eslint-disable */
    return Promise.reject({
      success: false,
      statusCode,
      message: msg,
    })
  })
}
