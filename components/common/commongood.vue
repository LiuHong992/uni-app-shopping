<template>
	<view class="common-content" @click="goToGoodsDetail(commonObj.id)">
		<!-- 封面图 -->
		<view class="cover">
			<image class="img" :src="commonObj.list_pic_url"></image>
		</view>
		<!-- 商品名 -->
		<view class="name t-center t-over f-s-14">
			{{commonObj.name}}
		</view>
		<!-- 价格 -->
		<view class="price t-center f-s-14">
			￥{{commonObj.retail_price}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			commonObj: {
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
	.cover {
		width: 100%;
		height: 330rpx;
	}

	.price {
		margin: 16rpx 0;
		color: #B4282D;
	}
</style>
