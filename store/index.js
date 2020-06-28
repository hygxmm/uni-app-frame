import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		themeColor: '#0E948A', // 主题色
		hasLogin: false, // 登录状态
		userInfo: null, // 用户信息
	},
	mutations: {
		login(state, data) {
			state.hasLogin = true;
			state.userInfo = data;
			uni.setStorage({
				key: 'USERINFO',
				data,
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = null;
			uni.removeStorage({
				key: 'USERINFO'
			})
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
			uni.setStorage({
				key: 'USERINFO',
				data,
			})
		}
	},
    getters:{
		uid(state){
			return state.userInfo && state.userInfo.id || 0;
		},
		token(state){
			return state.userInfo && state.userInfo.user_token || null;
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
