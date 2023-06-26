<template>
    <view class="card">
        <view class="shop-left">
            <image
				class="shop-image"
                :src="book.cover | formatBaseURL"
                mode="aspectFit"
                @error="onImageError($event, book)"
            ></image>
        </view>
        <view class="shop-right">
            <view class="shop-title">{{ book.nickName }}</view>
            <view class="shop-tag" v-if="shopType == 'item'">
                <view class="tag" v-if="book.borrowed">
                    <u-tag
                        text="已借过"
                        shape="circle"
                        bgColor="#EDF8D8"
                        color="#9FC152"
                        borderColor="#EDF8D8"
                    ></u-tag>
                </view>
                <view class="tag" v-for="item in book.labels" :key="item">
                    <u-tag
                        :text="item"
                        shape="circle"
                        bgColor="#FFE8D0"
                        color="#DE7A00"
                        borderColor="#FFE8D0"
                    ></u-tag>
                </view>
            </view>
            <view class="shop-desc">
                {{ book.introduction }}
            </view>
            <view class="shop-buy">
                <view class="price">￥{{ book.price }}</view>
                <view class="buy-style" v-if="shopType == 'item'">
                    <u-button
                        type="primary"
                        text="加入书架"
                        shape="circle"
                        color="#00CDDA"
                        @click="handleClick(book)"
                    ></u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { env, envConfig } from "@/common/config.js";
export default {
    name: "shopItem",
    filters: {
        formatBaseURL: function (path) {
            return path?.indexOf("http") == -1
                ? envConfig[env].baseURL + "" + path
                : path;
        },
    },
    props: {
        shopType: {
            type: String,
            default: "item",
        },
        book: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {};
    },
    onLoad() {},
    methods: {
        onImageError(e, book) {
            if (e.detail.errMsg) {
                book.cover = "https://cdn.uviewui.com/uview/empty/data.png";
            }
        },
        async handleClick(book) {
            await this.$api.joinBookRack(book.bookId);
            this.$toast("加入成功");
        },
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
        .shop-image {
            width: 100%;
            height: 100%;
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
