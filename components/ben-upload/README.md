## 使用方法

```html
<ben-upload :col="4" :max="9" @change="chooseImages">
	<!-- <text class="cuIcon-upload"></text> -->
</ben-upload>
```
```js
import benUpload from '@/pagesA/components/ben-upload/ben-upload.vue';
export default {
	components: {
		benUpload,
	},
	data(){
		return {
			images: [], // 上传图片后端返回地址列表
		}
	},
	methods: {
		// 上传成功回调
		chooseImages(val){
			this.images = val;
		}
	}
}
```

## 参数说明
- 依赖 zb_frame 框架,如需单独使用,请自行修改样式及定义上传地址
- col 一行显示几张图片
- max 最大上传张数
- @change 全部上传成功的回调 返回服务器地址数组
- 支持自定义上传图标

## 版本更新

##### 1.0 正式版
+ 图片上传进度展示功能开发完成
##### 1.1 
+ 修复无网络状态下,图片上传失败,无法删掉的bug
+ 增加初始数据参数,如果有需要,可展示上一次的数据
