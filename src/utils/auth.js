/**
 * 存储localStorage
 * @param {*} name => key
 * @param {*} content => value
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 * @param {*} name => key
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 移除localStorage
 * @param {*} name => key
 */
export const removeStore = name => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

/**
 * 写入cookies
 * @param {*} name 写入key
 * @param {*} value 写入value
 * @param {*} time 有效时长
 */
export const setCookie = (name, value, time) => {
  let strsec = window.getsec(time)
  let exp = new Date()
  exp.setTime(exp.getTime() + strsec * 1)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

/**
 * 读取cookies
 * @param {*} name key值
 */
export const getCookie = name => {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

/**
  * 删除cookies
  * @param {*} name key值
  */
export const delCookie = (name) => {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
