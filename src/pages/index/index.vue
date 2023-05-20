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
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
            <view class="book-item">
                <view class="book-image">
                    <image src="../../static/1.png" mode="widthFix"></image>
                </view>
                <view class="book-title">
                    <view class="title"> 这是标题 </view>
                    <view class="price"> ￥800/周 </view>
                </view>
                <view class="book-desc"> 这是描述文案 </view>
            </view>
        </view>
        <tab-bar />
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    onLoad() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
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
    padding-top: 80rpx;
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
            }
        }
        .book-title {
            padding: 10rpx 0;
            display: flex;
            justify-content: space-between;
            .title {
                font-size: 30rpx;
                font-weight: 400;
                color: $themeColor;
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
