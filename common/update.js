/**
 * @alias 默默
 * @description 软件升级插件
 *
 * 获取当前应用的版本号
 * 发送请求检测是否有新版本
 * 从服务器下载应用资源包
 * 更新应用资源包
 * */

import Request from './request';

export default function checkUpdate(path){
	console.log("APP检查更新");
	plus.runtime.getProperty(plus.runtime.appid,function(widgetInfo){
		console.log('本地版本信息',widgetInfo);
        Request.post(path,{app_ident: 'user'})
        .then(res => {
            console.log("res", res);
            if(res.data.is_take == 1 && res.data.version > widgetInfo.versionCode){
                plus.nativeUI.toast('检测到新版本' + res.data.version_name + '，后台更新中...',{
                    verticalAlign: 'center'
                });
                uni.downloadFile({
                    url: res.data.url,
                    success: (downloadResult) => {
                        console.log(downloadResult);
                        if(downloadResult.statusCode == 200){
                            plus.runtime.install(
                                downloadResult.tempFilePath,
                                {force: false},
                                () => {
                                    console.log("?????????")
                                    // plus.runtime.restart();
                                },
                                (e) => {
                                    console.log("===============")
                                }
                            );
                        }else{
                            plus.nativeUI.toast('下载安装包失败,请访问官网下载最新版',{
                                verticalAlign: 'center'
                            });
                        }
                    }
                })
            }else{
                plus.nativeUI.toast('您所使用的已是最新版本!',{
                    verticalAlign: 'center'
                })
            }

          // if (res.data.code == 1 && res.data.data.is_take == 1) {
          //   if (res.data.data.version > widgetInfo.versionCode) {
          //     plus.nativeUI.toast('检测到新版本' + res.data.data.version_name + '，后台更新中...');
          //     // let wgtUrl = res.data.data.version_url;
          //     // let apkUrl = res.data.data.version_apk_url || '';
          //     let wgtUrl = res.data.data.url || '';
          //     let apkUrl = res.data.data.url || '';
          //     uni.downloadFile({
          //       url: wgtUrl,
          //       success: (downloadResult) => {
          //         if (downloadResult.statusCode === 200) {
          //           plus.runtime.install(downloadResult.tempFilePath, {
          //             force: false
          //           }, function() {
          //             plus.runtime.restart();
          //           }, function(e) {
          //             if (plus.os.name == 'Android' && apkUrl) {
          //               uni.downloadFile({
          //                 url: apkUrl,
          //                 success: (downloadResult) => {
          //                   if (downloadResult.statusCode === 200) {
          //                     plus.runtime.install(downloadResult.tempFilePath);
          //                   }
          //                 }
          //               });
          //             }
          //           });
          //         } else if (downloadResult.statusCode === 400) {
          //           if (plus.os.name == 'Android' && apkUrl) {
          //             uni.downloadFile({
          //               url: apkUrl,
          //               success: (downloadResult) => {
          //                 if (downloadResult.statusCode === 200) {
          //                   plus.runtime.install(downloadResult.tempFilePath);
          //                 }
          //               }
          //             });
          //           }
          //         }
          //       }
          //     });
          //   } else {
          //     this.$message.info('您所使用的已是最新版本!');
          //   }
          // }
        })
        .catch(err => {
            console.log('ERROR',err);
        })
	});
}
