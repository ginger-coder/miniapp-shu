<template>
    <view class="index-container">
        <u-sticky bgColor="#FAFAFA">
            <view class="header">
                <u-search
                    placeholder="搜索"
					:showAction="false"
					@search="onSearch"
                ></u-search>
            </view>
        </u-sticky>
        <u-gap></u-gap>
        <view class="layout">
			<shopItem />
			<shopItem />
        </view>
		<shop-cart :value="count" />
    </view>
</template>

<script>
import shopItem from '@/components/shopItem.vue';
export default {
	components: {
		shopItem
	},
    data() {
        return {
			count: 0,
        };
    },
    onLoad() {},
    methods: {
        onSelectLevel(item) {
            this.activeLevel = item.value;
        },
		onSearch(value) {
			console.log('value', value);
		}
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 30rpx 30rpx 0;
}
.more {
    color: #00cdda;
}
.layout {
    padding: 0 30rpx 30rpx;
}
</style>
