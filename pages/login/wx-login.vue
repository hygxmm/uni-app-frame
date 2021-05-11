<template>
  <view class="page">
    <view class="padding">
      <button v-if="canIUseGetUserProfile" class="cu-btn round bg-green block height-88" @click="handleGetUserProfile"> 微信快速登录(新) </button>
      <button v-else class="cu-btn round bg-green block height-88" withCredentials="true" lang="zh_CN" open-type="getUserInfo" @getuserinfo="handleGetUserInfo"> 微信快速登录(旧) </button>
      <button class="cu-btn round bg-green block height-88" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber"> 微信一键登录 </button>
    </view>
  </view>
</template>

<script>
  export default {
    data(){
      return {
        canIUseGetUserProfile: false,
      }
    },
    onLoad() {
      if (wx.getUserProfile) {
        console.log("???>>>");
        this.canIUseGetUserProfile = true;
      }
    },
    methods: {
      // 旧版获取用户信息
      handleGetUserInfo(e){
        console.log("旧版获取用户信息",e);
        wx.login({
          success: res => {
            console.log('login',res);
            wx.getUserInfo({
              provider: 'weixin',
              success: info => {
                console.log('info',info);
              }
            })
          }
        })
      },
      // 新版获取用户信息
      handleGetUserProfile(){
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: info => {
            // 允许授权用户登录
            console.log("新版版获取用户信息",info);
            wx.login({
              success: res => {
                let code = res.code;
                // 请求登录接口
                this.$http
                  .post(this.$api.postMiniparamLogin, {
                    encryptedData: info.encryptedData,
                    iv: info.iv,
                    code: code
                  })
                  .then(result => {
                    result = result.data;
                    console.log('后台返回登录信息', result);
                    if (result.code == 1) {
                      // 如果后台返回来的是 result 字段,表示此账号还没有绑定过手机号 跳转到绑定手机号页面
                      // 如果后台返回的是 userinfo 字段,表示已经登录成功,把用户信息存到 store 中,并返回跳转来的页面
                      // if (result.data.result) {
                      //   uni.setStorageSync('Wxinfo_tmp', result.data.result);
                      //   setTimeout(function() {
                      //     uni.redirectTo({
                      //       url: '/pages/user/login/auth-phone/index'
                      //     });
                      //   }, 500);
                      // } else if (result.data.userinfo) {
                      //   this.$store.commit('updateUserInfo',result.data.userinfo);
                      //   uni.navigateBack();
                      // }
                    } else {
                      this.$util.toast(result.msg);
                    }
                  })
                  .catch(err => {
                    console.log('ERROR', err);
                    this.$message.info(err.msg);
                  });
              }
            })
          },
        })
      },
      // 获取手机号
      handleGetPhoneNumber(e){
        console.log('handleGetPhoneNumber',e);
        uni.login({
          success: (res) => {
            console.log('login',res);
            uni.getUserProfile({
              desc: "获取头像,昵称自动注册",
              success: info => {
                console.log('getUserInfo',info);


              },
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .cu-btn{
    height: 88rpx;
    margin-bottom: 20rpx;
  }
</style>
