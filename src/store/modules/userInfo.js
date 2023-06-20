import api from "@/common/api.js";
import * as mutation from "../mutations.js";
import _ from "lodash";

export default {
    state: {
        info: {
            age: 1,
            allergySource: "123234",
            avatarurl:
                "",
            cannotEat: "",
            chineseScore: '',
            createTime: null,
            gender: 1,
            mathScore: null,
            nickName: "",
            otherMatter: "",
            schoolGradeId: '',
            schoolGradeName: "",
            schoolId: "",
            schoolName: "",
            textBookName: null,
            updateTime: "",
            useDrug: "",
            userId: "",
        },
    },
    mutations: {
        [mutation.GET_USER_INFO](state, payload) {
            console.log("payload", payload);
            state.info = _.cloneDeep(payload);
            if (payload) {
                uni.setStorageSync("userInfo", JSON.stringify(payload));
            } else {
                uni.setStorageSync("userInfo", null);
            }
        },
    },
    actions: {
        async getUserInfo({ commit }, payload) {
            return new Promise((resolve, reject) => {
                api.getUserInfo()
                    .then((res) => {
                        commit(mutation.GET_USER_INFO, res);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
};
