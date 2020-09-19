<script>
	import Vue from 'vue';
	// #ifdef APP-PLUS
	// 引入软件更新模块
	// import update from '@/common/update';
	// #endif
	export default {
		onLaunch: function() {
			console.log('App 启动')
			// 初始化App
			this.$store.dispatch('initApp');
			// 自定义头部菜单需要的变量
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //竖屏正方向锁定
			// 检测升级
			// update.init();
			// #endif
		},
		onShow: function() {
			console.log('App 显示');
            const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
            console.log("showRichAlert");
            dcRichAlert.show({
                shortcut : '[{"id":"1","describe":"第一个页面","icon":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2112859263,1176986998&fm=26&gp=0.jpg","shortlabel":"看直播","longlabel":"看直播"},{"id":"2","describe":"第二个页面","icon":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598450933376&di=d005efa03feb6c307fbbd5261369db80&imgtype=0&src=http%3A%2F%2Fimg.haima.me%2Fandr%2Fwdj%2F73%2Fe6%2F73e6880f3115c1ccc7f41cb444ff89eb%2Fd860f0d09a272b4f1a11759057bae9da.png","shortlabel":"看视频","longlabel":"看视频"}]'
                }, result => {
                console.log(result);
                const msg = JSON.stringify(result);
                console.log(msg);
                switch (result.post) {
                    case 'success':
                        console.log(result.id);
                        break;
                    case 'error':
                        
                        break;
                }
            });
		},
		onHide: function() {
			console.log('App 隐藏');
		},
		onError: function(err){
			// 全局错误监听
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				const res = uni.getSystemInfoSync();
				let errMsg = `手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
				console.log('发生错误：' + errMsg);
			});
			// #endif
		}
	}
</script>

<style lang="scss">
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	/* ColorUI样式 */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* 自定义公共样式 */
	@import "style/common.scss";
</style>
