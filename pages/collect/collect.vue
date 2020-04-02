<template>
	<view class="mycollect-wrapper">
		<view class="mycollect-content">
			<!-- 头部标题 -->
			<view class="header-title t-center f-w f-s-18">
				我的收藏
			</view>
			<!-- 内容层 -->
			<view class="collects-wrapper">
				<view class="collect-content fl fl-w">
					<!-- 内容模板 -->
					<view class="collect-model" v-for="(item,index) in collectArr" :key="index">
						<commongood :commonObj="item"></commongood>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import commongood from '../../components/common/commongood.vue'
	export default {
		name: "",
		components: {
			commongood
		},
		props: {},
		data() {
			return {
				// openId
				openId: '',
			}
		},
		methods: {
			...mapActions(['getCollected']),
		},
		mounted() {
			if (uni.getStorageSync('openId')) {
				this.openId = uni.getStorageSync('openId')
			}
			if (this.openId !== '') {
				this.getCollected(this.openId)
			}
		},
		onShow() {
			if (this.openId !== '') {
				this.getCollected(this.openId)
			}
		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['collectArr']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.mycollect-wrapper {
		height: 100vh;
		/* #ifdef H5 */
		height: 94.6vh;
		/* #endif */
		background-color: #F4F4F4;

		.mycollect-content {
			.header-title {
				padding: 60rpx 0;
				background-color: #fff;
			}

			.collects-wrapper {

				.collect-content {
					.collect-model {
						width: 47%;
						margin: 10rpx;
						background-color: #fff;
					}
				}
			}
		}
	}
</style>
