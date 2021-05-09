import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FostClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.use(toast)
Vue.use(VueLazyLoad)
Vue.config.productionTip = false

// 解决移动端300ms延迟
FostClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
