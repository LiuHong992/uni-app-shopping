<template>
	<view class="param-wrapper w-100">
		<view class="param-content fl">
			<!-- 左边的参数名 -->
			<view class="param-name f-s-14">
				{{paramObj.name}}
			</view>
			<!-- 右边的参数值 -->
			<view class="param-value t-over f-s-15">
				{{paramObj.value}}
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
			paramObj: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		methods: {

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
	.param-wrapper {
		.param-content {
			padding: 16rpx 10rpx;
			background-color: #F7F7F7;

			.param-name {
				min-width: 140rpx;
				margin-right: 10rpx;
				color: #B5AFB7;
			}
		}
	}
</style>
