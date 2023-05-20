<template>
    <view class="shop-cart" @click="onCart">
		书架
	</view>
</template>

<script>
export default {
	name: "shopCart",
	props: ['value'],
    data() {
        return {};
    },
    onLoad() {},
    methods: {
		onCart() {
			uni.navigateTo({
				url: '/pages/cart/index'
			})
		}
	},
};
</script>

<style lang="scss" scoped>
.shop-cart {
    width: 65px;
    height: 65px;
    background: url("@/static/icon-cart.png") no-repeat center;
    background-size: 100% auto;
    color: #fff;
    position: fixed;
    bottom: 150rpx;
    right: 40rpx;
    font-size: 12px;
    text-align: center;
    padding-top: 34px;
    box-sizing: border-box;
}
</style>
