<template>
	<view>
		<button class="margin-top" @click="openSharePop">分享</button>
		<ben-wx-share ref="share"></ben-wx-share>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testData: {
					name: '默默',
					avatar: 'https://btjtest.yuanjiwei.cn/uploads/images/operation/20200826/38bae65c44ff20f676245f79dd28485e.png',
					goodsName: 'Apple iPhone 11 (A2223) 64GB 黑色 移动联通电信4G手机 双卡双待',
					goodsImage: 'https://btjtest.yuanjiwei.cn/uploads/images/operation/20200826/188618539ae6cf93c9ef274e1a280247.jpg',
					price: '99.9',
					code: 'https://btjtest.yuanjiwei.cn/uploads/images/operation/20200826/9965d3f3d1c4479c2a4ca8c5a4725604.png',
				}
			};
		},
		methods: {
			openSharePop(){
				this.$refs.share.openPopup();
			},
		},
		onReady() {
			this.$refs.share.init(this.testData);
		}
	}
</script>

<style lang="scss" scoped>

</style>
