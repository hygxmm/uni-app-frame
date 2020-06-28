<template>
	<view>
		<text class="text-theme">测试页面</text>
		<button @click="showToast">显示 Toast</button>
		<input type="text" placeholder="昵称" v-model="form.name" />
		<input type="number" password placeholder="密码" v-model="form.password" />
		<input type="idcard" placeholder="身份证" v-model="form.idcard" />
		<input type="number" placeholder="验证码" v-model="form.code" />
		<button @click="handleClick">验证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					password: '',
					idcard: '',
					code: '',
				},
				rule: [
					{name: 'name',checkType: 'string',errorMsg: '昵称为1-3个字符'},
					{name: 'password',checkType: 'password',errorMsg: '密码为为6-18个字符'},
					{name: 'idcard',checkType: 'card',errorMsg: '身份证验证不通过'},
					{name: 'code',checkType: 'code',errorMsg: '验证码为4个字符'},
				]
			};
		},
		methods: {
			showToast(){
				this.$util.toast('杀青啊');
			},
			handleClick(){
				const checkRes = this.$validate.check(this.form,this.rule);
				if(checkRes){
					this.$util.toast('验证通过');
				}else{
					this.$util.toast(this.$validate.error);
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
