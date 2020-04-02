<template>
	<view class="content">
		<!-- 头部标题 -->
		<view class="title-content a-c fl f-center t-center" :style="{'background-color':bgcolor}">
			<view class="titles">
				<view class="title-name">
					{{titlename}}
				</view>
				<!-- 查看更多按钮 -->
				<view class="more t-center b-box" :style="{'background-color':btnbg}" @click="goToMore">
					查看更多
				</view>
			</view>
		</view>
		<!-- 内容层(scroll-view) -->
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view class="scroll-view-item_H" v-for="(item,index) in nrArr" :key="index">
				<!-- 模板 -->
				<ncmodel :ncmodel="item"></ncmodel>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import ncmodel from '../common/ncmodel.vue'
	export default {
		name: "",
		components: {
			ncmodel,
		},
		props: {
			nrArr: {
				type: Array,
				default: () => []
			},
			titlename: {
				type: String,
				default: ''
			},
			bgcolor: {
				type: String,
				default: ''
			},
			btnbg: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		methods: {
			// 带参数跳转到新品页面或者人气推荐
			goToMore() {
				let type = ''
				if (this.titlename === '新品首发') {
					type = 'isNew'
				} else {
					type = 'isHot'
				}
				uni.navigateTo({
					url: `../../pages/newrec/newrec?type=${type}`,
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
	.content {
		.title-content {
			height: 320rpx;
			color: #C7C4A5;

			.title-name {}

			.more {
				font-size: 26rpx;
				width: 200rpx;
				margin: 20rpx auto 0;
				padding: 10rpx 30rpx;
			}
		}

		// 内容层
		.scroll-view_H {
			white-space: nowrap;

			.scroll-view-item_H {
				display: inline-block;
			}
		}
	}
</style>
