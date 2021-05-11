<template>
	<view>
        我是B分包,引用主包组件
        <ben-upload></ben-upload>
        ====================
        <fuKoa></fuKoa>
        -================-
        <image class="block-100" src="../static/b/order-pic-1.png"></image>
	</view>
</template>

<script>
    import fuKoa from './components/fu-koa/fu-koa.vue';
	export default {
        components: {
            fuKoa,
        },
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
    .block-100{
        width: 100rpx;
        height: 100rpx;
    }

</style>
