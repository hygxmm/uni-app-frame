<template>
	<view>
		<text class="text-theme">测试页面</text>
		<button @click="showToast">显示 Toast</button>
		<input type="text" placeholder="昵称" v-model="form.name" />
		<input type="number" password placeholder="密码" v-model="form.password" />
		<input type="idcard" placeholder="身份证" v-model="form.idcard" />
		<input type="number" placeholder="验证码" v-model="form.code" />
		<button class="cu-btn block round" @click="handleClick">验证</button>
		<view class="margin-top text-theme" @click="tologin">去登陆</view>
		<button @click="getAddr">测试接口报错是否会跳转登录页</button>
		<button @click="navToCustomer">联系客服</button>
		<button @click="addCart">加入购物车动画</button>
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
			},
			tologin(){
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			getAddr(){
				this.$http.post('v1/5cadcdd909c17')
				.then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				});
			},
			// 联系客服
			navToCustomer(){
				uni.navigateTo({
					url: '/pages/chat/chat?kfid=1'
				})
			},
			addCart(){
				uni.navigateTo({
					url: '/pages/goods_list/goods_list'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
