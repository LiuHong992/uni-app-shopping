<template>
	<view class="nav-title fl s-a">
		<!-- 标题模板 -->
		<view class="title-model fl f-s-13" v-for="(item,index) in navArr" :key="index">
			<view class="point">
				<uni-icons type="circle" size="10" color="red"></uni-icons>
			</view>
			<!-- 文字内容 -->
			<view class="title-text l-h-20">
				{{item.title}}
			</view>
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
		props: {},
		data() {
			return {
				navArr: [{
						title: '30天无忧退货'
					},
					{
						title: '48小时快速退款'
					},
					{
						title: '满88元包邮'
					}
				]
			}
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
	.nav-title {
		padding: 30rpx 0;
		background-color: #EEEEEE;

		.title-model {
			.point {
				margin-right: 6rpx;
			}
		}
	}
</style>
