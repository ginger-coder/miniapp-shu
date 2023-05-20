import api from '@/common/api.js';
export default  {
	readReport({commit}, payload){
		console.log('payload',payload)
		api.readReport(payload)
			.then(res=>{
				console.log(payload,'-betterMe已读');
			})
	},
	readStoreReport({commit}, payload){
		api.readStoreReport(payload)
			.then(res=>{
				console.log(payload,'-线下门店报告已读');
			})
	}
}