import Request from '@/utils/requset.js'
let request = new Request().http;
import {
	envConfig,
	env
} from '@/common/config.js';

//全局定义请求头
export default {
	initLogin(data) {
		return request({
			url: '/wxLogin/' + data,
			method: 'GET',
			data: data, 
			hideLoading: false,
		})
	},
	getGradeBooksByGradeId(gradeId) {
		return request({
			url: '/book/getGradeBooks/' + gradeId,
			method: 'GET',
			hideLoading: false,
		})
	},
	getLabelList(type) {
		return request({
			url: '/book/getLabel/' + type,
			method: 'GET',
			hideLoading: false,
		})
	},
	joinBookRack(bookId) {
		return request({
			url: '/book/joinBookRack/' + bookId,
			method: 'GET',
			hideLoading: false,
		})
	},
	getBookRack() {
		return request({
			url: '/book/getBookRack',
			method: 'GET',
			hideLoading: false,
		})
	},
	deleteCartBook(bookId) {
		return request({
			url: '/book/del/' + bookId,
			method: 'GET',
			hideLoading: false,
		})
	},
	getClassBooksList(data) {
		return request({
			url: '/book/getClassBooks',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	getBooksList(data) {
		return request({
			url: '/book/list',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	onPlaceOrder(data) {
		return request({
			url: '/order/placeOrder',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	getTmpSecret() {
		return request({
			url: '/cos/getTmpSecret',
			method: 'GET',
			hideLoading: false,
		})
	},
	bindingPhone(code) {
		return request({
			url: '/bindingPhone/' + code,
			method: 'GET',
			hideLoading: false,
		})
	},
	getBookRetrieval(data) {
		return request({
			url: '/book/getBookRetrieval',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	saveBasic(data) {
		return request({
			url: '/student/saveBasic',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	updateSchool(data) {
		return request({
			url: '/student/updateSchool',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	updateHealth(data) {
		return request({
			url: '/student/updateHealth',
			method: 'POST',
			data: data, 
			hideLoading: false,
		})
	},
	// 字典/dict/school
	getDict(prop) {
		return request({
			url: '/dict/' + prop,
			method: 'GET',
			hideLoading: false,
		})
	},
	// 获取用户信息
	getUserInfo(prop) {
		return request({
			url: '/student/getUserInfo',
			method: 'GET',
			hideLoading: false,
		})
	},
};
