<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=8bdaea4cfdb6844c73a08010176ae4be"></script>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import QQMapWX from 'static/js/qqmap-wx-jssdk.min.js'
	export default {
		onLaunch: function() {
			let openId = 'liuhong'
			uni.setStorageSync('openId', openId)
			this.chooseLocation()
		},
		methods: {
			...mapMutations(['setLocation']),
			//打开地图
			chooseLocation() {
				// 首先拉取地址授权(小程序端)
				let _t = this
				// #ifdef MP-WEIXIN
				const qqmapsdk = new QQMapWX({
					key: "CJJBZ-VNX6X-YAF4B-7LGVY-UR4XK-UMBOE"
				});
				uni.authorize({
					scope: 'scope.userLocation',
					success(res) {
						uni.getLocation({
							type: 'gcj02',
							geocode: true,
							success(res) {
								const {
									latitude,
									longitude
								} = res;
								const location = {
									latitude,
									longitude
								};
								qqmapsdk.reverseGeocoder({
									location,
									success: res => {
										_t.setLocation(res.result.address)
									}
								})
							}
						})
					},
					fail(err) {
						uni.showModal({
							title: '特别提醒',
							content: '若不授权，则无法正常使用该程序',
							cancelText: '取消',
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									//打开授权设置
									uni.openSetting({
										success(res) {
											let flag = res.authSetting['scope.userLocation']
											if (flag) {
												uni.getLocation({
													type: 'gcj02',
													success(res) {
														console.log(res);
														const {
															latitude,
															longitude
														} = res;
														const location = {
															latitude,
															longitude
														};
														qqmapsdk.reverseGeocoder({
															location,
															success: res => {
																_t.setLocation(res.result.address)
															}
														})
													}
												})
											} else {
												_t.repeatChoose()
											}
										}
									})
								} else {
									_t.repeatChoose()
								}
							}
						})
					}
				})
				// #endif
				// #ifdef APP-PLUS
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {
						let detail = `${res.address.city}${res.address.poiName}`
						_t.setLocation(detail)
					},
					fail(err) {
						console.log(err);
					}
				})
				// #endif
			},
			repeatChoose() {
				this.chooseLocation()
			}
		},
		computed: {
			...mapState(['locations']),
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/common.css");
</style>
