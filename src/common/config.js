const hostParams = {
	development: 'http://152.136.126.96:8010', //新版 开发
    production  : 'http://152.136.126.96:8010', //线上
}
/**
 * wrongHost 需要更在gray环境访问test域名
 */
const envConfig = {
	dev: {
		baseURL: hostParams['development'],
	},
	prod: {
		baseURL: hostParams['production'],
	}
}
const env = 'dev';  // envConfig的key值为当前环境
const wxAppId= 'wx772257f5c03e638f';
export {
	env,
	envConfig,
	wxAppId
}