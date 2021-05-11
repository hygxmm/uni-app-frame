<template>
  <view class="">
    <button @click="handleClick">一键登录</button>
  </view>
</template>

<script>
  export default {
    methods: {
      handleClick(){
        uni.login({
          provider: 'univerify',
          univerifyStyle: {
            "fullScreen": true
          },
          success: (res) => {
            console.log('哈哈哈',res)
          }

        })
      }
    },
    onLoad() {
      this.handleClick();  

    }
  }
</script>

<style>
</style>
