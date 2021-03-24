export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function debounce(func, wait, immediate = true) {
  let timeout, _this, args
  const later = () => setTimeout(() => {
    timeout = null
    if (!immediate) {
      func.apply(_this, args)
      _this = args = null
    }
  }, wait)

  const debounced = function (...params) {
    if (!timeout) {
      timeout = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        _this = this
        args = params
      }
    } else {
      clearTimeout(timeout)
      timeout = later()
    }
  }
  return debounced
}
function extend () {
  var i = 0
  var result = {}
  for (; i < arguments.length; i++) {
    var attributes = arguments[ i ]
    for (var key in attributes) {
      result[key] = attributes[key]
    }
  }
  return result
}

function decode (s) {
  return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
}

export function getCookie(key, json) {
  if (typeof document === 'undefined') return false

  var jar = {}
  var cookies = document.cookie ? document.cookie.split('; ') : []
  var i = 0

  for (; i < cookies.length; i++) {
    var parts = cookies[i].split('=')
    var cookie = parts.slice(1).join('=')

    if (!json && cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1)
    }

    try {
      var name = decode(parts[0])
      cookie = decode(cookie)
      if (json) {
        try {
          cookie = JSON.parse(cookie)
        } catch (e) {}
      }

      jar[name] = cookie

      if (key === name) {
        break
      }
    } catch (e) {}
  }

  return key ? jar[key] : jar
}

export function setCookie(key, value, attributes) {
  if (typeof document === 'undefined') return false

  attributes = extend({
    path: '/'
  }, {}, attributes)

  if (typeof attributes.expires === 'number') {
    attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5)
  }

  // We're using "expires" because "max-age" is not supported by IE
  attributes.expires = attributes.expires ? attributes.expires.toUTCString() : ''

  try {
    var result = JSON.stringify(value)
    if (/^[{[]/.test(result)) {
      value = result
    }
  } catch (e) {}

  value = encodeURIComponent(String(value))
  .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
    

  key = encodeURIComponent(String(key))
    .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape)

  var stringifiedAttributes = ''
  for (var attributeName in attributes) {
    if (!attributes[attributeName]) {
      continue
    }
    stringifiedAttributes += '; ' + attributeName
    if (attributes[attributeName] === true) {
      continue
    }

    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0]
  }

  return (document.cookie = key + '=' + value + stringifiedAttributes)
}

export function removeCookie(key) {
  setCookie(key, { expires: -1 })
}

export function recursionDimension (treeData, key, includePaths) {
  if (!treeData || treeData.length < 1) return []
  treeData && treeData.length && treeData.forEach(item => {
    if (item[key] && item[key].length > 0) {
      recursionDimension(item[key], key, includePaths)
    }
    item && includePaths.push(item.path)
  })
  return includePaths
}
