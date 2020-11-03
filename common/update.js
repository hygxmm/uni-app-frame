/**
 * @alias 刘欢
 * @description 软件升级插件
 * @description 兼容小程序升级和APP升级
 * */


 // #ifdef APP-PLUS
 /**
  * APP升级
  * @param {String} path - 版本检测接口
  * @param {String} type - 自动检测还是手动检测
  * @param {type}
  * 获取当前应用的版本号
  * 发送请求检测是否有新版本
  * 从服务器下载应用资源包
  * 更新应用资源包
  * */

export default function (path,type = 'auto'){
	console.log("APP检查更新");
	plus.runtime.getProperty(plus.runtime.appid,async function(widgetInfo){
		console.log('本地版本信息',widgetInfo);
        // 请求版本检查接口
        const [error,result] = await uni.request({
            url: path,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                app_ident: 'user'
            },
            method: 'POST',
        });
        if(result.data.code == 1){
            const data = result.data.data;
            console.log('接口信息',data);
            if(data.is_take == 1 && data.version > widgetInfo.versionCode){
                console.log("升级包是有效版本");
                plus.nativeUI.confirm('检测到新版本,是否更新?',(res) => {
                    console.log('res',res);
                    if(res.index == 0){
                        downloadAPK(data.url);
                    }
                },{
                    title: '更新提示',
                    buttons: ['确认','取消'],
                })
            }
        }




        //         uni.downloadFile({
        //             url: res.data.url,
        //             success: (downloadResult) => {
        //                 console.log(downloadResult);
        //                 if(downloadResult.statusCode == 200){
        //                     plus.runtime.install(
        //                         downloadResult.tempFilePath,
        //                         {force: false},
        //                         () => {
        //                             console.log("?????????")
        //                             // plus.runtime.restart();
        //                         },
        //                         (e) => {
        //                             console.log("===============")
        //                         }
        //                     );
        //                 }else{
        //                     plus.nativeUI.toast('下载安装包失败,请访问官网下载最新版',{
        //                         verticalAlign: 'center'
        //                     });
        //                 }
        //             }
        //         })
        //     }else{
        //         plus.nativeUI.toast('您所使用的已是最新版本!',{
        //             verticalAlign: 'center'
        //         })
        //     }

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
        // })
        // .catch(err => {
        //     console.log('ERROR',err);

        // })
	});
}

function createUpdatePopup(){
    // const popup = plus.nativeObj.View('popup',{
    //     backgroundColor: '#F02523',
    //     top: '25%',
    //     left: '20%',
    //     width: '60%',
    //     height: '50%',
    // });
    // popup.drawRect('#000000',{top: '25%',left: '20%',width: '60%',height: '50%'},'popup');
    // popup.show();
    // console.log(popup)
}
// 下载安装包
function downloadAPK(url){
    plus.nativeUI.showWaiting('下载中...');
    uni.downloadFile({
        url: url,
        success: (res) => {
            if (res.statusCode === 200) {
                plus.runtime.install(
                    res.tempFilePath,
                    function(res) {
                        console.log('确认安装',res);
                        plus.runtime.restart()
                    },
                    function(info) {
                        console.log('软件包信息',err);
                    }
                )
            }
        },
        complete: () => {
            plus.nativeUI.closeWaiting();
        }
    })
}
// #endif


// #ifdef MP
/**
 * 小程序升级
 * 直接调用小程序提供的接口即可
 * 有新版本自动下载新版本并询问是否重启
 * */
export default function () {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
        console.log('是否有新版本', res.hasUpdate);
    })
    updateManager.onUpdateReady(function(res) {
        uni.showModal({
            title: '更新提示',
            content: '检测到新版本，是否重启应用更新',
            success(res) {
                if (res.confirm) {
                    updateManager.applyUpdate();
                }
            }
        });
    });
    updateManager.onUpdateFailed(function(res) {
        console.log('新版本下载失败', res);
    });
}
// #endif
