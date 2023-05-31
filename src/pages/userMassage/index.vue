<template>
    <view>
        <view class="user-container">
            <div class="user-container-banner">
                <!-- 示例照片 -->
                <!-- <div class="user-container-banner-demo" @click="open">
					<view class="text">示例照片</view>
				</div> -->
                <div class="user-container-banner-photobox">
                    <div
                        class="user-container-banner-photobox-pic"
                        @click="chooseAvatar"
                    >
                        <image :src="showPic" mode="aspectFit"></image>
                    </div>
                    <div class="user-container-banner-photobox-tip">
                        请上传宝贝头像
                    </div>
                </div>
            </div>
            <div class="user-container-msg">
                <div class="user-container-msg-content">
                    <ul class="user-container-msg-content-ganger">
                        <li
                            class="user-container-msg-content-ganger-item"
                            :class="{
                                active: uploadData.sex == 1,
                                error: sexErr,
                            }"
                            @click="onEditSex(1)"
                        >
                            <image
                                class="user-container-msg-content-ganger-item-icon"
                                src="https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-man.png"
                                mode=""
                            ></image>
                            男生
                        </li>
                        <li
                            class="user-container-msg-content-ganger-item"
                            :class="{
                                active: uploadData.sex == 2,
                                error: sexErr,
                            }"
                            @click="onEditSex(2)"
                        >
                            <image
                                class="user-container-msg-content-ganger-item-icon"
                                src="https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-woman.png"
                                mode=""
                            ></image>
                            女生
                        </li>
                    </ul>
                    <div
                        class="user-container-msg-content-name"
                        :class="{ error: nameErr }"
                    >
                        <input
                            class="user-container-msg-content-name-text"
                            @focus="handleFocusInput"
                            maxlength="12"
                            type="text"
                            v-model="uploadData.name"
                            placeholder="请填写宝贝全名 (必填)"
                        />
                    </div>
                </div>
                <div class="user-container-msg-save">
                    <div
                        class="user-container-msg-save-btn"
                        @click="saveUserInfo"
                    >
                        保存
                    </div>
                </div>
            </div>
        </view>
        <yhdslCropper
            ref="yhdslCropper"
            :quality="1"
            mode="scale"
            @uploadImg="uploadImg"
            scale="1"
        ></yhdslCropper>
    </view>
</template>

<script>
import yhdslCropper from "@/components/yhdsl-cropper/yhdsl-cropper.vue";
import upload from '@/common/upload';
import reg from "@/utils/constant.js";
let { msg_reg } = reg;
const default_head =
    "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-default.png";
export default {
    components: {
        yhdslCropper,
    },
    data() {
        return {
            sexErr: false,
            wh: 500,
            photo: "",
            demoTipShow: false,
            showPic: "",
            uploadData: {
                sex: "",
                pic: "",
                name: "",
            },
            isFirst: true,
            isChange: false, // 是否有数据改变

            nameErr: false,
			upload,
        };
    },
    onLoad() {
        this.init();
    },
    onShow() {},
    methods: {
        uploadImg(imagePath) {
            upload(imagePath, (fileURL) => {
				console.log('fileURL', fileURL);
			});
        },

        getUserInfo() {
            let userInfo = uni.getStorageSync("userInfo");
            return JSON.parse(userInfo);
        },
        init() {
            let userInfo = this.getUserInfo();
            if (userInfo) {
                this.initUserInfo(userInfo);
            }
            this.isFirst = isFirst;
        },
        initUserInfo(userInfo) {
            this.showPic = (() => {
                if (
                    userInfo.picUrl == "" ||
                    userInfo.picUrl.indexOf("http") < 0
                ) {
                    return default_head;
                }
                return userInfo.picUrl;
            })();
            this.uploadData = {
                sex: userInfo.sex,
                pic: userInfo.pic,
                name: userInfo.name,
                picUrl: userInfo.picUrl,
            };
        },
        saveUserInfo() {
            uni.showLoading({
                title: "保存中...",
            });
            let { uploadData } = this;
            if (uploadData.sex != 1 && uploadData.sex != 2) {
                uni.hideLoading();
                this.sexErr = true;
                this.$toast('请选择宝贝性别');
                return;
            }
            if (!msg_reg.test(uploadData.name)) {
                wx.hideLoading();
                this.nameErr = true;
				this.$toast('请输入2-12位的字母或汉字');
                return;
            }
        //     editUserBaseInfo({
        //         ...uploadData,
        //     })
        //         .then((res) => {
        //             this.nameErr = false;
        //             this.sexErr = false;
        //             wx.hideLoading();
        //             wx.showToast({
        //                 title: "保存成功",
        //                 icon: "success",
        //                 duration: 2000,
        //             });
        //             setTimeout((e) => {
        //                 if (!this.isFirst) {
        //                     uni.navigateBack();
        //                 } else {
        //                     uni.navigateTo({
        //                         url: "/pages/UserSchool/UserSchool",
        //                     });
        //                 }
        //             }, 400);
        //         })
        //         .catch((e) => {
        //             this.nameErr = false;
        //             this.sexErr = false;
        //         });
        },
        chooseAvatar() {
            this.$refs.yhdslCropper.chooseImage();
        },
        onEditSex(val) {
            this.sexErr = false;
            this.isChange = true;
            this.uploadData.sex = String(val);
        },
        open() {
            this.demoTipShow = true;
        },
        close() {
            this.demoTipShow = false;
        },
        handleFocusInput() {
            this.nameErr = false;
            this.isChange = true;
        },
        backEdit() {
            if (this.isChange) {
                uni.showModal({
                    title: "确定离开?",
                    content: "已修改的信息将不会保存",
                    success: function (res) {
                        if (res.confirm) {
                            uni.switchTab({
                                url: "/pages/person/index",
                            });
                        }
                    },
                });
            } else {
                uni.switchTab({
                    url: "/pages/person/index",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.concat-model {
    &-title {
        width: 100%;
        height: 110rpx;
        line-height: 110rpx;
        text-align: center;
        font-weight: 500;
        color: #210262;
        font-size: 32rpx;
        position: relative;
    }

    &-close {
        position: absolute;
        top: 27rpx;
        right: 32rpx;
        width: 48rpx;
        height: 48rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b2b2b2;
        font-size: 40rpx;
    }

    &-content {
        padding: 32rpx;
        box-sizing: border-box;

        &-img {
            width: 576rpx;
            height: 304rpx;
            margin: 0 auto;
            margin-bottom: 20rpx;
        }

        &-tip {
            &-title {
                font-size: 28rpx;
                font-weight: 400;
                color: #210262;
                padding: 20rpx 0;
            }

            &-list {
                font-size: 24rpx;
                font-weight: 300;
                color: #5a4880;

                p {
                    margin-bottom: 7rpx;
                }
            }
        }
    }
}

.user-container {
    display: flex;
    flex-direction: column;
    position: relative;
    background: #f5f5ff;
    height: 100vh;

    &-msg {
        background-color: #fff;
        flex: 1;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
        position: relative;

        &-content {
            padding: 40rpx;

            &-ganger {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 40rpx;

                &-item {
                    width: 300rpx;
                    height: 100rpx;
                    border-radius: 20rpx;
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #210262;
                    box-sizing: border-box;
                    padding: 20rpx 40rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f5f5ff;

                    &.error {
                        border: 2rpx solid #ff6666;
                    }

                    &-icon {
                        width: 60rpx;
                        height: 60rpx;
                        margin-right: 17rpx;
                    }

                    &.active {
                        background: linear-gradient(
                            45deg,
                            rgba(75, 62, 249, 0.9) 0%,
                            rgba(121, 104, 252, 0.7) 100%
                        );
                        box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 255, 0.1);
                        color: #fff;
                        justify-content: start !important;
                        position: relative;

                        &::after {
                            content: "";
                            width: 37rpx;
                            height: 37rpx;
                            background: url("https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-user-select.png");
                            background-size: 100% 100%;
                            margin-left: 45rpx;
                        }
                    }
                }
            }

            &-name {
                height: 100rpx;
                background: #ffffff;
                border-radius: 20rpx;
                border: 1rpx solid rgba(185, 185, 215, 0.4);
                padding: 15rpx;
                padding-left: 25rpx;

                &-text {
                    height: 100%;
                    width: 100%;
                }

                &.error {
                    border: 2rpx solid #ff6666;
                }
            }
        }

        &-save {
            height: 178rpx;
            background: #ffffff;
            box-shadow: 0 0 36rpx 0 rgba(0, 0, 0, 0.05);
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;

            &-btn {
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
    }

    &-banner {
        height: 450rpx;
        box-sizing: border-box;
        padding-top: 115rpx;
        background: #f5f5ff;

        &-demo {
            width: 160rpx;
            height: 62rpx;
            background: #ffffff;
            box-shadow: 0 2rpx 6rpx 0 rgba(133, 102, 255, 0.06);
            border-radius: 31rpx 0 0 31rpx;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            font-size: 24rpx;
            font-weight: 400;
            color: #210262;
            position: absolute;
            top: 45rpx;
            right: 0;

            .text {
                display: block;
                width: 100%;
                height: 100%;
                text-indent: 50rpx;
                line-height: 62rpx;
            }

            &::before {
                content: "";
                width: 37rpx;
                height: 37rpx;
                background: url(https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-book.png)
                    no-repeat;
                background-size: 100% 100%;
                display: block;
                position: absolute;
                left: 14rpx;
                top: 12rpx;
            }
        }

        &-photobox {
            width: 370rpx;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;

            &-pic {
                width: 160rpx;
                height: 160rpx;
                background: #e3e3ff;
                border-radius: 80rpx;
                position: relative;
                margin-bottom: 25rpx;

                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 80rpx;
                }

                &::after {
                    content: "";
                    width: 56rpx;
                    height: 56rpx;
                    background: url("https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-user-photo.png");
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }

            &-tip {
                font-size: 24rpx;
                font-weight: 300;
                color: #5a4880;
                position: relative;

                // &::before {
                // 	content: '';
                // 	width: 24rpx;
                // 	height: 24rpx;
                // 	background: url('https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/mine/icon-user-tip.png');
                // 	background-size: 100% 100%;
                // 	position: absolute;
                // 	top: 6rpx;
                // 	left: -34rpx;
                // }
            }
        }
    }
}
</style>
