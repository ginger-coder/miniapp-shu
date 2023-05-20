<template>
    <view class="order-container">
        <div class="layout">
            <div class="card-box">
                <div class="order-info-item">
                    <div class="order-info-title">取书地址</div>
                    <div class="order-info-content">
                        山西省晋中市榆次区顺城西街46号
                    </div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-title">取书时间</div>
                    <div class="order-info-content">
                        山西省晋中市榆次区顺城西街46号
                    </div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-title">借阅日期</div>
                    <div class="order-info-content">
                        <span>2023-03-09</span>
                        <span>至</span>
                        <span>2023-03-09</span>
                    </div>
                </div>
            </div>
            <div class="book-layout">
                <shopItem shop-type="order" />
            </div>
            <div class="card-box">
                <div class="order-info-item">
                    <div class="order-info-title">押金</div>
                    <div class="order-info-content">
                        <span class="money">￥0</span>
                        <span>会员免租金</span>
                    </div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-title">押金</div>
                    <div class="order-info-content">
                        <span class="money">￥200</span>
                        <span>已总价的70%</span>
                    </div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-title">规则</div>
                    <div class="order-info-content">
                        这是规则这是规则这是规则这是规则这是规则这是规则
                    </div>
                </div>
            </div>
        </div>
        <u-picker :show="timeDialog" :columns="columns"></u-picker>
        <view class="footer-layout">
            <view class="content">
                <view class="buy-style">
                    <u-button
                        type="primary"
                        text="提交下单"
                        shape="circle"
                        color="#00CDDA"
                        @click="open('authDialog')"
                    ></u-button>
                </view>
            </view>
            <u-safe-bottom></u-safe-bottom>
        </view>
        <u-popup
            class="msg-popup"
            :show="successDialog"
            :closeOnClickOverlay="false"
            mode="center"
            @close="() => close('successDialog')"
            @open="() => open('successDialog')"
        >
            <view class="success-container">
                <view class="title">下单成功</view>
                <view class="msg-item">请于 2023-02-23 20:23 - 21:30</view>
                <view class="msg-item"
                    >前往
                    <text class="address"
                        >山西省晋中市榆次区顺城西街46号</text
                    ></view
                >
                <view>取走您的图书哟！</view>
                <view class="footer">
                    <div class="btn">
                        <u-button
                            type="primary"
                            text="返回修改"
                            shape="circle"
                            color="#00CDDA"
                            class="btn"
                            @click="close('successDialog')"
                        ></u-button>
                    </div>
                    <div class="btn">
                        <u-button
                            type="primary"
                            text="确定"
                            shape="circle"
                            color="#00CDDA"
                            class="btn"
                            @click="close('successDialog')"
                        ></u-button>
                    </div>
                </view>
            </view>
        </u-popup>
        <u-popup
            class="msg-popup"
            :show="authDialog"
            :closeOnClickOverlay="false"
            mode="center"
            @close="() => close('authDialog')"
            @open="() => open('authDialog')"
        >
            <view class="success-container">
                <view class="msg-item auth-tip"
                    >为了方便联系您取书，我们需要获取您的手机号</view
                >
                <view class="footer">
                    <div class="btn">
                        <u-button
                            type="primary"
                            text="取消"
                            shape="circle"
                            color="#00CDDA"
                            class="btn"
                            @click="close('authDialog')"
                        ></u-button>
                    </div>
                    <div class="btn">
                        <u-button
                            type="primary"
                            text="确定"
                            shape="circle"
                            color="#00CDDA"
                            class="btn"
                            open-type="getPhoneNumber"
                            @getphonenumber="getPhoneNumber"
                        ></u-button>
                    </div>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import shopItem from "@/components/shopItem.vue";
export default {
    components: {
        shopItem,
    },
    data() {
        return {
            title: "Hello 学家",
            timeDialog: false,
            columns: [["中国", "美国", "日本"]],
            successDialog: false,
            authDialog: false,
        };
    },
    onLoad() {},
    methods: {
        getPhoneNumber(event) {
            let { encryptedData, errMsg, iv, code } = event;
            if (errMsg === "getPhoneNumber:ok") {
                
            }
        },
        open(type) {
            this[type] = true;
        },
        close(type) {
            this[type] = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.msg-popup {
    width: 80%;
}
.success-container {
    width: 100%;
    padding: 0 50rpx 0;
    box-sizing: border-box;
    .msg-item {
        margin-bottom: 12rpx;
    }
    .auth-tip {
        padding-top: 140rpx;
    }
    .title {
        font-size: 18px;
        padding: 50rpx 0;
        text-align: center;
    }
    .address {
        color: #999;
    }
    .footer {
        padding: 100rpx 0 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn {
            width: 120px;
        }
    }
}
.order-container {
    padding-bottom: 125rpx;
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
            justify-content: flex-end;
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
        padding: 30rpx;
        .card-box {
            background: #fff;
            border-radius: 20rpx;
            padding-top: 10rpx;
            box-shadow: 0px 0px 15px #e8e8e8;
            margin-bottom: 40rpx;
            padding: 50rpx;
            .order-info-item {
                margin-bottom: 40rpx;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                .order-info-title {
                    width: 140rpx;
                    text-align: left;
                }
                .order-info-content {
                    flex: 1;
                    color: #999;
                    .money {
                        margin-right: 30rpx;
                    }
                }
            }
        }
    }
}
</style>
