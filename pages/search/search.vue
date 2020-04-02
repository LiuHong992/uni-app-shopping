<template>
	<view class="search-wrapper">
		<!-- 头部的输入框 -->
		<view class="head-input-wrapper" v-if="historyHotObj.defaultKeyword">
			<uni-search-bar :radius="100" @input="startSearchs" @cancel="clears" @confirm="search" :placeholder="historyHotObj?`${historyHotObj.defaultKeyword.keyword}`:'请输入搜索关键词'"></uni-search-bar>
		</view>
		<!-- 搜索框内没内容时显示的内容层 -->
		<view class="no-searchval-wrapper" v-if="keyword.trim() === ''">
			<!-- 搜索历史 -->
			<view class="history-wrapper p-15" v-if="historyHotObj.historyData">
				<hotHistory :hothistoryArr="historyHotObj.historyData" headtitle="搜索历史" @changeVal="changeVal" @deletes="deletes"></hotHistory>
			</view>
			<!-- 热搜 -->
			<view class="hot-wrapper" v-if="historyHotObj.hotKeywordList">
				<hotHistory :hothistoryArr="historyHotObj.hotKeywordList" headtitle="热门搜索" @changeVal="changeVal"></hotHistory>
			</view>
		</view>
		<!-- 搜索框中有值之后显示的内容层 -->
		<view class="searchval-wrapper" v-else>
			<view class="searchval-content t-center f-s-14" v-if="searchArr.length === 0">
				暂无搜索内容~
			</view>
			<view class="searchval-content" v-else>
				<!-- 搜索出来的模板 -->
				<view class="search-model f-s-14" v-for="(item,index) in searchArr" :key="index" @click="goToGoodsDetail(item.id)">
					{{item.name}}
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
	import uniSearchBar from '../../components/uni-ui/uni-search-bar/uni-search-bar.vue'
	import hotHistory from '../../components/search/hothistory.vue'
	export default {
		name: "",
		components: {
			uniSearchBar,
			hotHistory
		},
		props: {},
		data() {
			return {
				// 接收storage中的openId
				openId: '',
				// 输入框的值
				keyword: ''
			}
		},
		methods: {
			...mapActions(['getHistory', 'startSearch', 'addHistorys', 'deleteHistorys']),
			// 搜索框方法
			search() {},
			// 搜索框值变化的方法
			startSearchs(e) {
				this.keyword = e.value
				if (this.keyword.trim() !== '') {
					this.startSearch(this.keyword)
				}
			},
			// 跳转详情页
			goToGoodsDetail(idx) {
				this.addHistorys({
					keyword: this.keyword,
					openId: this.openId
				})
				uni.navigateTo({
					url: `../goodsdetail/goodsdetail?id=${idx}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 子组件分发回父组件的方法
			changeVal(e) {
				this.keyword = e
				this.startSearch(this.keyword)
			},
			// 删除搜索记录
			deletes() {
				uni.showModal({
					content: '确定删除搜索历史吗?',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.deleteHistorys({
								openId: this.openId
							})
							uni.showToast({
								title: '删除成功'
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 取消按钮
			clears() {
				this.keyword = ''
			}
		},
		mounted() {

		},
		onShow() {
			if (uni.getStorageSync('openId')) {
				this.openId = uni.getStorageSync('openId')
				if (this.openId !== '') {
					this.getHistory(this.openId)
				}
			}
		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['historyHotObj', 'searchArr'])
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.search-wrapper {
		.head-input-wrapper {
			/* #ifdef MP-WEIXIN */
			padding: 20rpx;
			/* #endif */
		}

		.no-searchval-wrapper {

			// 搜索历史
			.history-wrapper {}

			.hot-wrapper {
				padding: 0rpx 30rpx;
			}
		}

		.searchval-wrapper {
			.searchval-content {
				padding: 0 30rpx;

				.search-model {
					padding: 30rpx 0;
					border-bottom: 2rpx solid #ccc;

				}
			}
		}
	}
</style>
