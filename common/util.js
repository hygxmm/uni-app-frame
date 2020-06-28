import store from '@/store/index.js'

module.exports = {
	// Toast
	toast(title = '',mask = true,duration = 1500){
		if(!title) return ;
		uni.showToast({
			title: title,
			icon: 'none',
			mask: mask,
			duration: duration,
		})
	},
	// Alert
	alert(title = '',cb){
		if(!title) return ;
		uni.showModal({
			title: '提示',
			content: title,
			showCancel: false,
			success(res) {
				if(cb && typeof cb == 'function'){
					cb();
				}
			}
		})
	},
    // 参数序列化
    serialize(data) {
        let str = '';
        Object.keys(data).forEach(key => {
            str += key + '=' + data[key] + '&'
        })
        str = str.substr(0, str.length - 1);
        return str;
    },
    // 操作权限验证
    actionAuth(cb) {
        if (store.getters.isLogin) {
            cb && (typeof cb == 'function') && cb();
        } else {
            store.commit('tologin');
        }
    }
}