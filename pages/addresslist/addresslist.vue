<template>
	<view class="address-wrapper p-r">
		<!-- 地址列表内容层(有地址列表时) -->
		<view class="address-content" v-if="addressArr.length>0">
			<!-- 地址模板 -->
			<view class="address-model" v-for="(item,index) in addressArr" :key="index" @click="chooseAddress(item)">
				<addressmodel :addressmodel="item"></addressmodel>
			</view>
		</view>
		<!-- 无地址列表时 -->
		<view class="address-content" v-else>
			<view class="nones-address fl f-center f-s-15 m-t-20">
				<view class="left-text">
					暂无地址,点击去
				</view>
				<view class="right-text" @click="goToAdd">
					添加
				</view>
			</view>
		</view>
		<!-- 新增地址 -->
		<view class="addbtns-wrapper w-100 p-a" @click="goToAdd">
			<view class="addbtns-content t-center f-s-15">
				新增地址
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import addressmodel from '../../components/address/addressmodel.vue'
	export default {
		name: "",
		components: {
			addressmodel
		},
		props: {},
		data() {
			return {
				// 接收openId
				openId: '',
				// 如果是跳转过来选择地址参数
				buyAddress: false
			}
		},
		methods: {
			...mapActions(['getAllAddresses']),
			...mapMutations(['setAddressObj']),
			// 没有地址列表时点击去添加
			goToAdd() {
				uni.navigateTo({
					url: '../addressedit/addressedit',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 选择地址
			chooseAddress(item) {
				if (this.buyAddress) {
					this.setAddressObj(item)
					uni.navigateBack({
						delta: 1
					});
				}
			}
		},
		mounted() {
			if (uni.getStorageSync('openId')) {
				this.openId = uni.getStorageSync('openId')
			}
			if (this.openId !== '') {
				this.getAllAddresses(this.openId)
			}
		},
		onShow() {
			if (this.openId !== '') {
				this.getAllAddresses(this.openId)
			}
		},
		onLoad(option) {
			if (option.buyAddress) {
				this.buyAddress = option.buyAddress
			}
		},
		filters: {

		},
		computed: {
			...mapState(['addressArr']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.address-wrapper {
		height: 100vh;
		/* #ifdef H5 */
		height: 94.4vh;

		/* #endif */
		.address-content {
			.address-model {
				border-bottom: 2rpx solid #ccc;

				&:last-child {
					border-bottom: none;
				}
			}

			.nones-address {
				.right-text {
					color: skyblue;
				}
			}
		}

		.addbtns-wrapper {
			bottom: 0;

			.addbtns-content {
				padding: 30rpx 0;
				color: #fff;
				background-color: #B4282D;
			}
		}
	}
</style>
