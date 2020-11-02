const DEV = 'http://111.229.13.202:3210/'; // 开发环境地址
const PRODUCT = 'http://111.229.13.202:3210/'; // 生产环境地址

// 根据运行环境切换主域名
let DOMAIN = process.env.NODE_ENV === 'development' ? DEV : PRODUCT;

export default {
	domain: DOMAIN, // 主域名
	apiHost: DOMAIN + 'api/v1/', // api域名
}
