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
				<shopItem />
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
import shopItem from '@/components/shopItem.vue';
export default {
	components: {
		shopItem
	},
    data() {
        return {
            title: "Hello 学家",
            timeDialog: false,
            columns: [["中国", "美国", "日本"]],
        };
    },
    onLoad() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.order-container {
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
