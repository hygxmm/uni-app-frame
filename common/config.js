const DEV = 'https://btjtest.yuanjiwei.cn/'; // 开发环境地址
const PRODUCT = 'https://btj.yuanjiwei.cn/'; // 生产环境地址

// 根据运行环境切换主域名
let DOMAIN = process.env.NODE_ENV === 'development' ? DEV : PRODUCT;

export default {
	domain: DOMAIN, // 主域名
	apiHost: DOMAIN + 'api/', // api主域名
}