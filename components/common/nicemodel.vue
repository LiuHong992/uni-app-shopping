<template>
	<view class="nice-model w-100" @click="goToTopicD(nicemodel.id)">
		<!-- 封面图 -->
		<view class="nice-cover w-100">
			<image class="img" :src="nicemodel.scene_pic_url"></image>
		</view>
		<view v-if="topciNum===0">
			<!-- 专题名和价格 -->
			<view class="name-price fl m-t-10 f-s-15">
				<!-- 专题名 -->
				<view class="name t-over">
					{{nicemodel.title}}
				</view>
				<!-- 价格 -->
				<view class="price m-l-10">
					￥{{nicemodel.price_info}}起
				</view>
			</view>
			<!-- 简介 -->
			<view class="desc f-s-13 m-t-10 t-over">
				{{nicemodel.subtitle}}
			</view>
		</view>
		<view class="m-t-10 f-s-15" :class="[topciNum===3?'p-5':'']" v-else>
			<!-- 专题名 -->
			<view class="name t-over">
				{{nicemodel.title}}
			</view>
			<!-- 简介 -->
			<view class="desc f-s-13 m-t-10 t-over">
				{{nicemodel.subtitle}}
			</view>
			<!-- 价格 -->
			<view class="price m-t-10 f-s13" v-if="topciNum===2">
				￥{{nicemodel.price_info}}起
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			nicemodel: {
				type: Object,
				default: () => {}
			},
			// 用于判断是否是专题路由引用的组件
			topciNum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
			// 跳转专题详情页
			goToTopicD(id) {
				uni.navigateTo({
					url: `../../pages/topicdetail/topcidetail?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {

					}
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
	.nice-model {
		.nice-cover {
			min-width: 600rpx;
			height: 400rpx;
		}

		.name-price {
			.name {
				max-width: 83%;
			}
		}

		.price {
			color: #B4282D;
		}

		.desc {
			color: #ccc;
		}
	}
</style>
