<template>
	<view class="nav-content fl s-b">
		<!-- 导航栏模板 -->
		<view class="nav-item t-center" v-for="(item,index) in navbarArr" :key="index" @click="goToCatogray(item.url)">
			<!-- 头部的导航栏图片 -->
			<view class="item-head">
				<image class="img" :src="item.icon_url"></image>
			</view>
			<!-- 下面的文字 -->
			<view class="item-footer f-s-14">
				{{item.name}}
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
			navbarArr: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {}
		},
		methods: {
			// 从首页的导航栏跳转到对应的目录页
			goToCatogray(url) {
				uni.navigateTo({
					url: `../..${url}`,
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
	.nav-item {
		.item-head {
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
