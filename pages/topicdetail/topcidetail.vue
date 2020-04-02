<template>
	<view class="topic-detail" v-if="topicObj.id">
		<!-- 头部插入一个专题组件 -->
		<view class="head-topic">
			<nicemodel :nicemodel="topicObj" :topciNum="3"></nicemodel>
		</view>
		<!-- 阅读量 -->
		<view class="read-count m-t-10 fl l-h-20 m-b-10">
			<uni-icons class="m-l-5" type="eye-filled" size="14" color="#ccc"></uni-icons>
			<view class="read-num f-s-13">
				{{topicObj.read_count}}
			</view>
		</view>
		<!-- 富文本解析器 -->
		<view class="parse-con" v-if="topicObj.content">
			<!-- <view class="parses" v-html="topicObj.conten"></view> -->
			<jyf-parser :html="topicObj.content" ref="article"></jyf-parser>
			<!-- <u-parse :content="topicObj.content" @navigate="navigate"></u-parse> -->
		</view>
		<!-- 猜你感兴趣 -->
		<view class="guesslike">
			<!-- 头部 -->
			<h4 class="t-center m-t-10 m-b-10">猜你感兴趣</h4>
			<!-- 猜你感兴趣内容层 -->
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="scroll-view-item" v-for="(item,index) in topicRecArr" :key="index">
					<nicemodel :nicemodel="item"></nicemodel>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import nicemodel from '../../components/common/nicemodel.vue'
	import uniIcons from "../../components/uni-ui/uni-icons/uni-icons.vue"
	import jyfParser from "../../components/jyf-parser/jyf-parser.vue"
	// import uParse from "../../components/feng-parse/parse.vue"

	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "",
		components: {
			nicemodel,
			uniIcons,
			jyfParser,
			// uParse
		},
		props: {},
		data() {
			return {
				// 接收到的id
				topicId: ''
			}
		},
		methods: {
			...mapActions(['topicDetails']),
		},
		mounted() {

		},
		onLoad(option) {
			this.topicId = option.id
			if (this.topicId !== '') {
				this.topicDetails(this.topicId)
			}
		},
		filters: {

		},
		computed: {
			...mapState(['topicObj', 'topicRecArr']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.head-image {
		height: 400rpx;
	}

	.read-num {
		margin-left: 10rpx;
		color: #ccc;
	}

	.guesslike {
		.scroll-view_H {
			white-space: nowrap;

			.scroll-view-item {
				display: inline-block;
				padding: 20rpx 0 20rpx 20rpx;
				max-width: 600rpx;

				&:last-child {
					padding-right: 20rpx;
				}
			}
		}
	}
</style>
