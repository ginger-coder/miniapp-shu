import talUserCenter from "@udc/tal-passport-minisdk";
import { client_id, env, envConfig, wxAppId } from "@/common/config.js";

export let talLoginInit = function (callback = function () {}) {
    talUserCenter.config({
        client_id: client_id || "454201",
        env: envConfig[env].type || "sandbox", // 环境标识： 'sandbox': 沙箱环境； 'production': 线上生产环境；默认为生产
        mini_appid: wxAppId,
        loginout_callback: (e) => {
            uni.showToast({
                title: "登录已失效",
                icon: "error",
                duration: 2000,
            });
        },
        init_callback: {
            success: (e) => {
                console.log(e, "[login init]: success");
            },
            fail: (e) => {
                console.error(e, "[login init]: fail");
            },
        },
        mini_version: "1.0.0",
    });

    callback();
};
export let talLogin = talUserCenter;

export const loginCodeByAuth = () => {
    talUserCenter.loginCodeByAuth({
        success: function (res) {
            if (res.data.errcode == 0) {
                // 开始计时
                let keyTime = new Date().getTime();
                let responseData = res.data.data;
                if (res.data.data.mp_authorized) {
                    // loginAdapter(action, code);
                } else {
                    // 未授权
                }
            }
        },
        fail: function (error) {
            console.log(error);
        },
    });
};
