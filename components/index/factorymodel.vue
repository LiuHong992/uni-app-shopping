<template>
	<view class="fac-model img p-r" @click="goToBrand(famodel.id)">
		<!-- 封面图 -->
		<image class="img" :src="famodel.new_pic_url"></image>
		<!-- 文字 -->
		<view class="texts p-a">
			<!-- 制造商 -->
			<view class="fac-name">
				{{famodel.name}}
			</view>
			<!-- 价格 -->
			<view class="prices">
				{{famodel.floor_price}}元起
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			famodel: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 跳转到厂商详情页
			goToBrand(ids) {
				uni.navigateTo({
					url: `../../pages/brand/brand?id=${ids}`,
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
	.fac-model {
		width: 100%;
		height: 100%;

		.texts {
			font-size: 26rpx;
			top: 20rpx;
			left: 20rpx;

			.prices {
				margin-top: 10rpx;
				color: #C6C5C6;
			}
		}
	}
</style>
