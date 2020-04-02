<template>
	<view class="nav-content fl fl-w w-100">
		<!-- 导航模板 -->
		<view class="nav-model-wrapper b-box fl a-c f-center" v-for="(item,index) in navArr" :key="index">
			<view class="nav-model-content" @click="goToPath(item.path)">
				<!-- 头部的图片 -->
				<view class="nav-image m-auto">
					<image class="img" :src="item.imageUrl"></image>
				</view>
				<!-- 下方的文字 -->
				<view class="nav-text f-s-15 m-t-5">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				// 导航栏数据
				navArr: [{
						imageUrl: '../../static/order.png',
						text: '我的订单',
						path: ''
					},
					{
						imageUrl: '../../static/coupon.png',
						text: '优惠券',
						path: ''
					},
					{
						imageUrl: '../../static/giftcard.png',
						text: '礼品卡',
						path: ''
					},
					{
						imageUrl: '../../static/mycollect.png',
						text: '我的收藏',
						path: '../../pages/collect/collect'
					},
					{
						imageUrl: '../../static/foot.png',
						text: '我的足迹',
						path: '../../pages/history/history'
					},
					{
						imageUrl: '../../static/vip.png',
						text: '会员福利',
						path: ''
					},
					{
						imageUrl: '../../static/address.png',
						text: '地址管理',
						path: '../../pages/addresslist/addresslist'
					},
					{
						imageUrl: '../../static/security.png',
						text: '账号安全',
						path: ''
					},
					{
						imageUrl: '../../static/service.png',
						text: '联系客服',
						path: ''
					},
					{
						imageUrl: '../../static/help.png',
						text: '帮助中心',
						path: ''
					},
					{
						imageUrl: '../../static/feedback.png',
						text: '意见反馈',
						path: '../../pages/feedback/feedback'
					},
				]
			}
		},
		methods: {
			...mapMutations(['setLoginStatus']),
			// 跳转相应路由
			goToPath(paths) {
				if (this.loginStatus) {
					if (paths !== '') {
						uni.navigateTo({
							url: paths,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else {
						uni.showToast({
							title: '该功能暂未开发,敬请期待',
							icon: "none"
						});
					}
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
			}
		},
		mounted() {},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				this.setLoginStatus(true)
				console.log(this.loginFlag);
			}
		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['loginStatus']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.nav-content {
		.nav-model-wrapper {
			width: 33.3%;
			padding: 60rpx 0;
			border-bottom: 2rpx solid #ccc;
			border-right: 2rpx solid #ccc;

			&:nth-child(10),
			&:nth-child(11) {
				border-bottom: none;
			}

			&:nth-child(3n) {
				border-right: none;
			}

			.nav-model-content {

				// 导航图片
				.nav-image {
					width: 72rpx;
					height: 72rpx;
				}

				.nav-text {
					color: #666666;
				}
			}
		}
	}
</style>
