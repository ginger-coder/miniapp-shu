const hostParams = {
	development: 'api-fetest.ai101xuexi.com', //新版 开发
	development_NoBff: 'parent-gateway-rdtest.ai101xuexi.com', //新版 开发
    production  : 'api-backend.ai101xuexi.com', //线上
    productionNoBff  : 'parent-gateway.ai101xuexi.com', //线上 no bff
    test_xiaoyang : 'test09-qatest.ai101xuexi.com', //测试
    test_hongning_NoBff : 'test11-qatest.ai101xuexi.com', //测试
	dev_liuyang_NoBff: '8.131.68.38:9610', // 开发 no bff
	dev_lindong_NoBff: '8.131.68.38:9084', // 开发 no bff
	gray : 'gray-api.ai101xuexi.com', // 灰度
	grayNoBff : 'gray-parent-gateway.ai101xuexi.com', // 灰度 no bff
	// ugc项目
	ugcGrayHost: 'https://gray-online.ai101xuexi.com/ugc.html',
	ugcOnlineHost: 'https://online.ai101xuexi.com/ugc.html',
}
/**
 * wrongHost 需要更在gray环境访问test域名
 */
const envConfig = {
	dev: {
		type : 'sandbox',
		baseURL: hostParams['development'],
		noBFFBaseURL: hostParams['development_NoBff'],
		wrongHost: hostParams['ugcGrayHost'] + '/#/miniappWrongQuestion', 
	},
	test: {
		type : 'sandbox',
		baseURL: hostParams['test_xiaoyang'],
		noBFFBaseURL: hostParams['test_hongning_NoBff'],
		wrongHost: hostParams['ugcGrayHost'] + '/#/miniappWrongQuestion'
	},
	gray: {
		type : 'production',
		baseURL: hostParams['gray'],
		noBFFBaseURL: hostParams['grayNoBff'],
		wrongHost: hostParams['ugcGrayHost'] + '/#/miniappWrongQuestion'
	},
	prod: {
		type : 'production',
		baseURL: hostParams['production'],
		noBFFBaseURL: hostParams['productionNoBff'],
		wrongHost: hostParams['ugcOnlineHost'] + '/#/miniappWrongQuestion'
	}
}
const env = 'prod';  // envConfig的key值为当前环境
const client_id = '454201';
const wxAppId= 'wx772257f5c03e638f';
const QQMapKey = 'I5QBZ-VX5CS-4JSOA-6BILI-CL7IK-RCBOJ';
export {
	client_id,
	QQMapKey,
	env,
	envConfig,
	wxAppId
}