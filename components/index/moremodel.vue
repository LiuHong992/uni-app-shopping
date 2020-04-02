<template>
	<view class="more-model" v-if="moreObj.id">
		<!-- 标题 -->
		<view class="title t-center m-t-20">
			{{moreObj.name}}
		</view>
		<!-- 内容层 -->
		<view class="more-content fl fl-w p-10 s-b b-box">
			<!-- 模板 -->
			<view class="model-item m-b-20" v-for="(item,index) in moreObj.goodsList" :key="index">
				<commongood :commonObj="item"></commongood>
			</view>
			<!-- 跳转更多信息 -->
			<view class="model-item m-b-20 fl a-c f-center">
				<view class="more-box fl" @click="goToCatogray">
					<!-- 标题名 -->
					<view class="title-name f-s-14">
						{{moreObj.name}}
					</view>
					<!-- 按钮 -->
					<view class="gobtn t-center f-s-12">
						>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commongood from '../common/commongood.vue'
	export default {
		name: "",
		components: {
			commongood
		},
		props: {
			moreObj: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 跳转对应的导航
			goToCatogray() {
				
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
	.more-model {
		overflow: hidden;
		background-color: #EEEEEE;

		.title {
			padding-bottom: 40rpx;
		}
	}

	.model-item {
		width: 48%;
		background-color: #fff;

		.title-name {
			line-height: 38rpx;
		}

		.gobtn {
			width: 40rpx;
			height: 40rpx;
			margin-left: 16rpx;
			line-height: 36rpx;
			border-radius: 50%;
			border: 2rpx solid #ccc;
		}
	}
</style>
