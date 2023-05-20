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
            <view class="card">
                <!-- 内容 -->
                <view class="shop-left">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="shop-right">
                    <view class="shop-title"> 主题式英语单词画册1 </view>
                    <view class="shop-tag">
                        <view class="tag">
                            <u-tag
                                text="已借过"
                                shape="circle"
                                bgColor="#EDF8D8"
                                color="#9FC152"
                                borderColor="#EDF8D8"
                            ></u-tag>
                        </view>
                        <view class="tag">
                            <u-tag
                                text="高人气"
                                shape="circle"
                                bgColor="#FFE8D0"
                                color="#DE7A00"
                                borderColor="#FFE8D0"
                            ></u-tag>
                        </view>
                        <view class="tag">
                            <u-tag
                                text="已借完"
                                shape="circle"
                                bgColor="#eee"
                                color="#848484"
                                borderColor="#eee"
                            ></u-tag>
                        </view>
                    </view>
                    <view class="shop-desc">
                        介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
                    </view>
                    <view class="shop-buy">
                        <view class="price">￥29.9</view>
                        <view class="buy-style">
                            <u-button
                                type="primary"
                                text="加入书架"
                                shape="circle"
                                color="#00CDDA"
                            ></u-button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
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
    .card {
        padding: 20rpx;
        margin-bottom: 30rpx;
        box-shadow: 0px 0px 15px #e8e8e8;
        display: flex;
        .shop-left {
            width: 100px;
            image {
                width: 100%;
            }
        }
        .shop-right {
            flex: 1;
            padding-left: 15rpx;
            .shop-title {
                font-size: 30rpx;
            }
            .shop-desc {
                height: 100rpx;
                font-size: 24rpx;
                color: #9d9d9d;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }
            .shop-tag {
                padding: 10rpx 0;
                display: flex;
                .tag {
                    margin-right: 20rpx;
                }
            }
            .shop-buy {
                display: flex;
                justify-content: space-between;
                padding: 15px 0;
                .price {
                    font-size: 28rpx;
                }
            }
        }
    }
}
</style>
