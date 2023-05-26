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
            <checkbox-group @change="onSelectItem" v-if="bookList.length">
                <u-swipe-action>
                    <u-swipe-action-item
                        :options="options1"
                        v-for="(item, index) in bookList"
                        :key="index"
                        @click="onRemove(item)"
                    >
                        <view class="swipe-action u-border-bottom">
                            <view class="swipe-action__content">
                                <view class="shop-item">
                                    <checkbox
                                        :value="item.bookId"
                                        :checked="item.checked"
                                    />
                                    <view class="shop-image">
                                        <image
                                            src="../../static/1.png"
                                            mode="widthFix"
                                        ></image>
                                    </view>
                                    <view class="shop-content">
                                        <view class="shop-title">{{
                                            item.nickName
                                        }}</view>
                                        <view class="shop-price"
                                            >￥{{ item.price }}</view
                                        >
                                    </view>
                                </view>
                            </view>
                        </view>
                    </u-swipe-action-item>
                </u-swipe-action>
            </checkbox-group>
			<view class="empty" v-else>
                <u-empty mode="data"> </u-empty>
            </view>
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
                        @click="goOrder"
                    ></u-button>
                </view>
            </view>
            <u-safe-bottom></u-safe-bottom>
        </view>
    </view>
</template>

<script>
import _ from "lodash";
export default {
    data() {
        return {
            bookList: [],
            options1: [
                {
                    text: "删除",
                    style: {
                        backgroundColor: "#F56C6C",
                    },
                },
            ],
            alway: 0,
            selectBookList: [],
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
    onLoad() {
        this.getCartBookList();
    },
    methods: {
        onSelectItem(item) {
			const values = item.detail.value;
            this.alway = values.length;
            for (var i = 0, lenI = this.bookList.length; i < lenI; ++i) {
                const el = this.bookList[i];
                if (values.includes(String(el.bookId))) {
                    this.$set(el, "checked", true);
                } else {
                    this.$set(el, "checked", false);
                }
            }
        },
        goOrder() {
            const targetBookId = this.bookList
                .filter((el) => el.checked)
                .map((el) => el.bookId);
            console.log("targetBookId", targetBookId);
        },
        onSearch(value) {
            console.log("value", value);
        },
        getCartBookList() {
            this.$api.getBookRack().then((res) => {
                this.bookList = _.cloneDeep(res?.bookRackInfos || []).map(
                    (el) => {
                        return {
                            ...el,
                            checked: true,
                        };
                    }
                );
                this.alway = this.bookList.length;
            });
        },
        onRemove(item) {
			const deleteBookId = this.bookList.find(el => el.bookId == item.bookId).bookId;
            this.alway--;
			this.$api.deleteCartBook(deleteBookId)
				.then(() => {
					console.log('移除成功');
					this.bookList = this.bookList.filter(
						(el) => el.bookId !== item.bookId
					);
				})
        },
    },
};
</script>

<style lang="scss" scoped>
.empty {
	height: 100%;
	padding-top: 300rpx;
}
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
