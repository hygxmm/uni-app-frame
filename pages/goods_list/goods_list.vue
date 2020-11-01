<template>
	<view class="pages">
		<view class="list-box">
			<block v-for="(item,index) in 20" :key="index">
				<view class="padding flex margin-right-sm">
					<view class="block-150 radius bg-blue margin-right-sm" :id="'animate_box_'+index">
						<!-- <image class="radius" src="../../static/images/goods.jpg" mode="aspectFill"></image> -->
					</view>
					<view class="flex-sub flex flex-direction justify-between align-start">
						<view>
							<view class="text-df text-cut-2">测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品</view>
							<view class="margin-top-xs text-xs text-999">亚历山大啊</view>
						</view>
						<view class="flex justify-between align-center" style="width: 100%;">
							<view class="text-price text-theme text-sm">19.90</view>
							<button class="cu-btn sm bg-theme text-white round" @click="createAnimate(item,index)">加入购物车</button>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!--  -->
		<view class="float-action flex justify-center align-center">
			<text class="cuIcon-cart text-white" style="font-size: 36rpx;"></text>
		</view>
		<!--  -->
		<view>
			<block v-for="(item,index) in animates" :key="item.id">
				<view class="animate" :style="{ visibility: item.show ? 'visible' : 'hidden', left: item.left + 'px', top: item.top + 'px', transform: 'scale(' + item.scale + ')' }">
					<image :src="animateImg" mode="aspectFill"></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartPoint: null,
				animates: [],
				// animateImg: '../../static/images/goods.jpg',
			};
		},
		onLoad() {
			this.getCartPoint();
		},
		methods: {
			getCartPoint(){
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this)
					.select('.float-action')
					.boundingClientRect(data => {
						console.log("按钮位置", data);
						this.cartPoint = data;
					}).exec();
				});
			},
			createAnimate(item,index){
				console.log(item,index)
				if(this.animates.length >= 5) this.animates = [];
				uni.createSelectorQuery().in(this)
				.select(`#animate_box_${index}`)
				.boundingClientRect(res => {
					let len = this.animates.length;
					this.animates = this.animates.concat({
						id: new Date().getTime(),
						top: res.top + 20,
						left: res.left - 20,
						scale: 1,
						show: true
					});
					setTimeout(() => {
						let list = this.animates;
						list[len].top = this.cartPoint.top;
						list[len].left = this.cartPoint.left;
						list[len].scale = 0.5;
						this.animates = list;
					},30)
					setTimeout(() => {
						this.$set(this.animates[len],'show',false);
					},550)
				}).exec();

			}
		}
	}
</script>

<style lang="scss" scoped>
.pages{
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
.block-150{
	width: 150rpx;
	height: 150rpx;
	min-width: 150rpx;
	min-height: 150rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.float-action {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background-color: rgba(165, 165, 165, .85);
	position: fixed;
	right: 20rpx;
	bottom: 200rpx;
	font-size: white;
}

.animate {
	position: fixed;
	border-radius: 50%;
	z-index: 9999;
	transform-origin: 50% 50%;
	transition: transform linear 0.5s, left linear 0.5s, top cubic-bezier(0.3, -0.2, 1, 0) 0.5s !important;
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
}
</style>
