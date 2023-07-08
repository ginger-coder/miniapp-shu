<template>
    <view class="index-container">
        <view class="banner">
            <view class="chinese">学家托管</view>
            <view class="englist">Shared Quotation</view>
        </view>
        <view class="book-list-container">
            <image
                class="book-banner"
                src="../../static/index/icon-index-banner1.png"
                mode="widthFix"
            ></image>
            <template v-if="shopList.length">
                <view
                    
                    class="book-item"
                    v-for="(item, index) in shopList"
                    :key="item.id"
                >
                    <view class="book-image">
                        <image
                            :src="item.url | formatBaseURL"
                            mode="aspectFit"
                            @error="onImageError($event, index)"
                        ></image>
                    </view>
                    <view class="book-title">
                        <view class="title">{{ item.title }}</view>
                        <!-- <view class="price"> ￥800/周 </view> -->
                    </view>
                    <!-- <view class="book-desc"> 这是描述文案 </view> -->
                </view>
            </template>
			<view class="empty" v-else>
                <u-empty mode="data"> </u-empty>
            </view>
        </view>
        <tab-bar />
    </view>
</template>

<script>
import { env, envConfig, wxAppId } from "@/common/config.js";

export default {
    data() {
        return {
            bannerList: [],
            shopList: [],
        };
    },
	filters: {
		formatBaseURL: function(path){
			return path.indexOf('http') == -1 ? envConfig[env].baseURL + '' + path : path;
		}
	},
    onLoad() {
        this.init();
    },
    onPullDownRefresh() {
		this.init();
	},
    methods: {
        init() {
            // this.initBanner();
            this.initList();
        },
        async initBanner() {
            this.bannerList = await this.$getDict("bannerList");
        },
        async initList() {
            this.shopList = await this.$getDict("getBanners");
            uni.stopPullDownRefresh();
        },
        onImageError(e, index) {
			if(e.detail.errMsg) {
				this.shopList[index].url = "https://cdn.uviewui.com/uview/empty/data.png";
			}
        },
    },
};
</script>

<style lang="scss" scoped>
.empty {
	height: 100%;
	padding-top: 200rpx;
}
.index-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.banner {
    height: 507rpx;
    position: relative;
    z-index: 1;
    background: $themeColor url("../../static/index/icon-index-banner2.png")
        no-repeat top left;
    background-position: -60rpx -60rpx;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    font-weight: 600;
    box-sizing: border-box;
    padding-top: 100rpx;
}
.book-list-container {
    flex: 1;
    width: 100%;
    background-color: #e6f4f5;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
    position: relative;
    z-index: 2;
    margin-top: -30rpx;
    padding: 30rpx;
    box-sizing: border-box;
    .book-banner {
        position: absolute;
        top: -310rpx;
        left: 145rpx;
        width: 60%;
    }
    .book-item {
        background-color: #fff;
        border-radius: 15rpx;
        padding: 20rpx;
        box-sizing: border-box;
        margin-bottom: 30rpx;
        .book-image {
            width: 100%;
            height: 300rpx;
            overflow: hidden;
            margin-bottom: 10rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .book-title {
            padding: 10rpx 0;
            display: flex;
            justify-content: space-between;
            .title {
                font-size: 30rpx;
                font-weight: 400;
                // color: $themeColor;
            }
            .price {
                font-size: 28rpx;
                color: #ff8d00;
            }
        }
        .book-desc {
            font-size: 24rpx;
        }
    }
}
</style>
