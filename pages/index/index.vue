<template>
	<view>
		<!-- 头部(定位和搜索框) -->
		<view class="index-head sticky z-99">
			<index-header></index-header>
		</view>
		<!-- 轮播图 -->
		<view class="banner-item">
			<banners :bannerArr="indexObj.banner"></banners>
		</view>
		<!-- 导航栏 -->
		<view class="nav-bar p-15 m-t-10">
			<navbar :navbarArr="indexObj.channel"></navbar>
		</view>
		<!-- 制造商直供 -->
		<view class="factorys m-b-20">
			<!-- 头部 -->
			<h4 class="t-center m-t-10 m-b-10">品牌制造商直供</h4>
			<!-- 内容层 -->
			<view class="factory-content fl fl-w">
				<!-- 模板 -->
				<view class="item-model" v-for="(item,index) in indexObj.brandList" :key="index">
					<fmodel :famodel="item"></fmodel>
				</view>
			</view>
		</view>
		<!-- 新品首发 -->
		<view class="newgoods m-b-20">
			<newrecommend :nrArr="indexObj.newGoods" titlename="新品首发" bgcolor="#F1F7FC" btnbg="#D8E4F0"></newrecommend>
		</view>
		<!-- 人气推荐 -->
		<view class="recommend m-b-20">
			<newrecommend :nrArr="indexObj.hotGoods" titlename="人气推荐·好物精选" bgcolor="#FCF4DD" btnbg="#F3E9CB"></newrecommend>
		</view>
		<!-- 专题精选 -->
		<view class="topic-nice">
			<!-- 头部 -->
			<h4 class="t-center m-t-10 m-b-10">专题精选</h4>
			<!-- 专题精选内容层 -->
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="scroll-view-item" v-for="(item,index) in indexObj.topicList" :key="index">
					<nicemodel :nicemodel="item"></nicemodel>
				</view>
			</scroll-view>
		</view>
		<!-- 相关推荐内容 -->
		<view class="more-rec" v-for="(item,index) in indexObj.newCategoryList" :key="index">
			<moremodel :moreObj="item"></moremodel>
		</view>
	</view>
</template>

<script>
	import indexHeader from '../../components/index/indexheader.vue'
	import banners from '../../components/index/banner.vue'
	import navbar from '../../components/index/navbar.vue'
	import fmodel from '../../components/index/factorymodel.vue'
	import newrecommend from '../../components/index/newrecommend.vue'
	import nicemodel from '../../components/common/nicemodel.vue'
	import moremodel from '../../components/index/moremodel.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "",
		components: {
			indexHeader,
			banners,
			navbar,
			fmodel,
			newrecommend,
			nicemodel,
			moremodel
		},
		props: {},
		data() {
			return {}
		},
		methods: {
			...mapActions(['getIndexs']),
		},
		onShow() {
			this.getIndexs()
		},
		mounted() {

		},
		onLoad() {

		},
		filters: {

		},
		computed: {
			...mapState(['indexObj']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.banner-item {
		height: 400rpx !important;
	}

	.item-model {
		width: 44.65%;
		height: 280rpx;
		margin: 20rpx 20rpx 0;
	}

	.topic-nice {
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
