const health_reg_an = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
const msg_reg = /^[a-zA-Z\u4e00-\u9fa5]{2,12}$/;
const abc_reg = /^[a-zA-Z]+$/
const orderStatus = {
	1 : '商品期次不存在',
	2 : '商品不存在',
	3 : '商品已下架',
	4 : '商品期次不在售卖期',
	5 : '售罄',
	6 : '期次价格发生变化',
	11 : '订单不存在',
	12 : '非本人订单',
	13 : '订单状态不正确'
}
export default {
	health_reg_an,
	msg_reg,
	abc_reg,
	orderStatus
}