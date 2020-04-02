<template>
	<view class="my-wrapper">
		<!-- 头部的登录信息 -->
		<view class="head-userinfo-wrapper">
			<!-- 头部的内容层 -->
			<view class="head-userinfo-content fl s-b a-c">
				<!-- 左边的头像和账户名(登录状态) -->
				<view class="left-wrapper">
					<!-- 未登录时显示的内容层 -->
					<view class="image-username fl">
						<!-- 头像 -->
						<view class="defalut-image">
							<!-- 登录之后的头像 -->
							<image class="img" :src="userInfos.avatarUrl" v-if="userInfos.avatarUrl"></image>
							<!-- 未登录的头像 -->
							<image class="img" src="../../static/defalut-image.png" v-else></image>
						</view>
						<!-- 用户名(未登录时为点击登录) -->
						<view class="username m-l-15 fl a-c f-w" v-if="userInfos.nickName">
							{{userInfos.nickName}}
						</view>
						<view class="username m-l-15 fl a-c" v-else>
							<!-- #ifndef MP-WEIXIN -->
							<view class="login-byother" @click="logins">
								去登录
							</view>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<button open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true">去登录</button>
							<!-- #endif -->
						</view>
					</view>
				</view>
				<!-- 右边的更多按钮 -->
				<view class="right-more-wrapper">
					<view class="morebtn">
						<uni-icons type="arrowright" size="30" color="#fff"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 下面的内容层 -->
		<view class="bottom-wrapper">
			<my-nav></my-nav>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniIcons from '../../components/uni-ui/uni-icons/uni-icons.vue'
	import myNav from '../../components/my/mynav.vue'
	export default {
		name: "",
		components: {
			uniIcons,
			myNav
		},
		props: {},
		data() {
			return {
				// 接收用户信息的对象
				// userObj: {}
			}
		},
		methods: {
			...mapMutations(['setUserInfos', 'setLoginStatus']),
			// 微信授权
			getUserInfo(res) {
				let _t = this
				if (res.detail.signature) {
					uni.login({
						provider: 'weixin',
						success(loginRes) {
							// console.log(loginRes);
							// 获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success(infoRes) {
									if (infoRes) {
										_t.setUserInfos(infoRes.userInfo)
										_t.setLoginStatus(true)
										uni.setStorageSync('userInfo', JSON.stringify(infoRes.userInfo))
									}
								}
							});
						}
					});
				} else {
					uni.showModal({
						title: '特别提醒',
						content: '您已拒绝授权登录,可能无法正常使用该程序,请再次点击登录',
						showCancel: false,
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			// 其他登录方式
			logins() {
				let obj = {
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELSA0S3WbQhW5cdloTGVL7YULwQERDnSBOIpWEk839LP6ibbaDPyCUoracUPAmvZ4lbM7SibBsQBDrg/132",
					nickName: '可人'
				}
				this.setUserInfos(obj)
				this.setLoginStatus(true)
				uni.setStorageSync('userInfo', JSON.stringify(obj))
			},
		},
		mounted() {},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				this.setUserInfos(JSON.parse(uni.getStorageSync('userInfo')))
				this.setLoginStatus(true)
				// console.log(this.userInfos);
			}
		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['userInfos']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.my-wrapper {
		.head-userinfo-wrapper {
			.head-userinfo-content {
				background-color: #B4282D;
				padding: 80rpx 40rpx 40rpx;

				.left-wrapper {

					// 头像和登录信息
					.image-username {
						.defalut-image {
							width: 160rpx;
							height: 160rpx;
							border-radius: 50%;

							image {
								border-radius: 50%;
							}
						}

						.username {
							line-height: 160rpx;
							color: #fff;

							button {
								color: #fff;
								background-color: #B4282D;
							}
						}
					}
				}
			}
		}
	}
</style>
