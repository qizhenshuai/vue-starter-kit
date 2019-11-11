/**
 * 判断浏览器
 * @return zfb wx other
 */
export const checkBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (userAgent.match(/Alipay/i) === 'alipay') {
    return 'zfb'
  } else if (userAgent.match(/MicroMessenger/i) === 'micromessenger') {
    return 'wx'
  } else {
    return null
  }
}

/**
 * 判断手机系统
 * @return android or ios
 */
export const checkPhone = () => {
  const userAgent = window.navigator.userAgent
  if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1) {
    return 'Android' // android
  }
  if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 'Ios' // ios
  }
}

/**
 * 取url参数(单页应用可能有错误)
 * @param name param name
 * @return 参数 or null
 */
export const GetQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}

/**
 * 比较日期大小(-分隔)
 * @param d1
 * @param d2
 * @return 日期大
 */
export const CompareDate = (d1, d2) => {
  if ((new Date(d1.replace(/-/g, '/'))) > (new Date(d2.replace(/-/g, '/')))) {
    return d1
  } else {
    return d2
  }
}

/**
 * 小数向上取整
 * @param data 数据
 */
export const ToInt = (data) => {
  return Math.ceil(data)
}

/**
 * sleep延时函数
 * @param time 时间 豪秒数
 */
export const sleep = (time) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, time)
  })
}

/**
 * 生成随机字符串（字母数字）
 * @return 字符串
 */
export const randomStr = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/**
 * 数组交集
 * @param {Array} arr1
 * @param {Array} arr2
 */
export const getCommonString = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * 得到两个数组的交集, 两个数组的元素为数值或字符串
 * @param {Array} arr1
 * @param {Array} arr2
 */
export const getIntersection = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * 判断要查询的数组是否至少有一个元素包含在目标数组中
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 */
export const hasOneOf = (target, arr) => {
  return target.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
export const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
export const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
export const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}
