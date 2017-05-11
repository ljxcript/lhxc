// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import Bus from './components/Bus'
import VueResource from 'vue-resource'

Vue.use(VueResource)

router.beforeEach((to, from, next) => {
  Bus.$emit('page-switch', to.name)
  next()
})// 触发页面跳转事件并把页面名称作为参数传入回调

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
