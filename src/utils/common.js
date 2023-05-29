import api from '@/common/api.js';
export const login = () => {
    wx.login({
        success(res) {
            if (res.code) {
                //发起网络请求
				api.initLogin(res.code)
					.then(res => {
						// replace(/\"/g, '')
						uni.setStorageSync('token', res.token.replace(/\"/g, ''));
						uni.setStorageSync('isBindingPhone', res.isBindingPhone);
					})
            } else {
                console.log("登录失败！" + res.errMsg);
            }
        },
    });
};
