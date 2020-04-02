<template>
	<view class="address-edit-wrapper p-r">
		<!-- 地址编辑 -->
		<view class="address-edit-content">
			<!-- 上方的地址表单 -->
			<view class="top-form">
				<!-- 姓名 -->
				<view class="common-ipt">
					<input type="text" :value="addressObj.userName" @input="changeName" placeholder="姓名" />
				</view>
				<!-- 电话号码 -->
				<view class="common-ipt">
					<input type="number" @input="changeNum" :value="addressObj.telNumber" placeholder="手机号码" />
				</view>
				<!-- 省市区 -->
				<pick-regions :default-regions="nowAdress" @getRegions="handleGetRegions">
					<view class="common-ipt">
						<input type="text" :value="addressObj.address" placeholder="省份,城市,区县" />
					</view>
				</pick-regions>
				<!-- 地址详情 -->
				<view class="common-ipt">
					<input type="text" :value="addressObj.detailadress" @input="changeDetail" placeholder="详细地址,如楼道,楼盘号等" />
				</view>
				<!-- 默认地址 -->
				<view class="default-address fl s-b m-t-20 f-s-15">
					<view class="defaults">
						<label @click="changeFlag">
							<checkbox :checked="addressObj.checked" /><text>设置为默认地址</text>
						</label>
					</view>
					<!-- 一键导入微信 -->
					<view class="addWX">
						一键导入微信>
					</view>
				</view>
			</view>
			<!-- 底部的保存按钮 -->
			<view class="savebtn-wrapper w-100 p-a">
				<view class="savebtn-content t-center" @click="saveAddress">
					保存
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
	// import area from '../../static/js/area.js'
	import pickRegions from '../../components/pick-regions/pick-regions.vue'
	export default {
		name: "",
		components: {
			pickRegions
		},
		props: {},
		data() {
			return {
				nowAdress: [],
				addressObj: {
					// 用户名
					userName: '',
					// 电话号码
					telNumber: '',
					// 省市区
					address: '',
					// 地址详情
					detailadress: '',
					// 地址码
					addressId: '',
					// 默认地址
					checked: false,
					// openId
					openId: ''
				}
			}
		},
		methods: {
			...mapActions(['addAddresses', 'getOnAddresses']),
			// 姓名输入框input
			changeName(e) {
				this.addressObj.userName = e.detail.value
			},
			// 手机号码输入框input事件
			changeNum(e) {
				this.addressObj.telNumber = e.detail.value
			},
			// 详细地址输入框imput事件
			changeDetail(e) {
				this.addressObj.detailadress = e.detail.value
			},
			// 多选框点击事件
			changeFlag() {
				this.addressObj.checked = !this.addressObj.checked
			},
			// 地区选择器
			handleGetRegions(regions) {
				this.nowAdress = regions
				this.addressObj.address = this.nowAdress.map(item => item.name).join('')
			},
			// 保存按钮
			saveAddress() {
				if (this.addressObj.userName !== '' && this.addressObj.telNumber !== '' && this.addressObj.address !== '' && this.addressObj
					.detailadress !== '') {
					this.addAddresses(this.addressObj)
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.showToast({
						title: '请将地址填写完善',
						icon: "none"
					});
				}
			}
		},
		mounted() {
			if (uni.getStorageSync('openId')) {
				this.addressObj.openId = uni.getStorageSync('openId')
			}
		},
		onLoad(option) {
			if (option.id) {
				this.addressObj.addressId = option.id
				this.getOnAddresses(this.addressObj.addressId).then(res => {
					let addresses = res.data.data
					this.addressObj = {
						userName: addresses.name,
						telNumber: addresses.mobile,
						address: addresses.address,
						detailadress: addresses.address_detail,
						addressId: option.id,
						checked: Boolean(addresses.is_default),
						openId: uni.getStorageSync('openId')
					}
				})
			}
		},
		filters: {

		},
		computed: {
			regionsName() {
				// 转为字符串
				return this.nowAdress.map(item => item.name).join(' ')
			}
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.address-edit-wrapper {
		height: 100vh;
		/* #ifdef H5 */
		height: 93vh;

		/* #endif */
		.address-edit-content {
			.top-form {
				padding: 0 30rpx 0;

				.common-ipt {
					padding: 30rpx 0;
					border-bottom: 2rpx solid #ccc;
				}

				.default-address {
					.addWX {
						color: green;
					}
				}
			}

			.savebtn-wrapper {
				bottom: 0;

				.savebtn-content {
					padding: 30rpx 0;
					background-color: #B4282D;
					color: #fff;
				}
			}
		}
	}
</style>
