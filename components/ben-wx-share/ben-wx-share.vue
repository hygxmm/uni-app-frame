<template>
	<view class="box">
		<uni-popup ref="share" type="bottom" :maskClick="false">
			<view class="wrap">
				<view class="flex">
					<view class="flex-sub text-center">分享</view>
					<view class="cuIcon-close text-333" @click.stop="closePopup"></view>
				</view>
				<view class="padding-tb">
					<view class="flex">
						<button class="list-item cu-btn" open-type="share">
							<image class="block-86 round" src="/static/images/share/weixin.png" mode="aspectFill"></image>
							<view class="margin-top-xs text-sm">微信好友</view>
						</button>
						<button class="list-item cu-btn" @tap.stop="shareImage">
							<image class="block-86 round" src="/static/images/share/image.png" mode="aspectFill"></image>
							<view class="margin-top-xs text-sm">二维码海报</view>
						</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="poster" type="bottom" :maskClick="false">
			<view class="wrap">
				<view class="flex align-center justify-between">
					<view class="text-df text-333">保存到相册</view>
					<view class="cuIcon-close text-333" @click.stop="closePopup"></view>
				</view>
				<view class="margin-top-sm flex justify-center align-center">
					<image class="preview-image" :src="previewImageUrl" mode="widthFix"></image>
				</view>
				<view class="margin-top-sm">
					<button class="action2 cu-btn block round" @click.stop="saveImage">保存图片</button>
				</view>
			</view>
		</uni-popup>
		<view class="offset-canvas">
			<canvas canvas-id="poster" style="width: 375px;height: 550px;"></canvas>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		name: 'canvas-poster',
		components: {
			uniPopup
		},
		data(){
			return {
				ctx: null,
				info: null,
				pixelRatio: 1,
				previewImageUrl: '',
			}
		},
		methods: {
			init(info){
				this.info = info;
			},
			// 打开弹窗
			openPopup(){
				this.$refs.share.open();
			},
			// 关闭弹窗
			closePopup() {
				this.$refs.share.close();
				this.$refs.poster.close();
			},
			// 分享海报按钮
			shareImage(){
				// this.$util.actionAuth(() => {
					this.$refs['share'].close();
					this.$refs['poster'].open();
					this.createPoster();
				// })
			},
			// 绘制海报
			createPoster(info){
				uni.showLoading({
					mask: true,
					title: '图片生成中...',
				});
				console.log('开始绘图',this.info);
				this.ctx = uni.createCanvasContext('poster',this);
				this.drawBack();
			},
			// 绘制背景
			drawBack(){
				let ctx = this.ctx;
				ctx.setFillStyle('#FFFFFF');
				ctx.fillRect(0,0,375,500);
				ctx.draw(false,() => {
					console.log("背景绘制成功");
					this.drawHead();
				});
			},
			// 绘制头部
			async drawHead(){
				let ctx = this.ctx;
				await new Promise(resolve => {
					uni.getImageInfo({
						src: this.info.avatar,
						success: (res) => {
							console.log('头像',res);
							let {width,height,path} = res;
							if(width > height){
								let startX = (width - height) / 2;
								ctx.drawImage(res.path,startX,0,height,height,20,20,50,50);
							}else if(width < height){
								let startY = (height - width) / 2;
								ctx.drawImage(res.path,0,startY,width,width,20,20,50,50);
							}else{
								ctx.drawImage(res.path,20,20,50,50);
							}
							resolve();
						},
						fail: (err) => {
							uni.hideLoading();
							// this.$Common.toast('获取头像信息失败');
							console.log("获取图片信息失败",err);
						}
					})
				});
				ctx.setFillStyle('#333333');
				ctx.setFontSize(16);
				ctx.fillText(this.info.name,90,40);
				ctx.setFillStyle('#999999');
				ctx.setFontSize(14);
				ctx.fillText('推荐一个好物给你,请查收',90,60);
				ctx.draw(true,() => {
					console.log('顶部绘制成功');
					this.drawImage();
				});
			},
			// 绘制图片
			async drawImage(){
				let ctx = this.ctx;
				await new Promise(resolve => {
					uni.getImageInfo({
						src: this.info.goodsImage,
						success: (res) => {
							let {width,height,path} = res;
							if(width > height){
								let startX = (width - height) / 2;
								ctx.drawImage(res.path,startX,0,height,height,20,90,335,335);
							}else if(width < height){
								let startY = (height - width) / 2;
								ctx.drawImage(res.path,0,startY,width,width,20,90,335,335);
							}else{
								ctx.drawImage(res.path,20,90,335,335);
							}
							resolve();
						},
						fail: (err) => {
							uni.hideLoading();
							console.log("商品图片绘制失败",err)
							// this.$Common.toast('获取商品图片信息失败');
						}
					})
				});
				ctx.draw(true,() => {
					console.log("图片绘制成功");
					this.drawPrice();
				});
			},
			// 画价格
			drawPrice(){
				let ctx = this.ctx;
				ctx.setFillStyle('#333333');
				ctx.setFontSize(18);
				ctx.fillText(this.info.goodsName.substr(0,20)+'...',20,455);
				ctx.setFontSize(14);
				ctx.setFillStyle('#d55034');
				ctx.fillText('￥'+this.info.price,20,485);
				ctx.draw(true,() => {
					console.log("价格绘制成功");
					this.drawCode();
				});
			},
			// 绘制二维码
			async drawCode(){
				let ctx = this.ctx;
				await new Promise(resolve => {
					uni.getImageInfo({
						src: this.info.code,
						success: (res) => {
							console.log('二维码信息',res);
							let {width,height,path} = res;
							if(width > height){
								let startX = (width - height) / 2;
								ctx.drawImage(res.path,startX,0,height,height,275,445,80,80);
							}else if(width < height){
								let startY = (height - width) / 2;
								ctx.drawImage(res.path,0,startY,width,width,275,445,80,80);
							}else{
								ctx.drawImage(res.path,275,445,80,80);
							}
							resolve();
						},
						fail: (err) => {
							uni.hideLoading();
							this.$Common.toast('获取商品图片信息失败');
						}
					})
				});
				ctx.draw(true,() => {
					console.log("二维码绘制成功");
					setTimeout(this.exportImage,200);
				})
			},
			// 导出图片
			exportImage(){
				uni.canvasToTempFilePath({
					canvasId: 'poster',
					success: (res) => {
						uni.hideLoading();
						console.log('导出图片成功',res);
						this.previewImageUrl = res.tempFilePath;
					},
					fail: (err) => {
						uni.hideLoading();
						console.log("导出图片失败",err);
					}
				},this);
			},
			// 保存图片
			saveImage(){
				uni.saveImageToPhotosAlbum({
					filePath: this.previewImageUrl,
					success: (res) => {
						console.log(res);
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						})
						this.closePopup();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		position: relative;
	}
	.wrap{
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.block-86 {
		width: 86rpx;
		height: 86rpx;
		min-width: 86rpx;
		min-height: 86rpx;
	}
	.list-item{
		height: 200rpx;
		flex: 1;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.action{
		height: 88rpx;
		background-color: #f8f8f8;
		font-size: 32rpx;
		color: #666666;
	}
	
	.action2{
		height: 66rpx;
		background-color: #f02523;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.preview-image{
		width: 375rpx;
		height: 550rpx;
		box-shadow: 0 0 10rpx rgba(0,0,0,.2);
	}
	.offset-canvas{
		position: fixed;
		top: -1000px;
		left: 0;
		z-index: 9999;
	}
</style>
