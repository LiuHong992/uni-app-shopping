<template>
	<!-- 新品和推荐盒子model -->
	<view class="nc-model m-l-10 m-r-10" @click="goToGoodsDetail(ncmodel.id)">
		<!-- 上面商品图片 -->
		<view class="good-image">
			<image class="img" :src="ncmodel.list_pic_url"></image>
		</view>
		<!-- 中间层的商品名 -->
		<view class="good-name t-over f-s-15">
			{{ncmodel.name}}
		</view>
		<!-- 简介 -->
		<view class="shortdesc t-over">
			{{ncmodel.goods_brief}}
		</view>
		<!-- 底层的价格 -->
		<view class="good-price">
			￥{{ncmodel.retail_price}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			ncmodel: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {
			goToGoodsDetail(idx) {
				uni.navigateTo({
					url: `../../pages/goodsdetail/goodsdetail?id=${idx}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		mounted() {

		},
		onLoad() {

		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.nc-model {
		.good-image {
			width: 300rpx;
			height: 300rpx;
		}

		.good-name,
		.shortdesc {
			max-width: 300rpx;
			margin-bottom: 10rpx;
		}

		.shortdesc,
		.good-price {
			font-size: 28rpx;
			color: #ccc;
		}

		.good-price {
			color: #B4282D;
		}
	}
</style>
