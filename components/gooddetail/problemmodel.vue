<template>
	<view class="problem-models">
		<!-- 问题标题 -->
		<view class="problem-title fl a-c">
			<!-- 小红点 -->
			<uni-icons type="circle-filled" size="10" color="red"></uni-icons>
			<!-- 问题内容 -->
			<view class="problem-text f-s-14 l-h-30">
				{{problemmodel.question}}
			</view>
		</view>
		<!-- 回答框 -->
		<view class="answer-wrapper f-s-14">
			{{problemmodel.answer}}
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: "",
		components: {
			uniIcons
		},
		props: {
			problemmodel: {
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
	.answer-wrapper {
		color: #ccc;
	}

	.problem-text {
		margin-left: 10rpx;
	}
</style>
