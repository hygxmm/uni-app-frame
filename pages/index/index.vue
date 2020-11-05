<template>
	<view class="page">
        <view class="list padding-lr">
            <block v-for="(item,index) in 1000" :key="index">
                <view class="padding-tb text-lg solid-bottom">测试列表 {{index}}</view>
            </block>
        </view>
	</view>
</template>

<script>

	export default {
		data() {
			return {

			};
		},
		methods: {

		},
        onReady() {
            var view = new plus.nativeObj.View('test', {top:'0px',left:'0px',height:'100%',width:'100%',backgroundColor: 'rgba(0,0,0,0.5)'});
            	// 绘制空心圆角矩形
            	view.drawRect(
                    {color:'rgba(0,0,0,1)',borderWidth:'2px',radius:'5px'},
            		{top:'25%',left:'20%',width:'60%',height:'50%'},
                );
                
            	view.show();


        }
	}
</script>

<style lang="scss" scoped>
    .page{
        min-height: 100vh;
        background-color: #FFFFFF;
    }
    .box{
        width: 100%;
        height: 5000rpx;
        background: '#02523f';
    }

</style>
