import store from '@/store/index.js';
import config from '@/common/config.js'

export default class Request {
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
        timeout: 30000,
        // #endif
        // #ifdef APP-PLUS
        sslVerify: true,
        // #endif
        // #ifdef H5
        withCredentials: false
        // #endif
    }
    // 拦截器
    interceptors = {
        // 请求拦截器
        request: (config) => {
            return config;

        },
        // 响应拦截器
        response: (response) => {
            return response;
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
        return new Promise((resolve, reject) => {
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
            options.method = options.method || 'GET';
            // options.params = options.params || {};
            options.header = { ...this.config.header, ...(options.header || {}) };
            options.custom = { ...this.config.custom, ...(options.custom || {}) };
            // #ifdef APP-PLUS
            options.sslVerify = options.sslVerify === undefined ? this.config.sslVerify : options.sslVerify;
            // #endif
            options.getTask = options.getTask || this.config.getTask;
            // 
            // let next = true;
            // 

            // const cancel = (t = 'handle cancel', config = options) => {
            //     const err = {
            //         errMsg: t,
            //         config: config
            //     }
            //     reject(err)
            //     next = false
            // }
            // const handleRe = { ...this.requestBeforeFun(options, cancel) };
            // const _config = { ...handleRe };
            // if (!next) return;
            // 
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
                    // response.config = handleRe
                    if (this.validateStatus(response.statusCode)) { // 成功
                        response = this.interceptors.response(response)
                        resolve(response)
                    } else {
                        response = this.interceptors.response(response)
                        reject(response)
                    }
                }
            })
        })
    }
    // GET 请求
    get(url, data, options) {
        return this.request({ url, data, method: 'GET', ...options });
    }
    // POST 请求
    post(url, data, options) {
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