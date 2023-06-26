<template>
    <view class="index-container">
        <u-sticky bgColor="#FAFAFA">
            <view class="header">
                <!-- <u-search
                    placeholder="搜索"
                    v-model="keyword"
                    @search="onSearch"
                    :showAction="false"
					:current="activeGrade"
                ></u-search> -->
                <u-tabs
                    :list="levelList"
                    lineWidth="50"
                    lineColor="#00cdda"
                    @click="onSelectLevel"
                    itemStyle="padding: 15px 17px"
                ></u-tabs>
            </view>
        </u-sticky>
        <u-gap></u-gap>
        <view class="layout">
            <template v-if="booksList.length">
                <view
                    class="card-box"
                    v-for="item in booksList"
                    :key="item.classLabelId"
                >
                    <u-cell
                        :title="item.classLabel"
                        :border="false"
                        isLink
                        :titleStyle="{ fontWeight: 600 }"
                        :rightIconStyle="{ color: '#00cdda' }"
                    >
                        <text
                            slot="value"
                            class="more"
                            @click="onInfo(item.classLabelId)"
                            >更多</text
                        >
                    </u-cell>
                    <view
                        class="card"
                        v-for="(book) in item.bookInfos"
                        :key="book.bookId"
                    >
                        <!-- 内容 -->
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
                            <view class="shop-tag">
                                <view class="tag" v-if="book.borrowed">
                                    <u-tag
                                        text="已借过"
                                        shape="circle"
                                        bgColor="#EDF8D8"
                                        color="#9FC152"
                                        borderColor="#EDF8D8"
                                    ></u-tag>
                                </view>
                                <view
                                    class="tag"
                                    v-for="item in book.labels"
                                    :key="item"
                                >
                                    <u-tag
                                        :text="item"
                                        shape="circle"
                                        bgColor="#FFE8D0"
                                        color="#DE7A00"
                                        borderColor="#FFE8D0"
                                    ></u-tag>
                                </view>
                                <!-- <view class="tag">
                                    <u-tag
                                        text="已借完"
                                        shape="circle"
                                        bgColor="#eee"
                                        color="#848484"
                                        borderColor="#eee"
                                    ></u-tag>
                                </view> -->
                            </view>
                            <view class="shop-desc">
                                {{ book.introduction }}
                            </view>
                            <view class="shop-buy">
                                <view class="price">￥{{ book.price }}</view>
                                <view class="buy-btn">
                                    <button
                                        class="buy-style"
                                        @tap.stop="handleClick(book)"
                                    >
                                        加入书架
                                    </button>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <view class="empty" v-else>
                <u-empty mode="data"> </u-empty>
            </view>
        </view>
        <shop-cart :value="count" />
        <tab-bar />
    </view>
</template>

<script>
import _ from "lodash";
import { env, envConfig } from "@/common/config.js";
export default {
	filters: {
		formatBaseURL: function(path){
			return path?.indexOf('http') == -1 ? envConfig[env].baseURL + '' + path : path;
		}
	},
    data() {
        return {
            indicator: false,
            keyword: "",
            activeGrade: 0,
            buyStyle: {
                width: "100rpx",
                backgroundColor: "#00CDDA",
                color: "#fff",
            },
            levelList: [],
            count: 0,
            booksList: [],
            queryParams: {
                classId: 0,
                gradeId: 0,
            },
        };
    },
    onLoad() {},
    onShow() {
        this.initPage();
    },
    mounted() {},
    methods: {
		onImageError(e, book) {
			if(e.detail.errMsg) {
				book.cover = "https://cdn.uviewui.com/uview/empty/data.png";
			}
        },
        async initPage() {
            const initGrade = await this.onGetAllLabel();
            this.activeGrade = initGrade.id;
            await this.onGetMainBookList();
        },
        onGetAllLabel() {
            return new Promise((resolve, reject) => {
                this.$api.getLabelList(1).then((res) => {
                    this.levelList = res.map((el) => {
                        return {
                            name: el.label,
                            value: el.id,
                        };
                    });
                    resolve(res[0]);
                });
            });
        },
        onGetMainBookList() {
            return this.$api
                .getGradeBooksByGradeId(this.activeGrade)
                .then((res) => {
                    this.booksList = _.cloneDeep(res).map((el) => {
                        el.bookInfos = el.bookInfos.map((e) => {
                            e.labels = e.recommendLabels
                                ? el.recommendLabels.split(",")
                                : [];
                            return e;
                        });
                        return el;
                    });
                });
        },
        onSelectLevel(item) {
            this.activeGrade = item.value;
            this.onGetMainBookList(item.value);
        },
        onInfo(classLabelId) {
            uni.navigateTo({
                url:
                    "/pages/bookMore/index?classLabelId=" +
                    classLabelId +
                    "&gradeId=" +
                    this.activeGrade,
            });
        },
        onSearch(value) {
            console.log("value", value);
        },
        async handleClick(book) {
            await this.$api.joinBookRack(book.bookId);
            this.$toast("加入成功");
        },
    },
};
</script>

<style lang="scss" scoped>
.empty {
    height: 100%;
    padding-top: 300rpx;
}
.header {
    padding: 30rpx 30rpx 0;
}
.more {
    color: #00cdda;
}
.shop-cart {
    width: 65px;
    height: 65px;
    background: url("../../static/icon-cart.png") no-repeat center;
    background-size: 100% auto;
    color: #fff;
    position: fixed;
    bottom: 300rpx;
    right: 40rpx;
    font-size: 12px;
    text-align: center;
    padding-top: 34px;
    box-sizing: border-box;
}
.index-container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}
.layout {
    padding: 0 30rpx 30rpx;
    flex: 1;
    .card-box {
        background: #fff;
        border-radius: 20rpx;
        padding-top: 10rpx;
        box-shadow: 0px 0px 15px #e8e8e8;
        margin-bottom: 30rpx;
        .card {
            padding: 20rpx;
            margin-bottom: 30rpx;
            display: flex;
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
                    .buy-btn {
                        width: 230rpx;
                        position: relative;
                        .tip {
                            min-width: 30rpx;
                            max-width: 80rpx;
                            padding: 10rpx;
                            background: #f56c6c;
                            color: #fff;
                            font-size: 14rpx;
                        }
                    }
                    .buy-style {
                        width: 100%;
                        border-radius: 40rpx;
                        text-align: center;
                        background: #00cdda;
                        color: #fff;
                        font-size: 26rpx;
                        margin: 0;
                    }
                }
            }
        }
    }
}
</style>
