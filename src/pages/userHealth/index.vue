<template>
	<view class="health" :style="{height: wh + 'px', background: '#F5F5FF'}">
		<u-navbar title-color="#000000" title-size="34" :custom-back="backEdit" title="宝贝健康档案" :is-fixed="true">
		</u-navbar>
		<div class="health-content">
			<view class="health-content-item">
				<view class="health-content-item-title">
					1.常用药
				</view>
				<view class="health-content-item-text">
					<u-input class="health-content-item-text-textarea" :trim="true" placeholder-style="color : #B9B9D7"
						v-model="uploadData.commonlyDrug" type="textarea" :maxlength="maxLength" :height="180"
						placeholder="请填写宝贝的常用药物(选填)" @click="handleClickInputWrap" />
					<view class="health-content-item-text-tip"
						:class="{red: uploadData.commonlyDrug.length == maxLength}">
						{{uploadData.commonlyDrug.length | formatFontNumber}} / {{maxLength}}
					</view>
				</view>
			</view>
			<view class="health-content-item">
				<view class="health-content-item-title">
					2.过敏源
				</view>
				<view class="health-content-item-text">
					<u-input class="health-content-item-text-textarea" :trim="true" placeholder-style="color : #B9B9D7"
						v-model="uploadData.allergen" type="textarea" :maxlength="maxLength" :height="180"
						placeholder="是否有过敏源(选填)" @click="handleClickInputWrap" />
					<view class="health-content-item-text-tip" :class="{red: uploadData.allergen.length == maxLength}">
						{{uploadData.allergen.length | formatFontNumber}} / {{maxLength}}
					</view>
				</view>
			</view>
			<view class="health-content-item">
				<view class="health-content-item-title">
					3.不能吃
				</view>
				<view class="health-content-item-text">
					<u-input class="health-content-item-text-textarea" :trim="true" placeholder-style="color : #B9B9D7"
						v-model="uploadData.dislikeFood" type="textarea" :maxlength="maxLength" :height="180"
						placeholder="宝贝不能吃什么，不喜欢吃什么(选填)" @click="handleClickInputWrap" />
					<view class="health-content-item-text-tip"
						:class="{red: uploadData.dislikeFood.length == maxLength}">
						{{uploadData.dislikeFood.length | formatFontNumber }} / {{maxLength}}
					</view>
				</view>
			</view>
			<view class="health-content-item">
				<view class="health-content-item-title">
					4.其他嘱咐
				</view>
				<view class="health-content-item-text">
					<u-input class="health-content-item-text-textarea" :trim="true" placeholder-style="color : #B9B9D7"
						v-model="uploadData.enjoin" type="textarea" placeholder="请填写(选填)" :maxlength="maxLength"
						:height="180" @click="handleClickInputWrap" />
					<view class="health-content-item-text-tip" :class="{red: uploadData.enjoin.length == maxLength}">
						{{uploadData.enjoin.length | formatFontNumber}} / {{maxLength}}
					</view>
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
	import api from '@/common/api.js';
	let {
		editHealthInfo
	} = api;

	import reg from '@/utils/constant.js';
	let {
		health_reg_an
	} = reg;
	export default {
		filters: {
			formatFontNumber(val) {
				return val >= 50 ? 50 : val;
			}
		},
		data() {
			return {
				wh: 500,
				drug: '',
				maxLength: 50,
				// color : #B9B9D7: '#B9B9D7',
				uploadData: {
					commonlyDrug: '', // 常用药
					allergen: '', // 过敏源
					dislikeFood: '', // 不能吃
					enjoin: '' // 备注
				},

				isChange: false, // 数据是否改变
				from: '',
			}
		},
		watch: {
			'uploadData.commonlyDrug'(val) {
				if (val.length > 50) {
					this.uploadData.commonlyDrug = val.substring(0, 50);
				}
			},
			'uploadData.allergen'(val) {
				if (val.length > 50) {
					this.uploadData.allergen = val.substring(0, 50);
				}
			},
			'uploadData.dislikeFood'(val) {
				if (val.length > 50) {
					this.uploadData.dislikeFood = val.substring(0, 50);
				}
			},
			'uploadData.enjoin'(val) {
				if (val.length > 50) {
					this.uploadData.enjoin = val.substring(0, 50);
				}
			},
		},
		onLoad({
			from
		}) {
			this.from = from;
			const systemInfo = wx.getSystemInfoSync();
			this.wh = systemInfo.windowHeight;
		},
		mounted() {
			let userInfo = uni.getStorageSync('userInfo');
			userInfo = JSON.parse(userInfo);
			this.initHealth(userInfo);
		},
		methods: {
			handleClickInputWrap() {
				this.isChange = true;
			},
			backEdit() {
				let {
					commonlyDrug,
					allergen,
					dislikeFood,
					enjoin
				} = this.uploadData;
				// if(commonlyDrug || allergen || dislikeFood || enjoin){
				if (this.isChange) {
					uni.showModal({
						title: '确定离开?',
						content: '已修改的信息将不会保存',
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					});
				} else {
					uni.navigateBack({
						delta: 1
					})
				}

			},
			initHealth(userInfo) {
				this.uploadData = {
					commonlyDrug: userInfo.commonlyDrug, // 常用药
					allergen: userInfo.allergen, // 过敏源
					dislikeFood: userInfo.dislikeFood, // 不能吃
					enjoin: userInfo.enjoin // 备注
				}
			},

			saveUserHealth() {
				wx.showLoading({
					title: '保存中...'
				});
				let {
					uploadData
				} = this;
				editHealthInfo({
						...uploadData
					})
					.then(res => {
						wx.hideLoading();
						wx.showToast({
							title: '保存成功',
							icon: 'success'
						})
						setTimeout(() => {
							if (this.from !== 'person') {
								let isPay = uni.getStorageSync('isPay');
								console.log('isPay ========',isPay);
								if (isPay) {
									uni.switchTab({
										url: '/pages/report/report'
									})
								} else {
									uni.switchTab({
										url: '/pages/Index/Index'
									})
								}

							} else {
								uni.navigateBack({
									delta: 1
								})
							}

						}, 500);
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.red {
		color: red !important;
	}

	.health {
		position: relative;

		.user-container-msg-save {
			height: 178rpx;
			background: #FFFFFF;
			box-shadow: 0 0 36rpx 0 rgba(0, 0, 0, 0.05);
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 999;

			.user-container-msg-save-btn {
				width: 580rpx;
				height: 90rpx;
				background: #5D45DB;
				border-radius: 45rpx;
				font-size: 34rpx;
				font-weight: 500;
				color: #FFFFFF;
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
					background: #FFFFFF;
					border-radius: 20rpx;
					border: 1rpx solid rgba(185, 185, 215, 0.2);
					overflow: hidden;
					position: relative;
					padding: 10rpx;

					&-textarea {
						font-size: 28rpx;
						font-weight: 300;
						color: #210262;
					}

					&-tip {
						position: absolute;
						bottom: 14rpx;
						right: 22rpx;
						font-size: 28rpx;
						font-weight: 300;
						color: #B9B9D7;
					}
				}
			}
		}
	}
</style>
