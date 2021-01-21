<template>
	<view class="page">
        <tui-picture-cropper :lockRatio="true" :imageUrl="imageUrl" @cropper="cropper"></tui-picture-cropper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                src: '', // 上个页面带过来的本地图片路径
                imageUrl: '', // 要裁剪的图片
			}
		},
        onLoad(options) {
            this.src = options.src || '';
        },
		methods: {
            ready(){
                this.imageUrl = this.src;
            },
            cropper(e){
                if(e.url){
                    console.log('裁剪出来的',e.url);

                }
            },
		}
	}
</script>

<style lang="scss" scoped>
    .page{
        width: 100%;
        height: 100vh;
    }

</style>
