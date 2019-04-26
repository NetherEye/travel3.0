// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import "babel-polyfill"; // 解决 ie 或者其他浏览器Promise未定义的问题
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import App from './App.vue';
import '@/assets/css/public.css'

import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/user"



Vue.use(ElementUI);
Vue.config.productionTip = false

import '@/assets/tools/global'

//拦截，没有登录的时候  退回登录页
router.beforeEach((to, from, next) => {
	Vue.prototype._global.needLoadingRequestCount = [];
	if(Vue.prototype._global.cancelHttp.length != 0){
		Vue.prototype._global.cancelHttp.forEach(a => { // 遍历页面切换前的中断请求
			a.cancelToken('中断请求')
		})
		Vue.prototype._global.cancelHttp = [];
	}
	let toName = to.name
	let token = localStorage.getItem('token');
	let userInfo = JSON.parse(localStorage.getItem('userInfo'));
	
	if(toName == '登录'){ // 跳转登录不做任何限制，clear all sessionStorage
		// 如果存在token，把token发给后台校验是否登录，成功则进入系统，失败清除token
		if(token && userInfo){
			fetch.get(allApi.isLogin, '', res => {
				if(res.code === 200){
					var old = sessionStorage.getItem('activeNav');
					if(old){ // 存在旧nav
						next({path: old})
					}else{
						let role = userInfo.role;
						if(role == '省') {
							sessionStorage.setItem('activeNav', '/provincial');
							next({
								name: '省级首页'
							});
						
						} else if(role == '市州') {
							sessionStorage.setItem('activeNav', '/city');
							next({
								name: '市级首页'
							});
						
						} else if(role == '区县') {
							sessionStorage.setItem('activeNav', '/county');
							next({
								name: '县级首页'
							});
						
						} else if(role == '乡镇') {
							sessionStorage.setItem('activeNav', '/village');
							next({
								name: '乡级首页'
							});
						
						} else if(role == '景区') {
							sessionStorage.setItem('activeNav', '/scenic/fupin');
							next({
								name: '景区扶贫'
							});
						
						}
					}
				}else{
					localStorage.clear();
					sessionStorage.clear();
				}
				
			}, {loadingText: '重新请求登录'})
			

		}
		next();
		return
	}
	if(!token || !userInfo){ // token 不存在，简单验证不存在     复杂可添加对应的后端校验token正确和是否过期请求
		next({name: '登录'}); // 此处可跳无权限页面，没要求直接跳登录省事
		return
	}
	// 权限判断，级别页面禁止跳转
	let wen = Array.isArray(to.matched[0].meta.level);
	var result;
	if(wen){
		result = to.matched[0].meta.level;
	}else{
		result = [to.matched[0].meta.level];
	}
	let index = result.indexOf(userInfo.role);
	if(index === -1){
		next({name: '登录'}); // 此处可跳无权限页面，没要求直接跳登录省事
		return
	}
	next();
	
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})