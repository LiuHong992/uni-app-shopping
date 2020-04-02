<template>
	<view class="addressmodel-wrapper">
		<view class="addressmodel-content fl p-10 s-b">
			<!-- 左边的内容框 -->
			<view class="left-infos">
				<!-- 头部的姓名电话号码 -->
				<view class="name-phone fl a-c">
					<view class="address-name">
						{{addressmodel.name}}
					</view>
					<view class="address-phone m-l-10 f-s-15">
						{{addressmodel.mobile}}
					</view>
					<!-- 默认 -->
					<view class="defalut-address h-20 l-h-20 f-s-14 t-center m-l-5" v-if="addressmodel.is_default === 1">
						默认
					</view>
				</view>
				<!-- 下面的具体地址 -->
				<view class="address-info f-s-15 m-t-5 t-over">
					{{addressmodel.address}}{{addressmodel.address_detail}}
				</view>
			</view>
			<!-- 右边编辑按钮 -->
			<view class="right-editbtn-wrapper fl a-c">
				<view class="editbtn-cotent f-s-15" @click="goToEdit(addressmodel.id)">
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-ui/uni-icons/uni-icons.vue'
	export default {
		name: "",
		components: {
			uniIcons
		},
		props: {
			addressmodel: {
				type: Object,
				default: () => {}
			},
			buys: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
			// 跳转地址编辑页面
			goToEdit(idx) {
				if (this.buys === 0) {
					uni.navigateTo({
						url: `../../pages/addressedit/addressedit?id=${idx}`,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
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
	.addressmodel-wrapper {
		.addressmodel-content {

			.left-infos {
				max-width: 75vw;

				.name-phone {
					.defalut-address {
						padding: 0 16rpx;
						border-radius: 10rpx;
						background-color: #B4282D;
						color: #fff;
					}
				}
			}

			.right-editbtn-wrapper {
				.editbtn-cotent {
					// padding: 10rpx 20rpx;
					// border-radius: 10rpx;
					// color: #fff;
					// background-image: linear-gradient(to right, #FE5A33, #EF0E25);
				}
			}
		}
	}
</style>
