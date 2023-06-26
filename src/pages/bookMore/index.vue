<template>
    <view class="index-container">
        <!-- <u-sticky bgColor="#FAFAFA">
            <view class="header">
                <u-search
                    placeholder="搜索"
                    :showAction="false"
                    @search="onSearch"
                ></u-search>
            </view>
        </u-sticky> -->
        <u-gap></u-gap>
        <view class="layout">
            <template v-if="bookList.length">
                <shopItem
                    v-for="item in bookList"
                    :key="item.bookId"
                    :book="item"
                />
            </template>
            <view class="empty" v-else>
                <u-empty mode="data"> </u-empty>
            </view>
        </view>
        <shop-cart :value="count" />
    </view>
</template>

<script>
import _ from "lodash";
import shopItem from "@/components/shopItem.vue";
export default {
    components: {
        shopItem,
    },
    data() {
        return {
            count: 0,
            queryParams: {
                classId: 0,
                gradeId: 0,
                page: 1,
                size: 10,
            },
            bookList: [],
        };
    },
    onLoad({ classLabelId = 0, gradeId = 0 }) {
        Object.assign(this.queryParams, {
            classId: Number(classLabelId),
            gradeId: Number(gradeId),
        });
        this.querBookList();
    },
    methods: {
        onSearch(value) {
            console.log("value", value);
        },
        querBookList() {
            this.$api.getClassBooksList(this.queryParams).then((res) => {
                this.bookList = _.cloneDeep(res.records || []).map((el) => {
                    el.labels = el.recommendLabels
                        ? el.recommendLabels.split(",")
                        : [];
                    return el;
                });
            });
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
.layout {
    padding: 0 30rpx 30rpx;
}
</style>
