<template>
	<view class="history-content" v-if="hothistoryArr.length>0">
		<!-- 头部的标题和删除按钮 -->
		<view class="title-del fl s-b m-b-15">
			<!-- 左边的标题 -->
			<view class="titles f-s-13">
				{{headtitle}}
			</view>
			<!-- 右边的删除按钮 -->
			<view class="del-btn" v-if="headtitle === '搜索历史'" @click="deletes">
				<image class="img" src="../../static/delete.png"></image>
			</view>
		</view>
		<!-- 下面的内容层 -->
		<view class="history-mains fl fl-w">
			<!-- 搜索历史模板 -->
			<view class="history-model f-s-13 m-r-20 m-b-10" :class="[index === 0 && headtitle === '热门搜索'?'red-content':'']"
			 v-for="(item,index) in hothistoryArr" :key="index" @click="changeVal(item.keyword)">
				{{item.keyword}}
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
			hothistoryArr: {
				type: Array,
				default: () => []
			},
			headtitle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		methods: {
			// 点击历史记录或者热搜词
			changeVal(keys) {
				this.$emit('changeVal',keys)
			},
			// 点击删除搜索历史
			deletes(e) {
				this.$emit('deletes',e)
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
	.history-content {
		.title-del {
			.titles {}

			.del-btn {
				width: 30rpx;
				height: 30rpx;
				margin-top: -10rpx;
			}
		}

		// 历史记录内容层
		.history-mains {
			.history-model {
				padding: 4rpx 16rpx;
				border: 2rpx solid #ccc;
			}

			.red-content {
				color: #B4282D;
				border: 2rpx solid #B4282D;
			}
		}
	}
</style>
