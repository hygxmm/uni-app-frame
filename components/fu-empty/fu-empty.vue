<template>
	<view>
		我是公共组件呢,会和分包组件冲突吗
        <image class="block-100" src="/static/images/share/weixin.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
    .block-100{
        width: 100rpx;
        height: 100rpx;
    }

</style>
