<template>
    <view class="school">
        <div class="school-offset">
            <div
                class="school-offset-item"
                :class="{ error: addressErr }"
                @click="chooseSchool"
            >
                <view class="school-offset-item-text">
                    <input
                        class="school-offset-item-text"
                        @focus="handleSchoolFocus"
                        :disabled="true"
                        type="text"
                        :value="selectAddressText"
                        placeholder-style="color:#B9B9D7"
                        placeholder="请选择学校（必填）"
                    />
                </view>
                <div class="right-icon"></div>
            </div>
            <div
                class="school-offset-item"
                @click="openGrade"
                :class="{ error: gradeErr }"
            >
                <input
                    class="school-offset-item-text"
                    @focus="() => (this.gradeErr = false)"
                    :disabled="true"
                    type="text"
                    :value="selectGradeText"
                    placeholder-style="color:#B9B9D7"
                    placeholder="如在暑期，请选择暑期前年级（仅可填一次）"
                />
                <div class="right-icon" v-if="!selectGradeDisabled"></div>
            </div>
            <div
                class="school-offset-item"
                @click="openClassNumber"
                :class="{ error: classErr }"
            >
                <input
                    class="school-offset-item-text"
                    :disabled="true"
                    @focus="() => (this.classErr = false)"
                    type="text"
                    :value="selectClassNumberText"
                    placeholder-style="color:#B9B9D7"
                    placeholder="班级（必填）"
                />
                <div class="right-icon"></div>
            </div>
        </div>
        <div class="school-number">
            <div class="school-number-title">数学</div>
            <div
                class="school-offset-item"
                :class="{ error: mathBookErr }"
                @click="openBook"
            >
                <input
                    class="school-offset-item-text"
                    @focus="() => (this.mathBookErr = false)"
                    :disabled="true"
                    type="text"
                    :value="selectBookText"
                    placeholder-style="color:#B9B9D7"
                    placeholder="教材版本(必填，仅可填一次)"
                />
                <div class="right-icon" v-if="!selectBookDisabled"></div>
            </div>
            <div
                class="school-offset-item"
                :class="{ error: mathScoreErr }"
                @click="openNumber"
            >
                <input
                    class="school-offset-item-text"
                    @focus="() => (this.mathScoreErr = false)"
                    type="text"
                    :disabled="true"
                    :value="selectNumberText"
                    placeholder-style="color:#B9B9D7"
                    placeholder="校内成绩(必填)"
                />
                <div class="right-icon"></div>
            </div>
        </div>
        <div class="school-number">
            <div class="school-number-title">语文</div>
            <div
                class="school-offset-item"
                :class="{ error: chineseScoreErr }"
                @click="openChinese"
            >
                <input
                    class="school-offset-item-text"
                    @focus="() => (this.chineseScoreErr = false)"
                    :disabled="true"
                    type="text"
                    :value="selectChineseText"
                    placeholder-style="color:#B9B9D7"
                    placeholder="校内成绩(必填)"
                />
                <div class="right-icon"></div>
            </div>
        </div>
        <div class="user-container-msg-save">
            <div class="user-container-msg-save-btn" @click="onSaveSchoolInfo">
                保存
            </div>
        </div>
        <!-- 年级 POP -->
        <u-action-sheet
            :show="gradeModel"
            @close="onGradeCancel"
            :actions="gradeList"
            @select="onGreadeConfirm"
			:safeAreaInsetBottom="true"
			cancelText="取消"
        ></u-action-sheet>
        <!-- 教材 POP -->
        <u-action-sheet
            :show="bookModel"
            :actions="bookList"
            @close="onBookCancel"
            @select="onBookConfirm"
			:safeAreaInsetBottom="true"
			cancelText="取消"
        ></u-action-sheet>
        <!-- 校内数学成绩 POP -->
        <u-action-sheet
            :show="numberModel"
            @close="onNumberCancel"
            :actions="numberList"
            @select="onNumberConfirm"
			:safeAreaInsetBottom="true"
			cancelText="取消"
        ></u-action-sheet>
        <!-- 校内语文成绩 POP -->
        <u-action-sheet
            :show="chineseModel"
            @close="onChineseCancel"
            :actions="chineseList"
            @select="onChineseConfirm"
			:safeAreaInsetBottom="true"
			cancelText="取消"
        ></u-action-sheet>
        <u-keyboard
            mode="number"
            @change="onClassNumer"
            @backspace="onClassBackspace"
            :mask="false"
            v-model="numberKeyBoardShow"
			safeAreaInsetBottom
        ></u-keyboard>
    </view>
</template>

<script>
import _ from "lodash";
import { gradeList } from "@/common/constant.js";
import api from "@/common/api.js";
let { editSchoolInfo } = api;

const numberList = [
    {
        value: "95",
        label: "95分以上",
    },
    {
        value: "90",
        label: "90-95分",
    },
    {
        value: "85",
        label: "85-90分",
    },
    {
        value: "80",
        label: "80-85分",
    },
    {
        value: "70",
        label: "70-80分",
    },
    {
        value: "69",
        label: "70分以下",
    },
    {
        value: "-1",
        label: "暂无成绩",
    },
];

export default {
    computed: {},
    data() {
        return {
            numberKeyBoardShow: false,

            classErr: false,
            addressErr: false,
            chineseScoreErr: false,
            gradeErr: false,
            mathScoreErr: false,
            mathBookErr: false,
            isChange: false, // 是否有数据改变

            numberList: numberList,
            chineseList: numberList,
            bookList: [
                {
                    value: "1",
                    label: "人教版",
                },
                {
                    value: "2",
                    label: "北师版",
                },
                {
                    value: "3",
                    label: "苏教版",
                },
                {
                    value: "4",
                    label: "冀教版",
                },
                {
                    value: "5",
                    label: "其他版本",
                },
            ],
            gradeList,
            selectChineseText: "",
            selectChinese: "",
            selectChineseDefault: [0],

            selectNumberText: "",
            selectNumber: "",
            selectNumberDefault: [0],

            selectBookText: "",
            selectBook: "",
            selectBookDefault: [0],

            selectBookDisabled: false,
            selectGradeText: "",
            selectGrade: "",
            selectGradeDefault: [0],

            selectGradeDisabled: false,
            selectAddressText: "",
            selectAddress: [],
            uiSelectAddress: [],
            addressJSON: [],
            renderAddList: [],
            selectClassNumberText: "",
            activeA: "",
            // schoolModel: false,
            gradeModel: false,
            bookModel: false,
            numberModel: false,
            chineseModel: false,
            wh: 500,
            btnType: "next", //'prev'
            timer: null,
        };
    },
    watch: {
        selectAddress(val) {
            if (val) {
                this.addressErr = false;
            }
        },
    },
    onShow() {
        uni.$on("uSelectSchool", (data) => {
            this.selectAddressText =
                data.length > 3 ? data[data.length - 1].schoolName : "";
            this.selectAddress = _.cloneDeep(data);
        });
    },
    created() {},
    onLoad() {
        // let userInfo = uni.getStorageSync("userInfo");
        // userInfo = JSON.parse(userInfo);
        // this.initSchoolData(userInfo);
    },
    methods: {
        openClassNumber() {
            this.numberKeyBoardShow = true;
        },
        onClassNumer(value) {
            console.log(
                "this.selectClassNumberText",
                this.selectClassNumberText
            );
            this.selectClassNumberText = `${
                this.selectClassNumberText.split("班")[0]
            }${value}班`;
        },
        onClassBackspace() {
            let start = this.selectClassNumberText.length - 2;
            let num = 1;
            let targetTxt =
                this.selectClassNumberText.substring(0, start) +
                this.selectClassNumberText.substring(
                    start + num,
                    this.selectClassNumberText.length
                );
            this.selectClassNumberText = targetTxt.length == 1 ? "" : targetTxt;
        },

        handleSchoolFocus() {
            this.addressErr = false;
            this.isChange = true;
        },
        chooseSchool() {
            this.$u.route({
                url: "/components/101mini-select-address/101mini-select-address",
            });
            this.isChange = true;
        },
        backEdit() {
            if (
                // this.selectAddress.length > 1 ||
                // this.selectGrade != '' ||
                // this.selectChinese != '' ||
                // this.selectNumber != '' ||
                // this.selectBook != ''
                this.isChange
            ) {
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
        cleanErr() {
            this.addressErr = false;
            this.chineseScoreErr = false;
            this.mathScoreErr = false;
            this.mathBookErr = false;
            this.gradeErr = false;
            this.classErr = false;
        },
        initSchoolData(userInfo) {
            if (userInfo.provinceId) {
                this.selectAddressText = userInfo.school;
                this.selectAddress.push({
                    code: userInfo.provinceId,
                    name: userInfo.provinceName,
                });
            }
            if (userInfo.cityId) {
                this.selectAddress.push({
                    code: userInfo.cityId,
                    name: userInfo.cityName,
                });
            }
            if (userInfo.countyId) {
                this.selectAddress.push({
                    code: userInfo.countyId,
                    name: userInfo.countyName,
                });
            }
            if (userInfo.schoolId) {
                this.selectAddress.push({
                    schoolId: userInfo.schoolId,
                    schoolName: userInfo.school,
                });
            }
            try {
                this.selectChineseText = numberList.find(
                    (el) => el.value == userInfo.chineseScore
                ).label;
                this.selectChinese = Number(userInfo.chineseScore);
                if (this.selectChinese) {
                    this.selectChineseDefault = [
                        this.numberList.findIndex((el) => {
                            return el.value == this.selectChinese;
                        }),
                    ];
                } else {
                    this.selectChineseDefault = [0];
                }

                const selectNumberText = numberList.find(
                    (el) => el.value == userInfo.mathScore
                );
                this.selectNumberText =
                    selectNumberText && selectNumberText.label;
                this.selectNumber = Number(userInfo.mathScore);
                if (this.selectNumber) {
                    this.selectNumberDefault = [
                        this.numberList.findIndex((el) => {
                            return el.value == this.selectNumber;
                        }),
                    ];
                } else {
                    this.selectNumberDefault = [0];
                }

                if (userInfo.mathBook > 0 && userInfo.mathBook <= 5) {
                    const selectBookText = this.bookList.find(
                        (el) => el.value == userInfo.mathBook
                    );
                    this.selectBookText =
                        selectBookText && selectBookText.label;
                    this.selectBook = Number(userInfo.mathBook);
                    this.selectBookDisabled = true;
                }

                if (userInfo.grade) {
                    const selectGradeText = this.gradeList.find(
                        (el) => el.value == userInfo.grade
                    );
                    this.selectGradeText =
                        selectGradeText && selectGradeText.label;
                    this.selectGrade = Number(userInfo.grade);
                    this.selectGradeDisabled = true;
                }

                if (userInfo.className) {
                    this.selectClassNumberText = userInfo.className + "班";
                }
            } catch (e) {
                //TODO handle the exception
                console.log(e);
            }
        },

        onSaveSchoolInfo() {
            wx.showLoading({
                title: "保存中...",
            });
            let { selectAddressText, selectAddress } = this;
            if (!selectAddress.length) {
                wx.hideLoading();
                this.addressErr = true;
                wx.showToast({
                    title: "请选择宝贝学校",
                    icon: "none",
                });
                return;
            }

            if (!this.selectGrade) {
                this.gradeErr = true;
                wx.hideLoading();
                wx.showToast({
                    title: "请选择今年秋季宝贝的年级",
                    icon: "none",
                });
                return;
            }
            if (!this.selectClassNumberText) {
                this.classErr = true;
                wx.hideLoading();
                wx.showToast({
                    title: "请选择宝贝的班级",
                    icon: "none",
                });
                return;
            }
            if (!this.selectBook) {
                this.mathBookErr = true;
                wx.hideLoading();
                wx.showToast({
                    title: "请选择数学教材版本",
                    icon: "none",
                });
                return;
            }

            if (!this.selectNumber) {
                this.mathScoreErr = true;
                wx.hideLoading();
                wx.showToast({
                    title: "请选择数学成绩",
                    icon: "none",
                });
                return;
            }

            if (!this.selectChinese) {
                this.chineseScoreErr = true;
                wx.hideLoading();
                wx.showToast({
                    title: "请选择语文成绩",
                    icon: "none",
                });
                return;
            }
            let provinceId = Number(selectAddress[0].code);
            let provinceName = selectAddress[0].name;
            let cityId = Number(selectAddress[1].code);
            let cityName = selectAddress[1].name;
            let areaId = Number(selectAddress[2].code);
            let areaName = selectAddress[2].name;
            let schoolName = selectAddress[3].schoolName;
            let schoolId = String(selectAddress[3].schoolId);
            let grade = Number(this.selectGrade);
            let chineseScore = Number(this.selectChinese);
            let mathScore = Number(this.selectNumber);
            let mathBook = Number(this.selectBook);
            let className = this.selectClassNumberText.split("班")[0];
            editSchoolInfo({
                schoolName,
                schoolId,
                provinceId,
                provinceName,
                cityId,
                cityName,
                areaId,
                areaName,
                grade,
                mathBook,
                mathScore,
                chineseScore,
                className,
            })
                .then((res) => {
                    this.cleanErr();
                    wx.hideLoading();
                    wx.showToast({
                        title: "保存成功",
                        icon: "success",
                    });

                    this.timer = setTimeout((e) => {
                        uni.navigateTo({
                            url: "/pages/userHealth/index",
                        });
                    }, 500);
                })
                .catch((e) => {
                    this.cleanErr();
                });
        },
        openNumber() {
            this.numberModel = true;
            this.isChange = true;
            // if(this.selectNumber){
            // 	this.selectNumberDefault = [this.numberList.findIndex(el=>{
            // 		return el.value == this.selectNumber;
            // 	})]
            // }
            // this.selectNumberDefault = [0];
            // console.log('this.selectNumberDefault',this.selectNumberDefault)
        },
        onNumberConfirm(e) {
            if (e.length > 0) {
                this.selectNumberText = e[0].label;
                this.selectNumber = e[0].value;
                // this.selectNumberDefault = [this.numberList.findIndex(el=>{
                // 	return el.value == this.selectNumber;
                // })] || [0];
                this.mathScoreErr = false;
            }
        },
        onNumberCancel(e) {
            this.numberModel = false;
        },
        onChineseCancel(e) {
            this.chineseModel = false;
        },
        onBookCancel(e) {
            this.bookModel = false;
        },
        onGradeCancel(e) {
            this.gradeModel = false;
        },
        openChinese() {
            this.chineseModel = true;
            this.isChange = true;
            // if(this.selectChinese){
            // 	this.selectChineseDefault = [this.numberList.findIndex(el=>{
            // 		return el.value == this.selectChinese;
            // 	})];
            // }else{
            // 	this.selectChineseDefault = [0]
            // }
        },
        onChineseConfirm(e) {
            if (e.length > 0) {
                this.selectChineseText = e[0].label;
                this.selectChinese = e[0].value;
                this.chineseScoreErr = false;
            }
        },
        openBook() {
            if (this.selectBookDisabled) {
                return false;
            }
            this.bookModel = true;
            this.isChange = true;
        },
        onBookConfirm(e) {
            if (e.length > 0) {
                this.selectBookText = e[0].label;
                this.selectBook = e[0].value;
                this.mathBookErr = false;
            }
        },
        openGrade() {
            if (this.selectGradeDisabled) {
                return false;
            }
            this.gradeModel = true;
            this.isChange = true;
        },
        onGreadeConfirm(e) {
            if (e.length > 0) {
                this.selectGradeText = e[0].label;
                this.selectGrade = e[0].value;
                this.gradeErr = false;
            }
        },
    },
    onUnload() {
        clearTimeout(this.timer);
    },
};
</script>

<style lang="scss" scoped>
.p-container {
    &__header {
        height: 80rpx;
        display: flex;
        justify-content: space-between;
        padding: 0 40rpx;
        align-items: center;

        &_back {
            width: 70rpx;
        }
    }

    &__body {
        padding-bottom: 30rpx;

        &_scroll {
            height: 500rpx;

            &_box {
                padding: 0 40rpx;

                &_item {
                    height: 76rpx;
                    border-bottom: 1rpx solid #f1f1f7;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
}

.school {
    padding: 60rpx 40rpx;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 180rpx;
	height: 100vh;
	box-sizing: border-box;

    .user-container-msg-save {
        height: 178rpx;
        background: #ffffff;
        box-shadow: 0 0 36rpx 0 rgba(0, 0, 0, 0.05);
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;

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

    &-number {
        &-title {
            padding: 24rpx 0;
            font-size: 32rpx;
            font-weight: 600;
            color: #210262;
        }
    }

    &-offset {
        &-item {
            display: flex;
            align-items: center;
            height: 100rpx;
            background: #ffffff;
            border-radius: 20rpx;
            border: 2rpx solid rgba(185, 185, 215, 0.2);
            padding: 0 30rpx;
            margin-bottom: 40rpx;

            .picker {
                width: 100%;
            }

            &.error {
                border: 2rpx solid #ff6666;
            }

            &-text {
                flex: 1;
                font-size: 28rpx;
                font-weight: 300;
                color: #210262;
            }

            .right-icon {
                width: 20rpx;
                height: 20rpx;
                border-top: 3rpx solid #b9b9d7;
                border-right: 3rpx solid #b9b9d7;
                transform: rotate(45deg);
            }
        }
    }
}
</style>
