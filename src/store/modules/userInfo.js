import api from '@/common/api.js';
import * as mutation from '../mutations.js';
import _ from 'lodash';


export default {
	state: {
		info: {
			"id": 0,
			"talId": "",
			"name": "",
			"mobile": "",
			"uType": 0,
			"pic": "",
			"picUrl": "",
			"uSource": "",
			"createdAt": "",
			"school": "",
			"schoolYear": "",
			"learnPeriodId": 0,
			"provinceName": "",
			"cityName": "",
			"countyName": "",
			"mathScore": 0,
			"chineseScore": 0,
			"englishScore": 0,
			"englishBook": 0,
			"mathBook": 0,
			"chineseBook": 0,
			"mathProcess": 0,
			"chineseProcess": 0,
			"englishProcess": 0,
			"point": 0,
			"midTermReview": "",
			"learningStyle": 0,
			"experience": 0,
			"unionId": "",
			"grade": 0,
			"sex": "1",
			"commonlyDrug": "",
			"allergen": "",
			"dislikeFood": "",
			"enjoin": "",
			"provinceId": 0,
			"cityId": 0,
			"areaId": 0,
			"schoolId": "",
			"isPay": ''
		}
	},
	mutations: {
		[mutation.GET_USER_INFO](state, payload) {
			state.info = _.cloneDeep(payload);
			if(payload){
				uni.setStorageSync('userInfo', JSON.stringify(payload));
			}else{
				uni.setStorageSync('userInfo', null);
			}
			
		}
	},
	actions: {
		async getUserInfo({
			commit
		}, payload) {
			return new Promise((resolve, reject) => {
				api.getUserInfo()
					.then(res => {
						commit(mutation.GET_USER_INFO, res);
						resolve(res);
					})
					.catch(err => {
						reject(err);
					})
			})
		}
	}
};
