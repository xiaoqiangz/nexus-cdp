// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import { Icon } from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './utils/filter' // global filter
import './assets/less/index.less'
import './components/global.less'
import { Dialog } from '@/components'
import { mixinDevice } from '@/utils/mixin'

import './permission' // permission control

Vue.config.productionTip = false
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1821915_0wtbz4ca4bjq.js' // 在 iconfont.cn 上生成
})

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(Dialog)
Vue.mixin(mixinDevice)
Vue.component('my-icon', MyIcon)
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
