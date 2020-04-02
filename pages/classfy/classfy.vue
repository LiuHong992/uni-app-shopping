<template>
	<view class="classfy">
		<!-- 头部的搜索框 -->
		<view class="head-input">
			<uni-search-bar v-model="cValue" :radius="100" placeholder="请输入关键词" cancelButton="none" @confirm="search"></uni-search-bar>
		</view>
		<!-- 中间的分类内容层 -->
		<view class="classfy-content fl">
			<!-- 左边的分类竖向导航栏 -->
			<view class="vertical-nav fl" v-if="bigClassfy.length>0">
				<!-- 导航栏模板 -->
				<view class="nav-item t-center b-box t-center f-s-15" :class="[navNum === index?'active-nav':'']" v-for="(item,index) in bigClassfy"
				 :key="index" @click="changeBig(index,item.id)">
					{{item.name}}
				</view>
			</view>
			<!-- 右边的内容层 -->
			<view class="right-content">
				<!-- 顶部的图片 -->
				<view class="top-image p-r">
					<image class="img" :src="littleObj.wap_banner_url"></image>
					<!-- 图片上的文字 -->
					<view class="image-text p-a f-s-14">
						{{littleObj.front_name}}
					</view>
				</view>
				<!-- 小标题 -->
				<view class="little-title t-center fl f-s-14 f-center">
					<view class="lines">
						——
					</view>
					<view class="title-name">
						{{littleObj.name}}分类
					</view>
					<view class="lines">
						——
					</view>
				</view>
				<!-- 下方具体小分类内容层 -->
				<view class="little-classfy-content fl fl-w">
					<!-- 小分类模板 -->
					<view class="little-classfy-model" v-for="(item,index) in littleObj.subList" :key="index" @click="goToClassfyD(item.id)">
						<!-- 上面的封面图 -->
						<view class="cover">
							<image class="img" :src="item.wap_banner_url"></image>
						</view>
						<!-- 下面的分类名 -->
						<view class="classfy-name t-center f-s-14">
							{{item.name}}
						</view>
					</view>
				</view>
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
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		name: "",
		components: {
			uniSearchBar
		},
		props: {},
		data() {
			return {
				cValue: '',
				// 给导航栏添加样式的参数
				navNum: 0,
				// 请求小分类的id
				bigid: null
			}
		},
		methods: {
			...mapActions(['getBigClassfy', 'getSmallClassfy']),
			...mapMutations(['setBigId']),
			// 搜索框方法
			search() {

			},
			// 改变大分类时的方法
			changeBig(idx, id) {
				this.navNum = idx
				this.bigid = id
				this.setBigId(id)
				if (this.bigId) {
					this.getSmallClassfy(this.bigId)
				}
			},
			// 点击小分类跳转分类详情页
			goToClassfyD(detailId) {
				uni.navigateTo({
					url: `../classfydetail/classfydetail?id=${detailId}&bigid=${this.bigid}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		mounted() {
			this.getBigClassfy()
			setTimeout(() => {
				this.bigid = this.bigId
			}, 200)
		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['bigClassfy', 'bigId', 'littleObj']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.classfy {
		height: 100vh;

		/* #ifdef H5 */
		height: 93.84vh;
		/* #endif */

		.head-input {
			padding: 16rpx 24rpx;
		}

		.classfy-content {
			/* #ifdef APP-PLUS */
			// height: 91vh;
			/* #endif */

			/* #ifdef MP-WEIXIN */
			// height: 88.6vh;
			/* #endif */

			/* #ifdef H5 */
			// height: 85.5vh;
			/* #endif */

			.vertical-nav {
				flex-direction: column;

				.nav-item {
					width: 160rpx;
					height: 100rpx;
					line-height: 100rpx;
				}

				// 选中时的导航栏样式
				.active-nav {
					border-left: 6rpx solid #B4282D;
					color: #b4282d;
					font-size: 34rpx;
				}
			}

			.right-content {
				width: 89vw;

				.top-image {
					height: 250rpx;
					padding: 20rpx 26rpx;
				}

				.image-text {
					top: 126rpx;
					left: 200rpx;
					color: #fff;
				}

				.little-title {
					margin: 16rpx 0;

					.lines {
						color: #ccc;
					}

					.title-name {
						margin: 0 10rpx;
					}
				}

				.little-classfy-content {
					.little-classfy-model {
						width: 30%;
						margin-right: 20rpx;
						margin-bottom: 20rpx;

						&:nth-child(3n) {
							margin-right: 0;
						}

						.cover {
							width: 100%;
							height: 180rpx;
						}
					}
				}
			}
		}
	}
</style>
