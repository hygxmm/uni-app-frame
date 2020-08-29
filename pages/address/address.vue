<template>
	<view class="page">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">地址管理</block>
		</cu-custom>
		<radio-group>
			<view class="list-box">
				<block v-for="(item, index) in address_list" :key="index">
					<view class="list-item" @click="handleClick(item)">
						<label class="item-left">
							<view class="left-radio" v-if="is_change == 1">
								<radio style="transform: scale(0.7);" :value="item.address_id+''" :checked="item.is_default=='1'"></radio>
							</view>
							<view class="left-info">
								<view class="info-top">
									<text>{{ item.name }}</text>
									<text class="margin-left-sm">{{ item.mobile | filterMobile }}</text>
								</view>
								<view class="info-bot text-cut">{{ item.province }} {{ item.city }} {{ item.district }} {{ item.address }}</view>
							</view>
						</label>
						<view class="item-right" @click.stop="edit(item)">编辑</view>
					</view>
				</block>
			</view>
		</radio-group>
		<!-- 空列表展示 -->
		<view v-if="address_list.length == 0" class="padding text-center text-gray" style="margin-bottom: 30vh;">
			暂无地址
		</view>
		<view class="bottom-action padding-lr flex justify-around">
			<!-- #ifdef MP-WEIXIN -->
			<view class="cu-btn block round text-white bg-green" @click="toLeadWc">导入微信地址</view>
			<!-- #endif -->
			<view class="cu-btn block round bg-theme text-white" @click="add_Addr">新增收货地址</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkInx: 0, //选中地址的下标
				address_list: [],
				is_change: 0,
				choose_id: 0,
				edit_id: 0,
				backData: null, // 选中返回值
			};
		},
		onShow() {
			this.getMsg();
		},
		onLoad(options) {
			const {type = 0, id = 0} = options;
			this.is_change = type;
			this.choose_id = id;
		},
		onUnload() {
			if (this.is_change == 1) {
				uni.$emit('select_address', this.backData);
			}
		},
		onPullDownRefresh() {
			this.getMsg();
		},
		filters: {
			filterMobile(val) {
				if (!val) return '';
				return val.substr(0, 3) + '****' + val.substr(-4);
			}
		},
		methods: {
			getMsg() {
				// 获取地址列表
				this.$Request.post(this.$api.user.get_address_list).then(res => {
					console.log("地址列表", res);
					if (res.code != '1') {
						this.$Common.toast(res.msg);
						this.address_list = [];
						this.backData = null;
						uni.stopPullDownRefresh();
						return false;
					}
					this.address_list = res.data;
					// 如果是下单页跳过来的,作如下处理
					if (this.is_change == 1) {
						let addrObj = this.address_list.find((item) => {
							return item.address_id == this.choose_id;
						});
						if (!addrObj) {
							addrObj = this.address_list.find((item) => {
								return item.is_default == 1;
							})
						}
						if (!addrObj) {
							addrObj = this.address_list[0];
						}
						if (!addrObj) {
							addrObj = null;
						}
						this.backData = addrObj;
						this.$nextTick(function(){
							uni.stopPullDownRefresh();
						})
					}
				});
			},
			handleClick(item){
				if (this.is_change == 1) {
					this.backData = item;
					uni.navigateBack();
				}
			},
			// 编辑地址
			edit(item) {
				this.edit_id = item.address_id;
				this.add_Addr(item);
			},
			// 添加地址
			add_Addr(item) {
				//添加收货地址  或  修改地址
				uni.navigateTo({
					url: '/pages/address/add_address?id=' + (item.address_id || '')
				});
			},
			// 导入微信地址
			toLeadWc(){
				uni.chooseAddress({
					success: (res) => {
						console.log(res);
						let data = this.$util.serialize({
							userName: res.userName,
							telNumber: res.telNumber,
							provinceName: res.provinceName || res.cityName,
							cityName: res.cityName,
							countyName: res.countyName,
							detailInfo: res.detailInfo,
							is_change: this.is_change
						});
						if(this.is_change == 1){
							uni.redirectTo({
								url: "/pages/address/add_address_wc?"+data
							})
						}else{
							uni.navigateTo({
								url: "/pages/address/add_address_wc?"+data
							})
						}
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100%;
		background-color: #f6f6f6;
	}

	.list-box {
		width: 750rpx;

		.list-item {
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #efefef;
			display: flex;
			padding: 0 30rpx;

			.item-left {
				width: 600rpx;
				display: flex;

				.left-radio {
					width: 60rpx;
					min-width: 60rpx;
					height: 120rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				.left-info {
					width: 540rpx;
					flex: 1;
					height: 120rpx;

					.info-top {
						margin-top: 20rpx;
						font-size: 28rpx;
						line-height: 1.5;
						color: #333333;
						font-weight: bold;
					}

					.info-bot {
						margin-top: 10rpx;
						font-size: 28rpx;
						color: #999999;
					}
				}
			}

			.item-right {
				width: 90rpx;
				min-width: 90rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #ef4b66;
			}
		}
	}

	.bottom-action {
		position: fixed;
		right: 0;
		left: 0;
		bottom: 50rpx;
		bottom: calc(50rpx + constant(safe-area-inset-bottom));
		bottom: calc(50rpx + env(safe-area-inset-bottom));
		view{
			flex: 1;
			margin: 0 15rpx;
		}
	}
</style>
