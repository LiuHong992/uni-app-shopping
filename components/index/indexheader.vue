<template>
	<view class="index-headers fl b-box s-b">
		<!-- 左边的定位盒子 -->
		<view class="left-location t-over" v-if="locations === ''">
			定位中...
		</view>
		<view class="left-location t-over" v-else @click="openMap">
			{{locations}}
		</view>
		<!-- 右边的搜索框 -->
		<view class="right-input" @click="goToSearch">
			<uni-search-bar :radius="100" placeholder="请输入关键词" cancelButton="none"></uni-search-bar>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../uni-ui/uni-search-bar/uni-search-bar.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "",
		components: {
			uniSearchBar
		},
		props: {},
		data() {
			return {
				indexVal: ''
			}
		},
		methods: {
			...mapMutations(['setLocation']),
			goToSearch() {
				uni.navigateTo({
					url: '../../pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {
						// #ifndef APP-PLUS
						uni.hideKeyboard();
						// #endif
						// #ifdef APP-PLUS
						plus.key.hideSoftKeybord()
						// #endif
					}
				});
			},
			// 打开地图
			openMap() {
				let t = this
				uni.chooseLocation({
					success(res) {
						t.setLocation(res.address)
					}
				})
			},
		},
		mounted() {

		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['locations']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.index-headers {
		padding: 20rpx 16rpx;
		background-color: #fff;

		.left-location {
			line-height: 60rpx;
			max-width: 22vw;
			font-size: 28rpx;
			line-height: 60rpx;
		}

		.right-input {
			width: 70vw;

			.uni-searchbar {
				padding: 0;
			}
		}
	}
</style>
