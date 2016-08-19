'use strict'
require('./assets/css/animation.css');
require('./assets/css/style.css');
require('weui');
require('vux/dist/vux.css');
import './assets/js/jquery-1.9.1.js'
import './assets/js/jquery.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import VueValidator from 'vue-validator'
import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './route-config.js'
import App from './App'
import 'vux'
import './ajax/index.js'
import error_log from 'assets/js/error-log.js'

window.onerror = function(msg, url, line)   {
  error_log({
    "url":url,
    "error":msg,
    "line":line
  })
}
var FastClick = require('fastclick');

//移动端会出现触发tap然后触发click，所以不处理INPUT的click
FastClick.prototype.onTouchEnd=(event)=>{
  if(event.target.nodeName=="INPUT"){
    return false
  }
}
//删除点击延时
FastClick.attach(document.body)
//安装路由
Vue.use(VueRouter)
//安装验证工具
Vue.use(VueValidator)
//自定义验证器
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
Vue.validator('email', function (val) {
  return isEmail(val)
})
Vue.validator('phone', function (val) {
	return isMobilePhone(val, 'zh-CN')
})
mui.init();
//mui返回事件
let mui_back={}
window.afterEnter=true
//前进动画
Vue.transition('popIn', {
  beforeEnter: function (el) {
    if(window.afterEnter){
      window.afterEnter=false
      mui_back=mui.back
      mui.back=()=>{}
    }
  },
  afterEnter: function (el) {
      window.afterEnter=true
      mui.back=mui_back
      if(this.$refs.app){
        this.$refs.app.$nextTick(() => {
          if(this.$refs.app.$refs.scroller){
            this.$refs.app.$refs.scroller.reset()//重新计算页面高度
          }
        })
      }
  }
})
//后退动画
Vue.transition('popOut', {
  beforeEnter: function (el) {
    if(window.afterEnter){
      window.afterEnter=false
      mui_back=mui.back
      mui.back=()=>{}
    }
  },
  afterEnter: function (el) {
      window.afterEnter=true
      mui.back=mui_back
  }
})
//配置路由
var router = new VueRouter()
configRouter(router)
router.start(App, '#app');
