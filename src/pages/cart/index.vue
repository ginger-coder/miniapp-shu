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
            <u-swipe-action>
                <u-swipe-action-item
                    :options="options1"
                    v-for="(item, index) in shopList"
                    :key="index"
                    @click="onRemove(item)"
                >
                    <view class="swipe-action u-border-bottom">
                        <view class="swipe-action__content">
                            <view class="shop-item">
                                <checkbox class="select"></checkbox>
                                <view class="shop-image">
                                    <image
                                        src="../../static/1.png"
                                        mode="widthFix"
                                    ></image>
                                </view>
                                <view class="shop-content">
                                    <view class="shop-title"
                                        >主题式英语单词画册{{ item }}</view
                                    >
                                    <view class="shop-price">￥29.9</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </u-swipe-action-item>
            </u-swipe-action>
        </view>
        <view class="footer-layout">
            <view class="content">
                <div class="footer-left">
                    <checkbox class="all-select"></checkbox>
                    <view class="desc"> 已选：{{ sum }}本，每次限5本 </view>
                </div>
                <view class="buy-style">
                    <u-button
                        type="primary"
                        text="借阅下单"
                        shape="circle"
                        color="#00CDDA"
                    ></u-button>
                </view>
            </view>
            <u-safe-bottom></u-safe-bottom>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            shopList: [1, 2, 3, 4],
            options1: [
                {
                    text: "删除",
                    style: {
                        backgroundColor: "#F56C6C",
                    },
                },
            ],
            alway: 6,
        };
    },
    computed: {
        sum() {
            if (this.alway <= 5) {
                return this.alway;
            } else {
                return 5;
            }
        },
    },
    onLoad() {},
    methods: {
        onSearch(value) {
            console.log("value", value);
        },
        onRemove(item) {
            console.log("itrm", item);
        },
    },
};
</script>

<style lang="scss" scoped>
.swipe-action {
    &__content {
        padding: 25rpx 0;

        &__text {
            font-size: 15px;
            color: $u-main-color;
            padding-left: 30rpx;
        }
    }
}
.header {
    padding: 30rpx 30rpx 0;
}

.footer-layout {
    width: 100%;
    box-shadow: 0px -2px 5px #e8e8e8;
    position: fixed;
    bottom: 0;
    left: 0;
	background-color: #fff;
    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
		padding: 30rpx;
        .footer-left {
            display: flex;
            align-items: center;
        }
        .desc {
            color: #a7a7a7;
        }
    }
}
.layout {
    .shop-item {
        background: #fff;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        padding: 30rpx;
        .select {
            margin-right: 15rpx;
        }
        .shop-image {
            width: 100rpx;
            image {
                width: 100%;
            }
        }
        .shop-content {
            padding-left: 15rpx;
            .shop-title {
                font-size: 30rpx;
                margin-bottom: 30rpx;
            }
            .shop-price {
                font-size: 26rpx;
            }
        }
    }
}
</style>
