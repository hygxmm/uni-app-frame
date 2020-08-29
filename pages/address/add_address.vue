<template>
	<view class="page">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">新增收货地址</block>
		</cu-custom>
		<view class="addAddr">
			<view class="cell">
				<text class="title">收货人</text>
				<input type="text" maxlength="8" v-model="name" placeholder="姓名" />
			</view>
			<view class="cell">
				<text class="title">联系电话</text>
				<input type="number" v-model="phone" placeholder="手机号" />
			</view>
			<view class="cell">
				<text class="title">所在地区</text>
				<view class="flex flex-sub" >
					<input class="flex-sub" type="text" disabled="" v-model="address" placeholder="请选择" @click="showMulLinkageThreePicker" />
					<text class="margin-left-sm cuIcon-locationfill text-theme" @click="location"></text>
				</view>
			</view>
			<view class="cell">
				<text class="title">详细地址</text>
				<input type="text" v-model="addressDesc" maxlength="50" placeholder="详细地址(50字内)" />
			</view>
			<view class="flex justify-between cell margin-top">
				<view class="">设为默认收货地址</view>
				<switch @change="handleSwitch" :class="is_default?'checked':''" :checked="is_default?true:false"></switch>
			</view>
		</view>
		<view class="padding-top padding-lr">
			<button class="cu-btn bg-theme text-white round block" @click="sub_sure">提交</button>
			<button v-if="edit_id" class="margin-top-sm cu-btn round block" @click="delAddr">删除地址</button>
		</view>
		<w-picker
			mode="region"
			default-type="value"
			@confirm="onConfirm($event)"
			ref="region" 
		></w-picker>
	</view>
</template>

<script>
	var amapFile = require('../../libs/amap-wx.js');
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		computed: {
			address(){
				return this.province + this.city + this.district;
			},
		},
		data() {
			return {
				phone: '', // 联系电话
				name: '', // 收货人
				is_default: true, // 是否默认
				edit_id: null, // 是否是修改收货地址
				myAmapFun: null, // 高德地图实例
				province: '', // 省
				city: '', //市
				district: '', //区
				addressDesc: '', // 详细地址
			};
		},
		onLoad(options) {
			this.myAmapFun = new amapFile.AMapWX({key: '自己的key'});
			//如果是修改地址
			if (options.id) { 
				console.log("修改地址",options.id)
				this.edit_id = options.id;
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				});
				this.get_editAddress();
			}else{
				this.location();
				this.phone = this.$store.state.userInfo._mobile;
			}
		},
		methods: {
			//获取修改地址信息
			get_editAddress() {
				this.$Request.post(this.$api.user.get_edit_address, {
					address_id: this.edit_id
				}).then(res => {
					console.log(res, '修改的信息');
					if (res.code != '1') {
						this.$Common.toast(res.msg)
						return false
					}
					// 设置默认值
					let data = res.data;
					this.name = data.name;
					this.phone = data.mobile;
					this.province = data.province;
					this.city = data.city;
					this.district = data.district;
					this.addressDesc = data.address;
					this.is_default = data.is_default == '1' ? true : false;
				}).catch(err => {
					this.$Common.toast(err.msg);
					console.log(err);
				})
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				uni.hideKeyboard();
				this.$refs.region.show();
			},
			// 地址选择回调
			onConfirm(val) {
				this.province = val.obj.province.label;
				this.city = val.obj.city.label;
				this.district = val.obj.area.label;
				this.addressDesc = '';
			},
			handleSwitch() { //选择设为默认
				this.is_default = !this.is_default
			},
			// 定位地址
			location(){
				this.myAmapFun.getRegeo({
					success: (data) => {
						//成功回调
						console.log(data);
						let regeoData = data[0].regeocodeData.addressComponent;
						this.province = regeoData.province;
						this.city = regeoData.city;
						this.district = regeoData.district;
						this.addressDesc = data[0].desc;
					},
					fail: (info) => {
						//失败回调
						console.log(info)
					}
				})
			},
			sub_sure() { //提交
				// 表单验证
				if (this.name == '') {
					this.$Common.toast('请输入收货人姓名');
					return false;
				};
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
					uni.showToast(!this.phone ? {
						title: '请输入手机号',
						icon: 'none'
					} : {
						title: '手机号格式不正确',
						icon: 'none'
					});
					return false;
				}
				if (this.address == '') {
					this.$Common.toast('详细地址不能为空');
					return false;
				}
				if (this.addressDesc == '') {
					this.$Common.toast('地区不能为空');
					return false;
				}
				
				let data = {
					name: this.name, // 姓名
					mobile: this.phone, // 手机
					is_default: this.is_default ? 1 : 0, // 是否默认地址
					address: this.addressDesc, // 详细地址
					province: this.province,
					city: this.city,
					district: this.district,
				}
				// 判断提交的接口
				let url = this.$api.user.add_address
				if (this.edit_id) {
					data.address_id = this.edit_id
					url = this.$api.user.edit_address
				}
				// 提交
				this.$Request.post(url, data)
					.then(res => {
						console.log(res, '添加/编辑成功');
						this.$Common.toast(res.msg)
						if (res.code != '1') {
							return false
						}
						setTimeout(() => {
							uni.navigateBack()
						}, 800);
						uni.$emit('updataList',data)
					})
					.catch(err => {
						console.log("err: ", err);
					})
			},
			delAddr(){
				let address_id = this.edit_id;
				this.$Common.confirm('确认删除吗?', () => {
				    this.$Request.post(this.$api.user.del_address, { address_ids: address_id })
					.then(res => {
				        console.log(res);
				        if (res.code != '1') {
				            this.$Common.toast(res.msg);
				            return false;
				        }
						uni.navigateBack();
				    });
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	.page {
		min-height: 100%;
		background: #FFFFFF;
	}

	.addAddr {
		padding: 0 20upx;

		.uni-list-cell {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 20upx 0;
			box-sizing: border-box;
			height: 100upx;
			font-size: 30upx;
			background: #fff;

			switch {
				transform: scale(0.7)
			}
		}

		.addr {
			font-size: 32upx;
			padding: 30upx 0;
			border-bottom: 1px solid #f5f5f7;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;

			.addr_title {
				display: inline-block;
				width: 180rpx;
			}

			.chose_addr {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				width: 70%;
			}
		}

		.cell {
			font-size: 32upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 110upx;
			border-bottom: 1px solid #f5f5f7;

			.title {
				display: inline-block;
				width: 180rpx;
			}

			input {
				flex: 1;
				color: #999999;
			}
		}

		.address {
			display: flex;
			flex-direction: column;
			font-size: 32upx;

			.title {
				line-height: 110upx;
			}

			textarea {
				height: 120upx;
			}
		}

		.tips {
			padding: 20upx 0;
			font-size: 26upx;
		}
	}
</style>
