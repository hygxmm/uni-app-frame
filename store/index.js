import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		themeColor: '#F02523', // 主题色
		hasLogin: false, // 登录状态
		userInfo: {
			"user_token": "c3bc28c1-0f7a-46f7-3189-0e376f58fe9e",
			"id": 12,
			"head_img": "https://wx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5fHibMuHpkOgbpLe0JQ32sVBq2QQsnU6FkibCDgNZTXeRib1srGib8IThIYb911rt7osS2oMwAQicVeuQ/132",
			"user_name": "默默",
			"user_nickname": "默默",
			"sex": 1,
			"user_type": 0,
			"user_level": 1,
			"mobile": "158****5813",
			"birthday": "1970-01-01"
		}, // 用户信息
	},
	mutations: {
		login(state, data) {
			state.hasLogin = true;
			state.userInfo = data;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = null;
			uni.removeStorageSync('USERINFO');
		},
		updateUserInfo(state,data){
			if (state.userInfo) {
				state.userInfo = {
					...state.userInfo,
					...data,
				};
			} else {
				state.userInfo = data;
			}
			uni.setStorageSync('USERINFO',state.userInfo);
		},
		// 防止token失效时,请求失败多次跳转到登录页
		tologin(){
			const pages = getCurrentPages();
			const lastPage = '/' + pages.pop().route;
			// #ifdef MP-WEIXIN
			let path = '/pages/login/wxlog';
			// #endif
			// #ifndef MP-WEIXIN
			let path = '/pages/login/login';
			// #endif
			if(lastPage == path) return ;
			uni.navigateTo({
				url: path
			})
		}
	},
    getters:{
		uid(state){
			return state.userInfo && state.userInfo.id || 0;
		},
		token(state){
			return state.userInfo && state.userInfo.user_token || 0;
		},
    },
	actions: {
		initApp: async function({commit,state}){
			const userInfo = uni.getStorageSync('USERINFO');
			if (userInfo) {
				commit('login',userInfo);
			};
		}
	}
})

export default store
