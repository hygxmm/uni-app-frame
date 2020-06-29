<template>
	<view>
		<view class="flex">
			<view>手机号:</view>
			<input type="number" confirm-type="next" placeholder="手机号" v-model="form.mobile" />
		</view>
		<view>
			<view>密码:</view>
			<input type="text" confirm-type="next" placeholder="密码" v-model="form.password" />
		</view>
		<view>
			<view>验证码:</view>
			<input type="text" confirm-type="next" placeholder="验证码" v-model="form.code" />
		</view>
		<view>
			<view>邀请码:</view>
			<input type="text" confirm-type="done" placeholder="邀请码" v-model="form.invite" />
		</view>
		<view>
			<button @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					mobile: '',
					password: '',
					code: '',
					invite: '',
				},
				rules: {
					mobile: {type: 'mobile',required: true,message: '手机号格式不正确'},
					password: {type: 'password',required: true,message: '密码为6 - 18位字符'},
					code: {type: 'code',required: true,message: '验证码格式不正确'},
					invite: {type: 'invite',required: true,message: '邀请码格式不正确'},
				},
				loading: false,
			};
		},
		methods: {
			login(){
				// const type = this.$validate.check(this.form,this.rules);
				// if(type){
					// this.$util.toast(this.$validate.error);
					this.$http.post('v1/5d67b2acdd34d')
					.then(res => {
						console.log(res);
					}).catch(err => {
						console.log(err);
					})
				// }else{
					// this.$util.toast(this.$validate.error);
				// }
				
			}
		}
	}
</script>

<style lang="scss">

</style>
