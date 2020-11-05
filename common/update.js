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
                console.log("有新版本");
                if(data.type == 2){
                    console.log("是整包更新");
                    if(plus.os.name.toLowerCase() === 'android'){
                        console.log("是安卓系统");
                        var view = new plus.nativeObj.View('popup', {
                            top: '0px',
                            left: '0px',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.3)'
                        });
                        view.drawRect({
                            color: 'rgba(255,255,255,1)',
                            radius: '8px'
                        }, {
                            top: '35%',
                            left: '10%',
                            width: '80%',
                            height: '30%'
                        });
                        view.drawText('发现新版本', { top: '-12%'}, {color:'#333333',weight: 'bold'});

                        view.drawText('踏破铁鞋无觅处,私藏攻略不迷路!\n京东11.11全球热爱季\n抽百万红包,领头号津贴\r\n抢各类好物,享24期免息\n看顶流明星,购天天低价\n11.11逛京东,只为热爱行动', { top: '-10%',width: '60%'}, {color:'#333333',size: '14px'});
                        view.drawRect({
                            color: 'rgba(255,255,255,0)',
                            borderWidth: '1px',
                            borderColor: '#f02523',
                            radius: '30px'
                        }, {
                            top: '58%',
                            left: '18%',
                            width: '30%',
                            height: '30px'
                        });
                        view.drawRect({
                            color: '#f02523',
                            borderWidth: '1px',
                            borderColor: '#f02523',
                            radius: '30px'
                        }, {
                            top: '58%',
                            right: '18%',
                            width: '30%',
                            height: '30px'
                        });
                        view.drawText('取消', { top: '10%'}, {color:'#f02523',size: '12px'});
                        // view.drawText('点击下载', { top: '10%',right: '20%'}, {color:'#ffffff',size: '12px'});

                        view.show();








                        // plus.nativeUI.confirm('检测到新版本,是否更新?',(res) => {
                        //     console.log('res',res);
                        //     if(res.index == 0){
                        //         // downloadAPK(data.url);
                        //     }
                        // },{
                        //     title: '提示',
                        //     buttons: ['确认','取消'],
                        // })


uni
                    }else{
                        console.log("是苹果系统,跳转到苹果应用商店");
                        plus.nativeUI.confirm('检测到新版本,是否更新?',(res) => {
                            if(res.index == 0){
                                plus.runtime.openURL(data.url);
                            }
                        },{
                            title: '提示',
                            buttons: ['更新','取消'],
                        })
                    }
                }else{
                    console.log("是热更新");
                    uni.downloadFile({
                        url: data.url,
                        success: (downloadResult) => {
                            if (downloadResult.statusCode === 200) {
                                plus.runtime.install(downloadResult.tempFilePath,{force: true});
                                plus.nativeUI.confirm('已准备好新版本,是否重启体验新版?',(res) => {
                                    if(res.index == 0){
                                        plus.runtime.restart();
                                    }
                                },{
                                    title: '提示',
                                    buttons: ['重启','取消'],
                                })
                            }
                        }
                    })
                }
            }
        }
	});
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
