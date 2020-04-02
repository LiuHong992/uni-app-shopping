<template>
	<view class="cart-wrapper">
		<!-- 购物车内含商品时 -->
		<view class="carts-wrapper p-r" v-if="newCartsArr.length>0">
			<!-- 头部的公共标题 -->
			<view class="ccommon-title w-100">
				<commonnav></commonnav>
			</view>
			<!-- 下方具体的购物车内容层 -->
			<view class="carts-real-wrapper">
				<uni-swipe-action>
					<uni-swipe-action-item :options="options" @click="onClick(index)" @change="change" v-for="(item,index) in newCartsArr"
					 :key="index">
						<view class="swipper-model w-100 fl">
							<!-- 左边的单选按钮 -->
							<view class='checked fl a-c'>
								<label>
									<checkbox :checked="item.checked" @click="changeChecked(index)" />
								</label>
							</view>
							<!-- 右边的内容模板 -->
							<view class="carts-model">
								<cartsmodel :cartsmodel="item"></cartsmodel>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<!-- 最下方的结算层 -->
			<view class="settlement-wrapper z-99">
				<view class="settlement-content fl">
					<!-- 左边的全选框和总价 -->
					<view class="left-box fl s-b">
						<!-- 全选框 -->
						<view class="all-choose-box fl a-c">
							<label @click="chooseAll">
								<checkbox :checked="allFlag" /><text>全选({{checkedGoods}})</text>
							</label>
						</view>
						<!-- 总价 -->
						<view class="allprices fl a-c">
							￥{{checkedPrices}}
						</view>
					</view>
					<!-- 右边的结算按钮 -->
					<view class="settlement-btn-wrapper t-center" @click="goToSettlement">
						结算
					</view>
				</view>
			</view>
		</view>
		<!-- 购物车内不含商品时 -->
		<view class="no-carts-wrapper" v-else>
			<view class="none-text f-s-15 t-center">
				你的购物车空空如也~
			</view>
			<!-- 跳转首页的按钮 -->
			<view class="goto-index fl f-center m-t-30">
				<view class="gotobtn t-center f-s-15" @click="goToIndex">
					去购物
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters
	} from 'vuex'
	import commonnav from '../../components/common/commonnav'
	import cartsmodel from '../../components/carts/cartsmodel'
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		name: "",
		components: {
			commonnav,
			cartsmodel,
			uniSwipeAction,
			uniSwipeActionItem
		},
		props: {},
		data() {
			return {
				openId: '',
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#B4282D'
					}
				}],
				// 选中的数组
				chooseArr: []
			}
		},
		methods: {
			...mapActions(['getCartsNum', 'delCartsGoods']),
			// 跳转到首页
			goToIndex() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			// 单选框事件
			changeChecked(goodsindex) {
				this.newCartsArr[goodsindex].checked = !this.newCartsArr[goodsindex].checked
				this.chooseArr = this.newCartsArr.filter(item => {
					return item.checked === true
				})
			},
			// 全选
			chooseAll() {
				if (this.allFlag) {
					this.chooseArr = []
					this.newCartsArr.map(item => {
						item.checked = false
					})
				} else {
					this.chooseArr = [];
					this.newCartsArr.map(item => {
						item.checked = true
						this.chooseArr.push(item);
					})
				}
			},
			// 删除按钮
			onClick(indexs) {
				uni.showModal({
					title: '提醒',
					content: '您确定将该商品从您的购物车中删除吗?',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							uni.showToast({
								title: '删除成功'
							});
							this.delCartsGoods(this.newCartsArr[indexs].id)
							this.chooseArr = []
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 结算按钮
			goToSettlement() {
				if (this.chooseArr.length > 0) {
					let orderArr = JSON.stringify(this.chooseArr)
					uni.navigateTo({
						url: `../settlement/settlement?orderArr=${orderArr}&allPrice=${this.checkedPrices}`,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: '请选择您要购买的商品',
						icon: "none"
					});
				}

			},
			change() {}
		},
		mounted() {

		},
		onShow() {
			if (uni.getStorageSync('openId')) {
				this.openId = uni.getStorageSync('openId')
			}
			if (this.openId !== '') {
				this.getCartsNum(this.openId)
				this.chooseArr = []
			}
		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			// ...mapState(['cartsArr']),
			...mapGetters(['newCartsArr']),
			// 全选框状态
			allFlag() {
				if (this.chooseArr.length == this.newCartsArr.length) {
					return true
				} else {
					return false
				}
			},
			// 选中的商品总件数
			checkedGoods() {
				let num = 0
				this.chooseArr.map(item => {
					if (item.checked) {
						num += item.number
					}
				})
				return num
			},
			// 选中商品的价格
			checkedPrices() {
				let total = 0
				this.chooseArr.map(item => {
					if (item.checked) {
						total += (item.number * item.retail_price)
					}
				})
				return total
			}
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.cart-wrapper {
		height: 100vh;
		/* #ifdef H5 */
		height: 93.7vh;
		/* #endif */
		background-color: #EEEEEE;

		.carts-wrapper {
			height: 100%;

			.carts-real-wrapper {
				.swipper-model {
					padding: 20rpx 30rpx 80rpx;

					.checked {
						width: 10%;
					}

					.carts-model {
						width: 90%;
					}
				}
			}

			// 结算
			.settlement-wrapper {
				position: sticky;
				width: 100%;
				bottom: 0;

				.settlement-content {
					height: 120rpx;

					// 左边的全选框和总价
					.left-box {
						width: 65%;
						height: 100%;
						padding: 0 30rpx;
						background-color: #fff;

						.allprices {
							color: #B4282D;
						}
					}

					.settlement-btn-wrapper {
						width: 35%;
						background-color: #B4282D;
						color: #fff;
						line-height: 120rpx;
					}
				}
			}
		}

		.no-carts-wrapper {
			.none-text {
				padding-top: 60rpx;
			}

			.goto-index {
				.gotobtn {
					padding: 10rpx 20rpx;
					color: #fff;
					background-image: linear-gradient(to right, #AE81FF, #66D9EF);
				}
			}
		}
	}
</style>
