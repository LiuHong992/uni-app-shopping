<template>
	<view class="goods-nav w-100">
		<view class="goods-nav-wrapper fl a-c">
			<!-- 收藏按钮(收藏状态和为收藏状态) -->
			<view class="collect-wrapper">
				<view class="collec-item">
					<!-- 上面的图标 -->
					<view class="collect-icon m-auto" @click="collectBtn">
						<image v-if="collectFlag && loginStatus" class="img" src="../../static/collect-active.png"></image>
						<image v-else class="img" src="../../static/collect.png"></image>

					</view>
					<!-- 下面的文字 -->
					<view class="collect-text t-center f-s-15">
						收藏
					</view>
				</view>
			</view>
			<!-- 购物车按钮 -->
			<view class="carts-wrapper m-l-10 m-r-10">
				<view class="carts-item" @click="goToCarts">
					<!-- 上面的图标icon -->
					<view class="carts-icon m-auto p-r">
						<image class="img" src="../../static/carts.png" mode=""></image>
						<!-- 购物车数量 -->
						<view class="carts-num-wrapper p-a" v-if="cartsNum >0">
							<view class="carts-num t-center f-s-12" v-if="cartsNum<99">
								{{cartsNum}}
							</view>
							<view class="carts-num t-center f-s-12" v-else>
								99+
							</view>
						</view>
					</view>
					<!-- 下面的文字 -->
					<view class="carts-text t-center f-s-15">
						购物车
					</view>
				</view>
			</view>
			<!-- 右边的两个按钮 -->
			<view class="buy-addcarts-wrapper">
				<view class="buy-addcarts fl">
					<!-- 左边的加入购物车按钮 -->
					<view class="addcarts-btn" @click="openPop(0)">
						加入购物车
					</view>
					<!-- 右边的立即购买按钮 -->
					<view class="buy-btn" @click="openPop(1)">
						立即购买
					</view>
				</view>
			</view>
			<!-- 弹出层 -->
			<view class="popup-wrapper">
				<uni-popup ref="popup" type="bottom">
					<!-- 购买弹窗 -->
					<view class="buy-detail-wrapper p-15" v-if="goodsinfo">
						<!-- 头部的封面图单价和关闭弹出层按钮 -->
						<view class="head-wrapper fl s-b m-b-15">
							<!-- 左边的封面价格 -->
							<view class="cover-prices fl">
								<view class="goods-cover">
									<image class="img" :src="goodsinfo.primary_pic_url"></image>
								</view>
								<!-- 价格 -->
								<view class="prices-wrapper m-l-15 fl f-end">
									<view class="prices f-s-14">
										<!-- 上面的价格 -->
										<view class="top-price">
											价格￥{{goodsinfo.retail_price}}
										</view>
										<!-- 下面的限购数量 -->
										<view class="limit-num">
											库存{{goodsinfo.goods_number}}{{goodsinfo.goods_unit}}
										</view>
									</view>
								</view>
							</view>
							<!-- 右边的关闭按钮 -->
							<view class="close-wrapper fl">
								<view class="close-btn" @click="closePop">
									<image class="img" src="../../static/close.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 下面的步进器和右边的确定按钮 -->
						<view class="footer-wrapper fl s-b">
							<!-- 左边的步进器 -->
							<view class="stepper-wrapper">
								<!-- 头部的文字 -->
								<view class="stepper-text f-s-14 m-b-10">
									数量
								</view>
								<!-- 下面的步进器 -->
								<view class="stepper-content">
									<uni-number-box :value="goodsNum" :min="1" :max="goodsinfo.goods_number" @change="bindChange"></uni-number-box>
								</view>
							</view>
							<!-- 右边的确定按钮 -->
							<view class="confirm-wrapper fl f-end">
								<view class="confirm-btn t-center f-s-14" @click="confirmBtn()">
									确定
								</view>
							</view>
						</view>
					</view>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import uniPopup from '../uni-ui/uni-popup/uni-popup.vue'
	import uniNumberBox from '../uni-ui/uni-number-box/uni-number-box.vue'
	export default {
		name: "",
		components: {
			uniPopup,
			uniNumberBox
		},
		props: {
			collectFlag: {
				type: Boolean,
				default: false
			},
			cartsNum: {
				type: Number,
				default: 0
			},
			// 商品信息
			goodsinfo: {
				type: Object,
				default: () => {}
			},
			// 登录状态
			loginStatus: {
				type: Boolean,
				default: false
			},
			// openId
			openId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// 用来判断是点击的加入购物车还是立即购物按钮
				confirmNum: 0,
				// 步进器的值
				goodsNum: 1
			}
		},
		methods: {
			...mapActions(['addToCarts', 'getCartsNum']),
			// 打开购买弹窗
			openPop(nums) {
				this.confirmNum = nums
				this.$refs.popup.open()
			},
			// 关闭按钮
			closePop() {
				this.$refs.popup.close()
			},
			// 步进器方法
			bindChange(e) {
				this.goodsNum = e
			},
			// 子组件分发回父组件的收藏方法
			collectBtn(e) {
				this.$emit('collect', e)
			},
			// 跳转购物车
			goToCarts() {
				uni.switchTab({
					url: '../../pages/carts/carts'
				})
			},
			// 确定按钮
			confirmBtn() {
				if (this.confirmNum === 0) {
					this.addToCarts({
						goodsId: this.goodsinfo.id,
						number: this.goodsNum,
						openId: this.openId
					})
					this.goodsNum = 1
					this.$refs.popup.close()
					// #ifdef MP-WEIXIN
					this.getCartsNum('liuhong')
					// #endif
				} else {
					let orderArr = []
					orderArr.push(this.goodsinfo)
					orderArr = JSON.stringify(orderArr)
					uni.navigateTo({
						url: `../../pages/settlement/settlement?orderArr=${orderArr}&allPrice=${this.checkedPrices}&payNum=${this.goodsNum}`,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		},
		mounted() {

		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			checkedPrices() {
				if (this.confirmNum > 0) {
					return this.goodsNum * this.goodsinfo.retail_price
				}
			}
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.goods-nav {
		background-color: #fff;

		.goods-nav-wrapper {
			padding: 20rpx 36rpx;

			.collect-wrapper {
				.collec-item {
					.collect-icon {
						width: 48rpx;
						height: 48rpx;
					}

					.collect-text {
						margin-top: 6rpx;
					}
				}
			}

			.carts-wrapper {
				.carts-item {
					.carts-icon {
						width: 48rpx;
						height: 48rpx;

						.carts-num-wrapper {
							right: -34rpx;
							top: -16rpx;

							.carts-num {
								width: 48rpx;
								height: 48rpx;
								line-height: 48rpx;
								border-radius: 50%;
								background-color: #B4282D;
								color: #fff;
							}
						}
					}

					.carts-text {
						margin-top: 6rpx;
					}
				}
			}

			// 两个按钮(加入购物车和购买)
			.buy-addcarts-wrapper {
				width: 72%;

				.buy-addcarts {

					.addcarts-btn,
					.buy-btn {
						width: 50%;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-size: 28rpx;
						color: #fff;
					}

					.addcarts-btn {
						border-top-left-radius: 40rpx;
						border-bottom-left-radius: 40rpx;
						background-image: linear-gradient(to right, #FFCB1E, #FF8C17);
					}

					.buy-btn {
						border-top-right-radius: 40rpx;
						border-bottom-right-radius: 40rpx;
						background-image: linear-gradient(to right, #FF5E34, #EF0E25);
					}
				}
			}

			.popup-wrapper {
				.buy-detail-wrapper {
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					background-color: #fff;

					// 头部信息
					.head-wrapper {
						.cover-prices {
							.goods-cover {
								width: 160rpx;
								height: 160rpx;
							}

							.prices-wrapper {
								flex-direction: column;

								.prices {
									.top-price {
										color: #B4282D;
									}
								}
							}
						}

						.close-wrapper {
							.close-btn {
								width: 36rpx;
								height: 36rpx;
							}
						}
					}

					// 底部按钮
					.footer-wrapper {
						.stepper-wrapper {}

						.confirm-wrapper {
							flex-direction: column;

							.confirm-btn {
								width: 160rpx;
								height: 60rpx;
								border-radius: 60rpx;
								background-image: linear-gradient(to right, #FF5E34, #EF0E25);
								color: #fff;
								line-height: 60rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
