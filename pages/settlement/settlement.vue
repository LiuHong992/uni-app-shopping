<template>
	<view class="settlements-wrapper p-r">
		<!-- 头部的收货地址 -->
		<view class="receiving-wrapper">
			<!-- 头部的小横条 -->
			<view class="receving-image w-100">
				<image class="img" src="../../static/address-line.png"></image>
			</view>
			<!-- 地址选择 -->
			<view class="choose-address-wrapper">
				<view class="choose-address-content p-10" @click="goToAddressList">
					<addressmodel :addressmodel="addressObj" :buys="1"></addressmodel>
				</view>
			</view>
		</view>
		<!-- 中间的商品额外信息 -->
		<view class="other-infos-wrapper m-t-10">
			<view class="other-infos-content f-s-14">
				<!-- 信息模板 -->
				<view class="info-model fl s-b">
					<view class="info-name">
						商品合计
					</view>
					<view class="info-data">
						￥{{checkedPrices}}
					</view>
				</view>
				<view class="info-model fl s-b">
					<view class="info-name">
						运费
					</view>
					<view class="info-data">
						免运费
					</view>
				</view>
				<view class="info-model fl s-b">
					<view class="info-name">
						优惠券
					</view>
					<view class="info-data">
						暂无
					</view>
				</view>
			</view>
		</view>
		<!-- 商品内容层 -->
		<view class="ordergoods-wrapper">
			<view class="ordergoods-content">
				<!-- 内容模板 -->
				<view class="goods-model m-t-10" v-for="(item,index) in orderArr" :key="index">
					<cartsmodel :cartsmodel="item" :payNum="payNum"></cartsmodel>
				</view>
			</view>
		</view>
		<!-- 最下方的结算页面 -->
		<view class="payment-wrapper w-100 z-99">
			<view class="payment-content fl f-s-14">
				<!-- 左边的价钱 -->
				<view class="left-price">
					实付:￥{{checkedPrices}}
				</view>
				<!-- 右边的按钮 -->
				<view class="right-payment f-s-18 t-center" @click="pays">
					支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import addressmodel from '../../components/address/addressmodel'
	import cartsmodel from '../../components/carts/cartsmodel'
	export default {
		name: "",
		components: {
			addressmodel,
			cartsmodel
		},
		props: {},
		data() {
			return {
				// 接收传过来的订单数组
				orderArr: [],
				// 接收传过来的总价
				checkedPrices: null,
				// 立即购买
				payNum: 0
			}
		},
		methods: {
			...mapActions(['getAllAddresses', 'delCartsGoods', 'buyNow']),
			...mapMutations(['setAddressObj']),
			// 跳转地址列表切换地址
			goToAddressList() {
				let flag = true
				uni.navigateTo({
					url: `../addresslist/addresslist?buyAddress=${flag}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 支付
			pays() {
				if (this.payNum === 0) {
					this.orderArr.map(item => {
						this.delCartsGoods(item.id)
					})
					this.afters()
				} else {
					this.buyNow({
						allPrise: this.checkedPrices,
						goodsId: this.orderArr[0].id,
						openId: 'liuhong'
					})
					this.afters()
				}
			},
			// 支付成功后操作
			afters() {
				uni.showToast({
					title: `您一共消费了${this.checkedPrices}元`,
					icon: "none",
					duration: 800
				});
				setTimeout(() => {
					uni.switchTab({
						url: "../index/index"
					})
				}, 800)
			}
		},
		mounted() {
			this.getAllAddresses('liuhong')
		},
		onLoad(option) {
			this.orderArr = JSON.parse(option.orderArr)
			this.checkedPrices = option.allPrice
			if (option.payNum) {
				this.payNum = Number(option.payNum)
			}
		},
		filters: {

		},
		computed: {
			...mapState(['addressObj', 'addressArr']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.settlements-wrapper {
		height: 100vh;
		/* #ifdef H5 */
		height: 94.6vh;
		/* #endif */
		background-color: #F4F4F4;

		.receiving-wrapper {
			.receving-image {
				height: 40rpx;
			}

			.choose-address-wrapper {
				.choose-address-content {
					background-color: #fff;
				}
			}
		}

		.other-infos-wrapper {
			background-color: #fff;

			.other-infos-content {
				margin: 0 20rpx;

				.info-model {
					padding: 30rpx 0;
					border-bottom: 2rpx solid #ccc;

					&:last-child {
						border: none;
					}
				}
			}
		}

		.ordergoods-wrapper {
			.ordergoods-content {
				.goods-model {
					padding: 20rpx;
					background-color: #fff;
				}
			}
		}

		// 支付
		.payment-wrapper {
			position: sticky;
			bottom: 0;
			height: 100rpx;
			line-height: 100rpx;

			.payment-content {
				background-color: #fff;

				.left-price {
					width: 65%;
					padding: 0 0 0 20rpx;
				}

				.right-payment {
					width: 35%;
					background-color: #B4282D;
					color: #fff;
				}
			}
		}
	}
</style>
