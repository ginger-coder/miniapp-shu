<template>
    <view class="health">
        <div class="health-content">
            <view class="health-content-item">
                <view class="health-content-item-title"> 1.常用药 </view>
                <view class="health-content-item-text">
                    <u--textarea
                        class="health-content-item-text-textarea"
                        placeholder-style="color : #B9B9D7"
                        v-model="uploadData.useDrug"
                        :maxlength="maxLength"
                        placeholder="请填写宝贝的常用药物(选填)"
                        @click="handleClickInputWrap"
						border="none"
						height="175rpx"
						count
                    />
                </view>
            </view>
            <view class="health-content-item">
                <view class="health-content-item-title"> 2.过敏源 </view>
                <view class="health-content-item-text">
                    <u--textarea
                        class="health-content-item-text-textarea"
                        placeholder-style="color : #B9B9D7"
                        v-model="uploadData.allergySource"
                        :maxlength="maxLength"
                        placeholder="是否有过敏源(选填)"
                        @click="handleClickInputWrap"
						border="none"
						height="175rpx"
						count
                    />
                </view>
            </view>
            <view class="health-content-item">
                <view class="health-content-item-title"> 3.不能吃 </view>
                <view class="health-content-item-text">
                    <u--textarea
                        class="health-content-item-text-textarea"
                        placeholder-style="color : #B9B9D7"
                        v-model="uploadData.cannotEat"
                        :maxlength="maxLength"
                        placeholder="宝贝不能吃什么，不喜欢吃什么(选填)"
                        @click="handleClickInputWrap"
						border="none"
						height="175rpx"
						count
                    />
                </view>
            </view>
            <view class="health-content-item">
                <view class="health-content-item-title"> 4.其他嘱咐 </view>
                <view class="health-content-item-text">
                    <u--textarea
                        class="health-content-item-text-textarea"
                        placeholder-style="color : #B9B9D7"
                        v-model="uploadData.otherMatter"
                        placeholder="请填写(选填)"
                        :maxlength="maxLength"
                        @click="handleClickInputWrap"
						border="none"
						height="175rpx"
						count
                    />
                </view>
            </view>
        </div>

        <cover-view class="user-container-msg-save">
            <button class="user-container-msg-save-btn" @click="saveUserHealth">
                保存
            </button>
        </cover-view>
    </view>
</template>

<script>
export default {
    filters: {
        formatFontNumber(val) {
            return val >= 50 ? 50 : val;
        },
    },
    data() {
        return {
            wh: 500,
            drug: "",
            maxLength: 50,
            // color : #B9B9D7: '#B9B9D7',
            uploadData: {
                useDrug: "", // 常用药
                allergySource: "", // 过敏源
                cannotEat: "", // 不能吃
                otherMatter: "", // 备注
            },

            isChange: false, // 数据是否改变
            from: "",
        };
    },
    onLoad({ from }) {
        this.from = from;
    },
    mounted() {
        // let userInfo = uni.getStorageSync("userInfo");
        // userInfo = JSON.parse(userInfo);
        // this.initHealth(userInfo);
    },
    methods: {
        handleClickInputWrap() {
            this.isChange = true;
        },
        backEdit() {
            if (this.isChange) {
                uni.showModal({
                    title: "确定离开?",
                    content: "已修改的信息将不会保存",
                    success: function (res) {
                        if (res.confirm) {
                            uni.navigateBack({
                                delta: 1,
                            });
                        }
                    },
                });
            } else {
                uni.navigateBack({
                    delta: 1,
                });
            }
        },
        initHealth(userInfo) {
            this.uploadData = {
                useDrug: userInfo.useDrug, // 常用药
                allergySource: userInfo.allergySource, // 过敏源
                cannotEat: userInfo.cannotEat, // 不能吃
                otherMatter: userInfo.otherMatter, // 备注
            };
        },

        saveUserHealth() {
            uni.showLoading({
                title: "保存中...",
            });
            let { uploadData } = this;
            this.$api
                .updateHealth({
                    ...uploadData,
                })
                .then((res) => {
                    uni.showToast({
                        title: "保存成功",
                        icon: "success",
                    });
					setTimeout((e) => {
                        uni.navigateBack();
                    }, 500);
                })
				.finally(() => {
					uni.hideLoading();
				})
        },
    },
};
</script>

<style lang="scss" scoped>
.red {
    color: red !important;
}

.health {
    position: relative;
    height: 100vh;
    background: #f5f5ff;
    .user-container-msg-save {
        height: 178rpx;
        background: #ffffff;
        box-shadow: 0 0 36rpx 0 rgba(0, 0, 0, 0.05);
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 999;

        .user-container-msg-save-btn {
            width: 580rpx;
            height: 90rpx;
            background: #5d45db;
            border-radius: 45rpx;
            font-size: 34rpx;
            font-weight: 500;
            color: #ffffff;
            line-height: 90rpx;
            text-align: center;
            margin: 30rpx auto 0;
        }
    }

    &-content {
        padding: 30rpx 40rpx;
        padding-bottom: 180rpx;
        box-sizing: border-box;

        &-item {
            margin-bottom: 20rpx;

            &-title {
                padding: 24rpx 0;
                font-size: 32rpx;
                font-weight: 600;
                color: #210262;
            }

            &-text {
                height: 200rpx;
                background: #ffffff;
                border-radius: 20rpx;
                border: 1rpx solid rgba(185, 185, 215, 0.2);
                overflow: hidden;
                position: relative;
                padding: 10rpx;

                &-textarea {
                    font-size: 28rpx;
                    font-weight: 300;
                    color: #210262;
					height: 100%;
                }

                &-tip {
                    position: absolute;
                    bottom: 14rpx;
                    right: 22rpx;
                    font-size: 28rpx;
                    font-weight: 300;
                    color: #b9b9d7;
                }
            }
        }
    }
}
</style>
