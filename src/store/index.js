import Vue from 'vue'
import Vuex from 'vuex'

import tabbar from './modules/tabbar';
import actions from './actions.js';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		tabbar,
	}
})
