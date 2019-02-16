import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Axios from 'axios'

// 导入图标库的Css样式
import './assets/fonts/iconfont.css'

// 导入 全局自定义样式
import './assets/css/global.css'

// 把element-ui安装给vue
Vue.use(Element)

// 配置axios
Axios.defaults.baseURL = 'http://127.0.0.1:8889/api/private/v1/'

Axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
