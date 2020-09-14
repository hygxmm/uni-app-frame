import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		themeColor: '#F02523', // 主题色
		hasLogin: false, // 登录状态
		userInfo: null, // 用户信息
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
