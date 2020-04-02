<template>
	<view class="goods-detail">
		<!-- 头部的轮播图 -->
		<view class="banner-wrapper">
			<banners :bannerArr="goodsInfos.gallery"></banners>
		</view>
		<!-- 导航栏 -->
		<view class="nav-wrapper">
			<commonnav></commonnav>
		</view>
		<!-- 商品详情内容层 -->
		<view class="goods-basicinfos t-center" v-if="goodsInfos.info">
			<!-- 商品名 -->
			<view class="goods-name f-s-18">
				{{goodsInfos.info.name}}
			</view>
			<!-- 简介 -->
			<view class="short-desc f-s-14">
				{{goodsInfos.info.goods_brief}}
			</view>
			<!-- 单价 -->
			<view class="goods-price f-s-14">
				￥{{goodsInfos.info.retail_price}}
			</view>
		</view>
		<!-- 商品参数 -->
		<view class="more-parameters">
			<!-- 标题 -->
			<view class="more-title f-s-15 m-b-20">
				商品参数
			</view>
			<!-- 具体的参数内容层 -->
			<view class="parameters-content">
				<!-- 参数模板 -->
				<view class="parameter-item m-b-15" v-for="(item,index) in goodsInfos.attribute" :key="index">
					<parametermodel :paramObj="item"></parametermodel>
				</view>
			</view>
		</view>
		<!-- 商品图片(富文本解析器) -->
		<view class="goods-images" v-if="goodsInfos.info">
			<u-parse :html="goodsInfos.info.goods_desc" ref="article"></u-parse>
		</view>
		<!-- 常见问题 -->
		<view class="common-problems">
			<!-- 头部标题 -->
			<view class="problems-head fl f-center f-s-14 ">
				<view class="lines">
					——
				</view>
				<view class="title-name">
					常见问题
				</view>
				<view class="lines">
					——
				</view>
			</view>
			<!-- 问题内容层 -->
			<view class="problem-wrapper" v-if="goodsInfos.issue">
				<!-- 内容模板 -->
				<view class="problem-model" v-for="(item,index) in goodsInfos.issue" :key="index">
					<problemmodel :problemmodel="item"></problemmodel>
				</view>
			</view>
		</view>
		<!-- 大家都在看 -->
		<view class="recommends">
			<!-- 头部标题 -->
			<view class="problems-head fl f-center f-s-14 ">
				<view class="lines">
					——
				</view>
				<view class="title-name">
					大家都在看
				</view>
				<view class="lines">
					——
				</view>
			</view>
			<!-- 推荐内容层 -->
			<view class="recommend-wrapper fl fl-w" v-if="goodsInfos.productList">
				<!-- 推荐模板 -->
				<view class="recommend-model" v-for="(item,index) in goodsInfos.productList" :key="index">
					<commongood :commonObj="item"></commongood>
				</view>
			</view>
		</view>
		<!-- 商品导航栏 -->
		<view class="goods-nav">
			<goods-nav @collect="collect" :loginStatus="loginStatus" :collectFlag="goodsInfos.collected" :cartsNum="cartsArr.length"
			 :goodsinfo="goodsInfos.info" :openId="openId"></goods-nav>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import banners from '../../components/index/banner.vue'
	import commonnav from '../../components/common/commonnav.vue'
	import parametermodel from '../../components/gooddetail/parametermodel.vue'
	import uParse from '../../components/jyf-parser/jyf-parser.vue'
	import problemmodel from '../../components/gooddetail/problemmodel.vue'
	import commongood from '../../components/common/commongood.vue'
	import goodsNav from '../../components/gooddetail/goodsnav.vue'
	// import uParse from '../../components/feng-parse/parse.vue'
	export default {
		name: "",
		components: {
			banners,
			commonnav,
			parametermodel,
			uParse,
			problemmodel,
			commongood,
			goodsNav
		},
		props: {},
		data() {
			return {
				// 接收传过来的id值
				goodsId: null,
				// 接收openId
				openId: '',
			}
		},
		methods: {
			...mapActions(['getGoodsDetail', 'addCollects', 'getCartsNum']),
			...mapMutations(['setLoginStatus']),
			// 收藏按钮(子组件分发回父组件的方法)
			collect(e) {
				if (this.loginStatus) {
					this.addCollects({
						goodsId: this.goodsId,
						openId: this.openId
					})
					this.getGoodsDetail({
						id: this.goodsId,
						openId: this.openId
					})
					setTimeout(() => {
						if (this.goodsInfos.collected) {
							uni.showToast({
								title: '取消收藏成功'
							});
						} else {
							uni.showToast({
								title: '收藏成功'
							});
						}
					}, 800)
				} else {
					uni.showModal({
						title: '特别提醒',
						content: '检测到您还未登录,无法使用该程序的一些功能,推荐您登录后使用该程序',
						showCancel: false,
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
		},
		mounted() {
			if (this.goodsId !== null && this.openId !== '') {
				uni.showLoading({
					title: '加载中...',
				});
				this.getGoodsDetail({
					id: this.goodsId,
					openId: this.openId
				})
			}
		},
		onShow() {
			if (uni.getStorageSync('openId')) {
				this.openId = uni.getStorageSync('openId')
			}
			if (uni.getStorageSync('userInfo')) {
				this.setLoginStatus(true)
				this.getCartsNum(this.openId)
			}
		},
		onLoad(option) {
			this.goodsId = option.id
			// console.log(this.goodsId);
		},
		filters: {

		},
		computed: {
			...mapState(['goodsInfos', 'loginStatus', 'cartsArr']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.goods-detail {
		.banner-wrapper {
			height: 800rpx !important;
		}

		.goods-basicinfos {
			border-bottom: 2rpx solid #ccc;

			.goods-name {
				padding: 40rpx 0 10rpx;
			}

			.goods-price {
				padding: 40rpx 0 30rpx;
				color: #B4282D;
			}
		}

		// 更多参数
		.more-parameters {
			padding: 40rpx 20rpx 0;
		}

		// 富文本解析器
		.goods-images,
		.common-problems,
		.recommends {
			padding: 0 20rpx 40rpx;
		}

		.common-problems,
		.recommends {
			.problems-head {
				margin-bottom: 60rpx;

				.lines {
					color: #ccc;
				}

				.title-name {
					margin: 0 20rpx;
				}
			}
		}

		.recommends {
			.recommend-wrapper {
				margin-bottom: 120rpx;

				.recommend-model {
					width: 46%;
					padding: 0 10rpx 20rpx;
					border-bottom: 2rpx solid #ccc;
					border-right: 2rpx solid #ccc;

					&:first-child,
					&:nth-child(2) {
						border-top: 2rpx solid #ccc;
					}

					&:nth-child(2n) {
						border-right: none;
					}

					&:last-child {
						border-bottom: none;
					}
				}
			}
		}

		// 商品导航栏
		.goods-nav {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
