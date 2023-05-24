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
};
