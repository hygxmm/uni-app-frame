<template>
	<view class="page">
		<!-- 聊天列表 -->
		
		<scroll-view 
			class="bg-brown scroll-box" 
			scroll-y 
			:scroll-with-animation="true"
			:scroll-top="scrollTop"
			:scroll-into-view="scrollToView"
		>
			<block v-for="(item,index) in messages" :key="index">
				<view class="cu-chat" :id="'msg_'+index">
					<!-- 咨询消息 -->
					<view v-if="item.type == 'consult'">
						<view class="radius bg-white padding">
							<view class="flex justify-between" v-if="row.data.order_sn">
								<text class="text-xs">订单号: {{row.data.order_sn}}</text>
								<text class="text-xs text-999">{{row.data.createTime}}</text>
							</view>
							<view class="flex margin-top-xs overHiddren">
								<view class="block-100">
									<image class="radius" :src="row.data.goods_thumb" mode="aspectFill"></image>
								</view>
								<view class="flex-sub margin-left-sm overHiddren">
									<view class="text-xs text-cut-2">{{row.data.goods_name}}</view>
									<view class="text-xs flex justify-between margin-top-sm">
										<view class="text-xs text-price text-333 text-bold">{{row.data.goods_price}}</view>
										<view class="text-xs text-theme">{{row.data.orderStatus}}</view>
									</view>
								</view>
							</view>
							<view class="text-center flex align-center margin-top-sm justify-center" @click="sendLink">
								<text class="text-xs text-theme">发送链接</text>
								<text class="margin-left-xs text-theme cuIcon-right" style="font-size: 20rpx;"></text>
							</view>
						</view>
					</view>
					<!-- 系统消息 -->
					<view class="cu-info round" v-else-if="item.type == 'system'">{{item.content}}</view>
					<block v-else>
						<!-- 自己发的消息 -->
						<view class="cu-item self" v-if="item.uid == user.id">
							<view class="main">
								<view class="content bg-green shadow">
									<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
								</view>
							</view>
							<view class="cu-avatar radius" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
							<!-- <view class="date">2018年3月23日 13:23</view> -->
						</view>
						<!-- 别人发的消息 -->
						<view class="cu-item" v-else>
							<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
							<view class="main">
								<view class="content shadow">
									<text>喵喵喵！喵喵喵！</text>
								</view>
							</view>
							<view class="date "> 13:23</view>
						</view>
					</block>
				</view>
			</block>
			
		</scroll-view>
	
		<!-- 底部输入框 -->
		<view class="bottom-box">
			<view class="cu-bar input">
				<view class="action">
					<text class="cuIcon-keyboard text-black" v-if="editStatus == 'voice'" @click="changeEditStatus('text')"></text>
					<text class="cuIcon-sound text-black" v-else @click="changeEditStatus('voice')"></text>
				</view>
				<view class="voice-btn" v-if="editStatus == 'voice'">按住 说话</view>
				<input class="solid-bottom" 
					v-else
					:adjust-position="true" 
					:focus="inputFocus" 
					maxlength="300" 
					cursor-spacing="10" 
					@blur="handleBlur"
					@focus="handleFocus"
				></input>
				<view class="action">
					<text class="cuIcon-keyboard text-black" v-if="editStatus == 'emoji'" @click="changeEditStatus('text')"></text>
					<text class="cuIcon-emoji text-black" v-else @click="changeEditStatus('emoji')"></text>
				</view>
				<view class="action" @click="chooseImage">
					<text class="cuIcon-camera text-black"></text>
				</view>
			</view>
		</view>
		<!-- 表情框 -->
		<scroll-view scroll-y class="emoji-box" v-if="editStatus == 'emoji'">
			<view></view>
		</scroll-view>
	
	</view>
</template>

<script>
	import emoji from './emoji.js';
	export default {
		data() {
			return {
				loadUrl: this.$config.apiHost+this.$api.common.upload,
				kfid: null, // 客服id
				customer: null, // 客服信息
				KeyboardHeight: 0, // 键盘高度
				group: 1, // 未知参数
				inputFocus: false, // 输入框是否聚焦
				editStatus: 'text', // 输入状态 text voice emoji 
				messages: [], // 聊天列表
				imgLink: this.$imgLinks, // 图片域名
				
				
				textMsg: '',	//储存的文字
				textMsg_show: '', //显示的文字
		
				scrollTop: 0, // 
				scrollToView: '', // 滑动到元素选择器
			
				
				msg_code:[
					{//聊天列表里的字段定义
						id: 0,
						uid: -1,
						username: "系统助手",
						face: "http://lbphp.lwwan.com/uploads/images/20190923/837437f04ede29d8ce6d169385d77496.jpg",
						time: '',
						type: 'system',
						content: "您好，有问题请留言"
					},
				],
				
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				// RECORDER: uni.getRecorderManager(),
				// #endif
				// isVoice: false,
				// voiceTis: '按住 说话',
				// recordTis: '手指上滑 取消发送',
				// recording: false,
				// willStop: false,
				// initPoint: { identifier: 0, Y: 0 },
				// recordTimer: null,
				// recordLength: 0,
				//播放语音相关参数
				// AUDIO: uni.createInnerAudioContext(),
				// playMsgid: null,
				// VoiceTimer: null,
				//表情定义
				// showEmji: '',
				// ip: null, // 客户端ip
				// 缓存数据
				// CustomerCache: null,
				emojiList: Object.freeze(emoji),
				
			};
		},
		computed: {
			user(){
				return this.$store.state.userInfo;
			}
		},
		onLoad(options) {
			const {kfid} = options;
			if(kfid){
				this.kfid = kfid;
				this.get_customer_info();
			}else{
				this.$util.toast('客服开小差了,联系其他客服吧');
				uni.navigateBack();
			}
			// 初始化socket连接
			this.initSocket();
		},
		onUnload() {
			// 关闭socket连接
			uni.closeSocket();
		},
		methods: {
			// 获取客服信息
			get_customer_info(){
				this.$http.get('v1/5d8b45ab937f1', { id: this.kfid })
				.then(res => {
					console.log("客服信息",res);
				    if (res.code == 1) {
				        this.customer = res.data;
						uni.setNavigationBarTitle({
							title: res.data.nickname
						})
				    }
				});
			},
			// 键盘高度变化监听
			listenerKeyBoard(){
				uni.onKeyboardHeightChange(res => {
				  this.KeyboardHeight = res.height;
				})
			},
			// 初始化socket
			initSocket(){
				// 创建websocket连接
				uni.connectSocket({url: 'wss://btj.yuanjiwei.cn/wss'});
				// 监听连接打开事件
				uni.onSocketOpen(this.socketOpen);
				// 监听连接错误事件
				uni.onSocketError(this.socketError);
				// 监听接受消息事件
				uni.onSocketMessage(this.socketMessage);
				// 接受连接关闭事件
				uni.onSocketClose(this.socketClose);
			},
			// 监听 websocket 连接打开事件
			socketOpen(res){
				console.log('WebSocket 连接已打开 => '+JSON.stringify(res));
				let loginData = {
					type: "userInit",
					uid: this.user.id,
					name: this.user.user_name,
					avatar: this.user.head_img,
					group: this.group,
				}
				this.sendSocketMessage(JSON.stringify(loginData));
			},
			// 监听 websocket 连接错误事件
			socketError(res){
				console.log('WebSocket 连接打开失败 => '+JSON.stringify(res));
			},
			// 监听 websocket 接受消息事件
			socketMessage(res){
				console.log("WebSocket 接受到新消息 => "+JSON.stringify(res))
				// var data = JSON.parse(res.data);
				const data = res.data;
				switch(data.message_type){
					case 'ping':
						console.log("服务端心跳消息");
					break;
					case 'connect':
						console.log("connect 是什么消息")
						// kf_id = data.data.kf_id;
						// kf_name = data.data.kf_name;
						// uni.setStorageSync('kf_id',kf_id);
						// this.kf_id = data.data.kf_id;
						// if (1 == commChat) {
						// 	that.getMsgList();
						// }
					break;
					case 'wait':
						console.log("wait 是什么消息");
						// if (data.data.code == 0) {
						// 	//0客服不在线1排队
						// 	self.$Common.toast(data.data.content);
						// }
					break;
					case 'chatMessage':
						console.log("接收到的聊天信息 重要!重要!重要!");
						this.showMsg(data.data);
					break;
					case 'helloMessage':
						console.log("hello 问候语 系统消息");
						// that.showMsg(data.data, 'text');
					break;
					case 'relinkMessage':
						console.log("感觉没啥用啊 没触发过");
						// commChat = 2;
						// document.getElementById('title').innerHTML = '正在转接中...';
					break;
				}
			},
			// 监听 websocket 连接关闭事件
			socketClose(res){
				console.log('WebSocket 已关闭！=> '+JSON.stringify(res));
			},
			// websocket 发送消息
			sendSocketMessage(content){
				
			},
			// 展示消息
			showMsg(data,type){
				let content = data.content;
				if(type == 'text'){
					content = this.replaceEmoji(data.content);
				}
				const msg = {
					uid: data.id,
					username: data.name,
					face: data.avatar,
					type: type,
					content: content,
				}
				this.screenMsg(msg);
			},
			screenMsg(msg){
				//
				// switch(msg.type){
				// 	case 'text':
				// 		this.addTextMsg();
				// 	break;
				// 	case 'voice':
				// 		this.addVoiceMsg();
				// 	break;
				// 	case 'img':
				// 		this.addImgMsg();
				// 	break;
				// 	case 'link':
				// 		this.addLinkMsg();
				// 	break;
				// }
				this.messages.push(msg);
				this.$nextTick(() => {
					this.scrollToView = 'msg_'+msg.id;
				})
				// 存储聊天记录
				// this.setCacheChat({});
				
				
			},
			// 添加文字消息
			addTextMsg(){},
			// 添加
			addImgMsg(){},
			addVoiceMsg(){},
			addLinkMsg(){},
			// 改变输入方式
			changeEditStatus(type){
				this.editStatus = type;
				switch(type){
					case 'text':
						this.inputFocus = true;
					break;
					case 'voice':
						this.inputFocus = false;
					break;
					case 'emoji':
						this.inputFocus = false;
						// uni.pageScrollTo({
						//     selector: '#point',
						//     duration: 10
						// });
					break;
				}
			},
			// 选择图片
			chooseImage(){
				this.closeEmojiPop();
				uni.chooseImage({
					success: (chooseImageRes) => {
						console.log("选择的图片",chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						tempFilePaths.forEach(item => {
							let data = {
								path: item,
								url: '',
								loading: '0%',
								error: false,
								id: null,
							}
							this.uploadImage(data);
						})
					}
				});
			},
			// 上传图片
			uploadImage(data){
				const uploadTask = uni.uploadFile({
					url: this.loadUrl,
					filePath: data.path,
					name: 'file[]',
					success: (uploadFileRes) => {
						const response = JSON.parse(uploadFileRes.data);
						console.log("上传图片成功 =>",response);
						if(response.code == 1){
							data.task = null;
							data.url = response.data[0].path;
							data.id = response.data[0].id;
							data.thumb = response.data[0].thumb;
						}else{
							data.task.abort();
							data.task = null;
							data.error = true;
							this.$util.toast(response.msg);
						}
					},
					fail: (error) => {
						console.log("上传图片失败 =>",error);
						data.task.abort();
						data.task = null;
						data.error = true;
						this.$util.toast('上传失败,请检查网络设置');
					}
				});
				uploadTask.onProgressUpdate((res) => {
					data.loading = res.progress + '%';
				})
				data.task = uploadTask;
				console.log(data);
				this.sendMsg(data,'image');
			},
			// 打开表情窗口
			openEmojiPop(){
				
			},
			// 关闭表情窗口
			closeEmojiPop(){
				
			},
			// 输入框失去焦点事件
			handleBlur(){
				
			},
			// 输入框获得焦点事件
			handleFocus(){
				this.editStatus = 'text';
			},
			// 发送消息
			sendMsg(content,type){
				var nowDate = new Date();
				
				const msg = {
					
					// to_id:
					
					// uid: ,
					
					// username: ,
					
					// face: ,
					
					// time: ,
					
					// type: type,
					
					// msg: content,
					
				}
				
				let data = {
					type:'chatMessage',
					data: msg,
				}
				const dataStr = JSON.stringify(data);
				this.sendSocketMessage(dataStr);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		height: 100%;
		background-color: #F6F6F6;
		.scroll-box{
			height: calc(100% - 100rpx);
		}
		
		.cu-bar .action:last-child {
			margin-right: 0!important;
		}
		
		.emoji-box{
			height: 400rpx;
			background-color: #007AFF;
			position: fixed;
			top: 100%;
			width: 100%;
		}
		
		.voice-btn{
			flex: 1;
			height: 64rpx;
			min-height: 64rpx;
			line-height: 64rpx;
			font-size: 30rpx;
			margin: 0 20rpx;
			box-sizing: border-box;
			background-color: #efefef;
			border-radius: 6rpx;
			text-align: center;
		}
	}
</style>
