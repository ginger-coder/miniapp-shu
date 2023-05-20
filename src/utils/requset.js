import { client_id, env, envConfig, wxAppId } from '@/common/config.js';
// vuex 的使用  详情参考官网 https://uniapp.dcloud.io/vue-vuex
// import store from '../store/index.js'  
let loadArr = [];
let timer = null;
let isFinish = false;

// 免登录查看路由页面
let noLoginRouteList = [
    'pages/methodExpand/methodExpand',
    'pages/syncReport/syncReport',
    'pages/offlineReport/offlineReport',
    'pages/studyReport/studyReport',
];

export default class Request {
    http(param) {
		let token = uni.getStorageSync('taltoken');
        // 请求参数
        let url = param.url;
        let method = param.method;
        let header = {};
        let data = param.data || {};
        let taltoken = token || '';
        let hideLoading = param.hideLoading || false;

        //拼接完整请求地址
        // let requestUrl = 'https://' + operate.baseURL + url;
        let requestUrl = !param.noBFF ?  `https://${envConfig[env].baseURL}${url}` : `https://${envConfig[env].noBFFBaseURL}${url}`;
        // let requestUrl = !param.noBFF ?  `https://${operate.baseURL}${url}` : `http://${operate.noBFFBaseURL}${url}`;

        //请求方式:GET或POST(POST需配置
        if (method) {
            method = method.toUpperCase(); //小写改为大写
            header = {
                'content-type': 'application/json',
				'taltoken' : taltoken,
				'clientId': client_id,
				// 'Userid': 1186,
				// 'talid': 123,
				// 'Backdoor': 1
            };
        }

        //加载圈
        if (!hideLoading) {
			// clearTimeout(timer);
   //          timer = setTimeout(e=>{
			// 	if(!isFinish){
			// 		wx.showLoading({
			// 		    title: '加载中...'
			// 		});
			// 	}
			// },2000);
        }

        // 返回promise
        return new Promise((resolve, reject) => {
            // 请求
            uni.request({
                url: requestUrl,
                data: data,
                method: method,
                header: header,
                success: (res) => {
                    let response = res.data;
                    let routeList = getCurrentPages();
					if(response.code == 403 && noLoginRouteList.indexOf(routeList[routeList.length - 1].route) === -1){
						uni.clearStorageSync();
						uni.navigateTo({
							url:'/pages/Login/Login?code=403'
						});
						return;
					}

					if(response.code == 200 ){
						resolve(response.data);
						return;
					}else{
						reject(response.msg);
					}

					if (noLoginRouteList.indexOf(routeList[routeList.length - 1].route) === -1) {
                        wx.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 2000
                        });
                    }
                },
                //请求失败
                fail: (e) => {
                    reject(e);
					// wx.showToast({
					// 	title: JSON.stringify(e),
					// 	icon: 'none'
					// });
                },
                //请求完成
                complete() {
					isFinish = true;
                    //隐藏加载
                    if (!hideLoading) {
                        // wx.hideLoading();
                    }
                }
            })
        })
    }
}