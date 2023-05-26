<template>
    <view class="container">
        <div class="banner">
            <div class="banner-user">
                <div class="banner-user-cn">
					<u-avatar size="100%" :src="headImg"></u-avatar>
                </div>
                <view class="banner-user-msg">
                    <p class="banner-user-name">
                        {{ userInfo.name }}
                    </p>
                    <p class="banner-user-level">
                        {{ userInfo.grade | fotmatGrade }}
                    </p>
                </view>
            </div>
            <div
                class="banner-edit"
                @click="onNavigateTo('/pages/userMassage/index')"
            >
                <image
                    class="banner-edit-icon"
                    src="https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-msg-edit.png"
                    mode=""
                ></image>
                <span class="banner-edit-text">编辑信息</span>
            </div>
            <div class="list">
                <div class="list-top">
                    <ul class="list-top-box">
                        <li
                            class="list-top-box-item list-top-box-content first"
                        >
                            <div
                                class="list-top-box-item-box"
                                @click="
                                    onNavigateTo('/pages/userSchool/index')
                                "
                            >
                                <view
                                    class="list-top-box-item-box-tip"
                                    v-if="!userInfo.schoolId"
                                    >待填写
                                </view>
                                <image
                                    class="list-top-box-item-box-icon"
                                    src="https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-stu.png"
                                    mode=""
                                >
                                </image>
                                <div class="list-top-box-item-box-text">
                                    学校信息
                                </div>
                            </div>
                        </li>
                        <li class="list-top-box-item list-top-box-center"></li>
                        <li
                            class="list-top-box-item list-top-box-content second"
                        >
                            <div
                                class="list-top-box-item-box"
                                @click="
                                    onNavigateTo(
                                        '/pages/userHealth/index'
                                    )
                                "
                            >
                                <image
                                    class="list-top-box-item-box-icon"
                                    src="https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-heathy.png"
                                    mode=""
                                ></image>
                                <div class="list-top-box-item-box-text">
                                    健康档案
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <tab-bar />
    </view>
</template>

<script>
const defaultImg =
    "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-default.png";
export default {
    data() {
        return {
            headImg: defaultImg,
			userInfo: {
				name: '用户名',
				grade: 1
			}
        };
    },
    onLoad() {
        this.headImg = defaultImg;
    },
    async onShow() {},
    onHide() {},
    methods: {
        onNavigateTo(url) {
            uni.navigateTo({
                url,
            });
        },
    },
    filters: {
        fotmatGrade(level) {
            let data = {
                1: "一年级",
                2: "二年级",
                3: "三年级",
                4: "四年级",
                5: "五年级",
                6: "六年级",
                17: "大班",
            };
            return data[Number(level)];
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
    background: #ffffff;

    .list {
        padding: 40rpx 30rpx 20rpx 30rpx;
        position: relative;
        // border-radius: 20rpx 20rpx 0px 0px;
        margin-top: -20rpx;
        flex-grow: 1;
        background-color: #fff;

        &-top {
            height: 244rpx;
            background-color: #00BBDE;
			border-radius: 20rpx;

            &-box {
                height: 100%;
                display: flex;
                align-items: center;

                &-center {
                    // margin: 0 65rpx;
                    width: 8rpx;
                    height: 42rpx;
                    background: rgba(33, 2, 98, 0.2);
                    border-radius: 20rpx;
                    opacity: 0.9;
                }

                &-item {
                    &-box {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: relative;

                        &-tip {
                            width: 61rpx;
                            height: 30rpx;
                            background: #ff6666;
                            border-radius: 15rpx 15rpx 15rpx 1rpx;
                            font-size: 16rpx;
                            font-weight: 600;
                            color: #ffffff;
                            text-align: center;
                            line-height: 30rpx;
                            position: absolute;
                            right: 106rpx;
                            top: -3rpx;
                        }

                        &-icon {
                            height: 80rpx;
                            width: 80rpx;
                        }

                        &-text {
                            color: #fff;
                        }
                    }
                }

                &-content {
                    flex: 1;
                }
            }
        }

        &-bottom {
            &-line {
                width: 100%;
                height: 1rpx;
                background: #b9b9d7;
                border-radius: 40prx;
                opacity: 0.2;
            }

            &-item {
                padding: 20rpx 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 40rpx;

                &-right {
                    width: 24rpx;
                    height: 24rpx;
                    border-top: 5rpx solid #b9b9d7;
                    border-right: 5rpx solid #b9b9d7;
                    transform: rotate(45deg);
                }

                &-left {
                    display: flex;
                    align-items: center;

                    &-icon {
                        width: 92rpx;
                        height: 92rpx;
                        margin-right: 20rpx;
                    }

                    &-text {
                        position: relative;
                    }
                }
            }
        }
    }

    .banner {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;

        &-user {
            width: 100%;
            height: 369rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 150rpx;
			background: url("@/static/mine/icon-mine-bg.png");
			background-size: 105% auto;
			background-repeat: no-repeat;

            &-cn {
                width: 160rpx;
                height: 160rpx;
                border-radius: 50%;
                overflow: hidden;
                margin-bottom: 20rpx;
            }

            &-msg {
                text-align: center;
            }

            &-img {
                width: 100%;
                height: 100%;
            }

            &-name {
                font-size: 36rpx;
                font-weight: 600;
                color: #210262;
                margin-bottom: 10rpx;
            }

            &-level {
                font-size: 28rpx;
                font-weight: 300;
                color: #5a4880;
            }
        }

        &-edit {
            width: 160rpx;
            height: 62rpx;
            background: rgba(245, 245, 255, 0.4);
            box-shadow: 0 2rpx 6rpx 0 rgba(133, 102, 255, 0.06);
            border-radius: 31rpx 0 0 31rpx;
            position: absolute;
            right: 0;
            top: 180rpx;
            display: flex;
            align-items: center;
            padding: 0 0 0 10rpx;

            &-icon {
                width: 40rpx;
                height: 40rpx;
            }

            &-text {
                font-size: 24rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #210262;
            }
        }
    }
}
</style>
