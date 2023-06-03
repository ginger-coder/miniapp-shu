import Vue from "vue";
import App from "./App";
import uView from "uview-ui";
import tabBar from '@/custom-tab-bar/index.vue';
import shopCart from '@/components/shopCart.vue';
import "./uni.promisify.adaptor";
import api from '@/common/api.js';
import store from './store';
import { login } from '@/utils/common';

login();

Vue.component('tab-bar', tabBar);
Vue.component('shop-cart', shopCart);
Vue.prototype.$api = api;
Vue.prototype.$toast = uni.$u.toast;
Vue.prototype.$getDict = api.getDict;
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'px'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 14
		},
		checkbox: {
			size: 14
		},
	}
})

Vue.config.productionTip = false;
Vue.use(uView);

Vue.prototype.$api = api;
App.mpType = "app";

const app = new Vue({
	store,
    ...App,
});
app.$mount();
