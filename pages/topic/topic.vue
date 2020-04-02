<template>
	<view class="topics">
		<view class="model-item m-b-20" v-for="(item,index) in topicArr" :key="index">
			<nicemodel :nicemodel="item" :topciNum="2"></nicemodel>
		</view>
	</view>
</template>

<script>
	import nicemodel from '../../components/common/nicemodel.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "",
		components: {
			nicemodel
		},
		props: {},
		data() {
			return {
				// 分页
				page: 1
			}
		},
		methods: {
			...mapActions(['getTopics']),
		},
		mounted() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
			uni.showLoading({
				title: '加载中...'
			});
			this.getTopics(this.page)
		},
		onShow() {},
		onLoad() {

		},
		onReachBottom() {
			if (this.topicArr.length === 20) {
				uni.showToast({
					title: '暂无更多资源~',
					icon: 'none'
				});
			} else {
				uni.showLoading({
					title: '加载中...'
				});
				this.page++
				this.getTopics(this.page)
			}
		},
		filters: {

		},
		computed: {
			...mapState(['topicArr']),
		},
		watch: {},
		directives: {

		}
	}
</script>

<style scoped lang="scss">

</style>
