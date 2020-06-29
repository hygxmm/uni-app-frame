import store from '@/store/index.js';
import config from '@/common/config.js'
import util from '@/common/util.js';

class Request {
    // 默认配置项
    config = {
        baseUrl: config.apiHost,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        dataType: 'json',
        // #ifndef MP-ALIPAY || APP-PLUS
        responseType: 'text',
        // #endif
        // #ifdef MP-ALIPAY || MP-WEIXIN
        timeout: 6000,
        // #endif
        // #ifdef APP-PLUS
        sslVerify: true,
        // #endif
        // #ifdef H5
        withCredentials: false
        // #endif
		loadingTime: 800, // 在此时间内,请求还没回来的话,就显示加载动画
		timer: null, // 定时器
    }
    // 拦截器
    interceptors = {
        // 请求拦截器
        request: (config) => {
			console.log("请求拦截器");
			config.header['USER-TOKEN'] = store.getters.token;
            return config;
        },
        // 响应拦截器
        response: (response) => {
			console.log("响应拦截器");
			if(response.code == 1){
				return response;
			}else if(response.code == -201 ||response.code == -202 || response.code == -203){
				util.toast(response.msg);
				store.commit('logout');
				setTimeout(function(){
					store.commit('tologin');
				},800)
				return false;
			}else{
				util.toast(response.msg);
				return false;
			}
        }
    }
    // 验证返回状态码
    validateStatus(statusCode) {
        return statusCode === 200;
    }
    /**
     * @function
     * @param {Object} options - 请求配置项
     * @prop {String} options.url - 请求路径
     * @prop {Object} options.data - 请求参数
     * @prop {String} options.responseType - 响应的数据类型
     * @prop {String} options.dataType - 如果为json,会尝试对返回的数据做一次 JSON.parse
     * @prop {Object} options.header - 请求header
     * @prop {Object} options.method - 请求方法
     */
    async request(options = {}) {
		options.baseUrl = this.config.baseUrl;
		options.dataType = options.dataType || this.config.dataType;
		// #ifndef MP-ALIPAY || APP-PLUS
		options.responseType = options.responseType || this.config.responseType;
		// #endif
		// #ifdef MP-ALIPAY || MP-WEIXIN
		options.timeout = options.timeout || this.config.timeout;
		// #endif
		// #ifdef H5
		options.withCredentials = isBoolean(options.withCredentials) ? options.withCredentials : this.config.withCredentials;
		// #endif
		options.url = options.url || '';
		options.data = options.data || {};
		options.method = options.method || this.config.method;
		options.header = { ...this.config.header, ...(options.header || {}) };
		// #ifdef APP-PLUS
		options.sslVerify = options.sslVerify || this.config.sslVerify;
		// #endif
		options.getTask = options.getTask || this.config.getTask;
		options = this.interceptors.request(options);
        return new Promise((resolve, reject) => {
			if(!this.config.timer){
				this.config.timer = setTimeout(() => {
					uni.showLoading();
					this.config.timer = null;
				},this.config.loadingTime);
			}
            const requestTask = uni.request({
                url: options.baseUrl + options.url,
                data: options.data,
                header: options.header,
                method: options.method,
                // #ifdef MP-ALIPAY || MP-WEIXIN
                timeout: options.timeout,
                // #endif
                dataType: options.dataType,
                // #ifndef MP-ALIPAY || APP-PLUS
                responseType: options.responseType,
                // #endif
                // #ifdef APP-PLUS
                sslVerify: options.sslVerify,
                // #endif
                // #ifdef H5
                withCredentials: options.withCredentials,
                // #endif
                complete: (response) => {
					// 请求返回后,隐藏loading
					uni.hideLoading();
					// 清除定时器,返回的快的话,无须显示loading
					this.config.timer && clearTimeout(this.config.timer);
					if(response.statusCode == 200){
						let result = this.interceptors.response(response.data);
						if(result){
							resolve(result);
						}else{
							reject(response.data);
						}
					}else{
						if(response.errMsg){
							util.alert(response.errMsg);
						}
						reject(response);
					}
                }
            })
        })
    }
    // GET 请求
    get(url, data = {}, options) {
        return this.request({ url, data, method: 'GET', ...options });
    }
    // POST 请求
    post(url, data = {}, options) {
        return this.request({ url, data, method: 'POST', ...options });
    }
    /**
	 * @function 上传文件
	 * @param {String} url - 请求路径 
	 * @param {options} url - 请求配置项 
	 * @prop {Array} options.files - 仅app与h5支持该选项
	 * @prop {} options.fileType - 仅支付宝小程序支持且必填 images/video/audio
	 * @prop {} options.
	 * */
    uploadFile(url, options) {
        return new Promise((resolve, reject) => {
            const uploadTask = uni.uploadFile({
                url: config.baseUrl + url,
                // #ifdef APP-PLUS || H5
                files: options.files || [],
                // #endif
                // #ifdef MP-ALIPAY
                fileType: options.fileType,
                // #endif
                // #ifdef H5
                file: options.file || null,
                // #endif
                filePath: options.filePath,
                name: options.name,
                header: options.header ? options.header : {},
                formData: options.formData ? options.formData : {},
                complete: (response) => {
                    if (this.validateStatus(response.statusCode)) {
                        response = this.interceptors.response(response)
                        resolve(response)
                    } else {
                        response = this.interceptors.response(response)
                        reject(response)
                    }
                }
            })
            if (options.progressCallback && typeof (options.progressCallback) == 'function') {
                uploadTask.onProgressUpdate(res => {
                    options.progressCallback(res.progress + '%');
                })
            }
        })
    }
    // 下载文件
    downloadFile(url) {
        return new Promise((resolve, reject) => {
            const downloadTask = uni.downloadFile({
                url: url,
                success: () => { },
                fail: () => { },
                complete: () => { }
            })
            // 中断下载
            // downloadTask.abort();
            // 监听下载进度
            // downloadTask.onProgressUpdate(res => {
            //     console.log('下载进度' + res.progress);
            //     console.log('已经下载的数据长度' + res.totalBytesWritten);
            //     console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
            // })
        })
    }
}

export default new Request;