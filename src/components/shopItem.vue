<template>
    <view class="card">
        <view class="shop-left">
            <image src="../static/1.png" mode="widthFix"></image>
        </view>
        <view class="shop-right">
            <view class="shop-title"> 主题式英语单词画册1 </view>
            <view class="shop-tag" v-if="shopType == 'item'">
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
                <view class="buy-style" v-if="shopType == 'item'">
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
</template>

<script>
import { strong } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';
export default {
    name: "shopItem",
    props: {
		shopType: {
			type: String,
			default: 'item'
		}
	},
    data() {
        return {};
    },
    onLoad() {},
    methods: {
    },
};
</script>

<style lang="scss" scoped>
.card {
        padding: 20rpx;
        margin-bottom: 30rpx;
        box-shadow: 0px 0px 15px #e8e8e8;
        display: flex;
		border-radius: 20rpx;
		background-color: #fff;
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
				margin-bottom: 20rpx;
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
</style>
