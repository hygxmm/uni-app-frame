/**
 * @alias 默默
 * @description 软件升级插件
 * 
 * 获取当前应用的版本号
 * 发送请求检测是否有新版本
 * 从服务器下载应用资源包
 * 更新应用资源包
 * */
 
export default function checkUpdate(path){
	console.log("APP检查更新");
	var wgtver = null;
	plus.runtime.getProperty(plus.runtime.appid,function(widgetInfo){
		console.log('版本信息',widgetInfo);
		wgtver = widgetInfo.version;
	});
	uni.request({
		url: path,
		success: (res) => {
			if(res.statusCode == 200){
				const data = res.data;
				if(data.code == 1){
					const info = data.data;
					console.log('接口返回信息',info);
					
				}
			}
		}
	})
	
	
	
	// uni.request({
	//     url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
	//     data: {
	//         appid: plus.runtime.appid,
	//         version: plus.runtime.version,
	//         imei: plus.device.imei
	//     },
	//     success: (res) => {
	//         if (res.statusCode == 200 && res.data.isUpdate) {
	//             let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
	//             // 提醒用户更新
	//             uni.showModal({
	//                 title: '更新提示',
	//                 content: res.data.note ? res.data.note : '是否选择更新',
	//                 success: (showResult) => {
	//                     if (showResult.confirm) {
	//                         plus.runtime.openURL(openUrl);
	//                     }
	//                 }
	//             })
	//         }
	//     }
	// })
}
 