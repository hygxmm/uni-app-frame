<template>
	<view style="">
    <view>
      
    </view>
	</view>
</template>

<script>
	export default {
		name:"fu-zan",
    props: {
      width: {
        type: Number,
        default: 80
      }, //
      height: {
        type: Number,
        default: 200,
      }, //
      size: {
        type: Number,
        default: 32,
      }, // icon 大小
      disabled: {
        type: Boolean,
        default: false,
      },// 禁止点击
    },
		data() {
			return {

			};
		},
    computed: {
      boxStyle(){
        let style = `width:${}px;height:`;
        return style;
      }
    }
	}
</script>

<style lang="scss">

</style>
