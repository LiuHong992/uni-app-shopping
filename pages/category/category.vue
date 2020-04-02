<template>
	<view class="category-content" v-if="smallObj.currentNav">
		<!-- 头部的导航栏(scroll-view) -->
		<scroll-view class="scroll-view_H" scroll-x="true" :scroll-into-view="nameId">
			<view :id="`L2${item.id}`" class="scroll-view-item" v-for="(item,index) in bigClassfy" :key="index" @click="changeSmall(item.id)">
				<view class="items p-10 t-center f-s-14" :class="[currentId == item.id?'active-nav':'']">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 头部标题 -->
		<view class="head-titles fl a-c f-center m-t-10" v-if="smallObj.currentNav">
			<!-- 内容盒子 -->
			<view class="content-box t-center">
				<!-- 分类名 -->
				<view class="title-name f-s-15">
					{{smallObj.currentNav.name}}
				</view>
				<!-- 小tips -->
				<view class="small-tips f-s-13 m-t-15 m-b-15">
					{{smallObj.currentNav.front_desc}}
				</view>
			</view>
		</view>
		<!-- 最下面的内容层 -->
		<view class="bottom-content fl fl-w s-b" v-if="smallObj.data.length>0">
			<view class="good-item m-t-10" v-for="(item,index) in smallObj.data" :key="index">
				<commongood :commonObj="item"></commongood>
			</view>
		</view>
		<view class="bottom-content nones fl a-c f-center m-t-15 f-s-15" v-else>
			<view class="notice m-t-20 m-b-20 t-center">
				暂无此类商品~
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import commongood from '../../components/common/commongood.vue'
	export default {
		name: "",
		components: {
			commongood
		},
		props: {},
		data() {
			return {
				// scroll-view参数
				nameId: null,
				// 用于接收从首页跳过来时接收到的id
				currentId: null
			}
		},
		methods: {
			...mapActions(['getBigClassfy', 'getSmallGoods']),
			// 点击导航栏小类触发的方法
			changeSmall(sid) {
				this.currentId = sid
				this.getSmallGoods(this.currentId)
			}
		},
		mounted() {
			this.getBigClassfy()
			if (this.currentId !== null) {
				this.getSmallGoods(this.currentId)
			}
		},
		onLoad(option) {
			this.currentId = option.id
			this.nameId = "L2" + option.id
		},
		filters: {

		},
		computed: {
			...mapState(['bigClassfy', 'smallObj']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.category-content {
		background-color: #EEEEEE;

		.scroll-view_H {
			/* #ifndef H5 */
			position: sticky;
			top: 0;
			/* #endif */
			z-index: 99;
			white-space: nowrap;
			background-color: #fff;

			.scroll-view-item {
				display: inline-block;

				.items {
					margin: 0 20rpx;
				}

				// 选中时的导航栏样式
				.active-nav {
					border-bottom: 4rpx solid #B4282D;
					color: #b4282d;
				}
			}
		}

		.head-titles {
			background-color: #fff;

			.content-box {
				.title-name {
					padding-top: 30rpx;
				}

				.small-tips {
					color: #999;
				}
			}
		}

		.bottom-content {
			.good-item {
				width: 49%;
				background-color: #fff;
			}
		}

		.nones {
			background-color: #fff;
		}
	}
</style>
