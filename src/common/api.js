import Request from '@/utils/requset.js'
let request = new Request().http;
import {
	envConfig,
	env
} from '@/common/config.js';

const parentPath = '/v1/api/prarent';
const userPath = '/v1/api/user';
const reportPath = '/v1/api/report'
const growthCenterPath = '/v1/api/growthCenter'
const growthCenterPath_v2 = '/v2/api/growthCenter'
const sharePath = '/v1/api/share'
const studyPath = '/v1/api/study'

//全局定义请求头
export default {
	//成长中心-学习日期查询
	getStudyDay: function(data) {
		return request({
			url: growthCenterPath + '/studyDay',
			method: 'GET', //请求方式
			data: data, //请求数据
			hideLoading: true,
			noBFF: true,
		})
	},
	//成长中心-每日报告总结
	getDailyDetail: function(data) {
		return request({
			// url: parentPath + '/dailyDetail', 
			url: growthCenterPath + '/dailyDetail',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	//成长中心-每日报告总结
	getDailyDetail_v2: function(data) {
		return request({
			// url: parentPath + '/dailyDetail', 
			url: growthCenterPath_v2 + '/dailyDetail',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 查询用户信息
	getUserInfo: function(data) {
		return request({
			url: userPath + '/info',
			// url: parentPath + '/getUserInfo',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 查询学校列表
	getSchoolList: function(data) {
		return request({
			url: userPath + '/schoolList',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	getUserToken(data) {
		return request({
			url: userPath + '/codelogin',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	//修改学校信息
	editSchoolInfo(data) {
		return request({
			url: userPath + '/schoolInfo',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	//修改基本信息(姓名、性别、照片)
	editUserBaseInfo(data) {
		return request({
			url: userPath + '/baseInfo',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	//修改签到照片
	editUserCheckinInfo(data) {
		return request({
			url: userPath + '/checkinInfo',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	//修改健康档案
	editHealthInfo(data) {
		return request({
			url: userPath + '/healthInfo',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	////获取暑期列表
	getSummerDetail(data) {
		return request({
			url: parentPath + '/getSummerDetail',
			method: 'GET', //请求方式
			data: data, //请求数据
		})
	},
	getSummerkPointList(data) {
		return request({
			url: parentPath + '/getSummerkPointList',
			method: 'GET', //请求方式
			data: data, //请求数据
		})
	},
	postPreShare(data) {
		return request({
			url: parentPath + '/postPreShare',
			method: 'POST', //请求方式
			data: data, //请求数据
		})
	},
	// 报告详情
	getLearningDetail(data) {
		return request({
			url: parentPath + '/learningDetail',
			method: 'GET', //请求方式
			data: data, //请求数据
		})
	},
	// 报告详情
	getLearningList(data) {
		return request({
			url: reportPath + '/syncReportList',
			// url: parentPath + '/getLearningList',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 思维拓展报告列表
	getThinkingReportList(data) {
		return request({
			url: reportPath + '/thinkingReportList',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 思维拓展报告详情
	getThinkingReportInfo(data) {
		return request({
			url: reportPath + '/thinkingReportInfo',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 判断是否有报告
	getReportIsExist(data) {
		return request({
			url: reportPath + '/reportIsExist',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 暑期报告
	getSummerDetail(data) {
		return request({
			url: parentPath + '/getSummerDetail',
			method: 'GET', //请求方式
			data: data, //请求数据
		})
	},
	// 成长中心-点评列表
	getDailyShopReport(data) {
		return request({
			// url: parentPath + '/DailyShopReport',
			url: growthCenterPath + '/dailyShopReport',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 成长中心-一周课表
	getWeekSchedule(data) {
		return request({
			url: growthCenterPath + '/schedule/days/list',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 成长中心-一周课表
	getLastReport(data) {
		return request({
			url: reportPath + '/learning/lastReport',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 成长中心-一周课表
	getLearningRecord(data) {
		return request({
			url: '/v1/api/study/learningRecord',
			method: 'GET', //请求方式
			data: data, //请求数据
		})
	},
	//解绑
	unBindWechart(data) {
		return request({
			url: userPath + '/logout',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	//报告已读
	readReport(data) {
		return request({
			url: parentPath + '/readReport',
			method: 'POST', //请求方式
			data: data, //请求数据
		})
	},
	//线下门店报告已读
	readStoreReport(data) {
		return request({
			url: parentPath + '/readStoreReport',
			method: 'POST', //请求方式
			data: data, //请求数据
		})
	},
	// 商品购买
	productBuy(data) {
		return request({
			url: '/v1/api/product/buy',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 去支付
	orderBuy(data) {
		return request({
			url: '/v1/api/order/pay',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	getOrderDetail(data) {
		return request({
			url: '/v1/api/order/detail',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	orderClose(data) {
		return request({
			url: '/v1/api/order/pay/cancel',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 订单列表接口
	getOrderList(data) {
		return request({
			url: '/v1/api/order/list',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		})
	},
	// 预分享
	getPreShare(data) {
		return request({
			url: sharePath + '/preShare',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		});
	},
	// 分享
	getShareContent(data) {
		return request({
			url: sharePath + '/content',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		});
	},
	// 已读
	readShopReport(data) {
		return request({
			url: growthCenterPath + '/link/read',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		});
	},
	// 已读
	readSummerShopReport(data) {
		return request({
			url: growthCenterPath + '/readShopReport',
			method: 'POST', //请求方式
			data: data, //请求数据
			noBFF: true,
		});
	},
	// 同步巩固详情
	getSyncReportInfo(data) {
		return request({
			url: reportPath + '/syncReportInfo',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		});
	},
	// 获取有课城市列表
	getLessonCityList(data) {
		return request({
			url: '/v1/api/product/getCityList',
			method: 'GET', //请求方式
			data: data, //请求数据
			noBFF: true,
		});
	},
};
