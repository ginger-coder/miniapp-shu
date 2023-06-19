import { env, envConfig, wxAppId } from "@/common/config.js";
import { login } from '@/utils/common';

// vuex 的使用  详情参考官网 https://uniapp.dcloud.io/vue-vuex
// import store from '../store/index.js'

const timer = null;
export default class Request {
    http(param) {
		
        let token = uni.getStorageSync("token") || '';
        // 请求参数
        let url = param.url;
        let method = param.method;
        let header = {
			"content-type": "application/json",
		};
        let data = param.data || {};;
        let hideLoading = param.hideLoading || false;

        //拼接完整请求地址
        // let requestUrl = 'https://' + operate.baseURL + url;
        let requestUrl = `${envConfig[env].baseURL}${url}`;
        // let requestUrl = !param.noBFF ?  `https://${operate.baseURL}${url}` : `http://${operate.noBFFBaseURL}${url}`;

        //请求方式:GET或POST(POST需配置
        if (method) {
            method = method.toUpperCase(); //小写改为大写
			Object.assign(
				header,
				{
					Authorization: token
				}
			)
        }

        //加载圈
        if (!hideLoading) {
            uni.showLoading({
                title: "加载中...",
            });
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
                    if (response.code == 200) {
                        resolve(response.data);
                    } else if(response.code == 401) {
						// 重新获取wx_token
						clearTimeout(timer);
						timer = setTimeout(() => {
							login('reload');
						}, 3000);
					}
					else {
						uni.showToast({
							icon: 'none',
							title: response?.msg || '请求失败'
						})
						reject(response);
                    }
                },
                //请求失败
                fail: (e) => {
                    reject(e);
                },
                //请求完成
                complete() {
                    //隐藏加载
                    if (!hideLoading) {
                        uni.hideLoading();
                    }
                },
            });
        });
    }
}
