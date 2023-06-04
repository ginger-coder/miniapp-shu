import api from '@/common/api.js';
export const login = (reload = false, cb) => {
    wx.login({
        success(res) {
            if (res.code) {
                //发起网络请求
				api.initLogin(res.code)
					.then(res => {
						// replace(/\"/g, '')
						uni.setStorageSync('token', res.token.replace(/\"/g, ''));
						uni.setStorageSync('isBindingPhone', res.isBindingPhone);
						if(reload == 'reload') {
							reloadPage();
						}
					})
            } else {
                console.log("登录失败！" + res.errMsg);
            }
        },
    });
};

export const reloadPage = () => {  
	// 页面重载
	const pages = getCurrentPages()
	// 声明一个pages使用getCurrentPages方法
	const curPage = pages[pages.length - 1]
	// 声明一个当前页面
	curPage.onLoad(curPage.options) // 传入参数
	curPage.onShow()
	curPage.onReady()
	// 执行刷新
};
