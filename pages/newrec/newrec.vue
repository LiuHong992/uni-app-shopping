<template>
	<view class="newrec-content">
		<!-- 一张封面图 -->
		<view class="covers w-100">
			<image class="img" src="../../static/moreGoodsBg.jpg" mode=""></image>
		</view>
		<!-- 导航栏 -->
		<view class="newrec-nav fl t-center f-s-14 m-b-10">
			<!-- 综合排序 -->
			<view class="multiple f-1" :class="[navNum === 0?'active-nav':'']" @click="changeRank(0)">
				综合
			</view>
			<!-- 价格排序 -->
			<view class="price f-1 fl a-c f-center">
				<view class="fl m-auto">
					<view class="texts" :class="[navNum === 1?'active-nav':'']" @click.stop="changeRank(1)">
						价格
					</view>
					<view class="up-down fl">
						<uni-icons class="icon-one" type="arrowup" size="14" :color="navNum===1 && sort===0?'#B4282D':''" @click="upSort(0)"></uni-icons>
						<uni-icons type="arrowdown" size="14" :color="navNum===1 && sort===1?'#B4282D':''" @click="upSort(1)"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 分类排序 -->
			<view class="multiple f-1" :class="[navNum === 2?'active-nav':'']" @click="changeRank(2)">
				分类
			</view>
		</view>
		<!-- 内容层 -->
		<view class="content fl fl-w">
			<view class="item-model m-b-10 m-l-5 m-r-5" v-for="(item,index) in newRecArr" :key="index">
				<commongood :commonObj="item"></commongood>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../components/uni-icons/uni-icons.vue"
	import commongood from '../../components/common/commongood.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "",
		components: {
			uniIcons,
			commongood
		},
		props: {},
		data() {
			return {
				// 接收传过来的type
				type: '',
				// 升序还是降序
				order: '',
				// 控制导航栏变色的参数
				navNum: 0,
				// 控制升序降序的参数
				sort: 0
			}
		},
		methods: {
			...mapActions(['getNewRec']),
			// 更改排序方式
			changeRank(num) {
				this.navNum = num
				this.sort = 0
				this.order = ''
				if (this.navNum === 1) {
					this.order = 'asc'
				}
				this.getNewRec({
					type: this.type,
					order: this.order
				})
			},
			// 更改升序降序
			upSort(sortNum) {
				this.sort = sortNum
				if (this.sort === 0) {
					this.order = 'asc'
				} else {
					this.order = 'desc'
				}
				this.getNewRec({
					type: this.type,
					order: this.order
				})
			}
		},
		mounted() {
			if (this.type !== '') {
				this.getNewRec({
					type: this.type,
					order: this.order
				})
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		filters: {

		},
		computed: {
			...mapState(['newRecArr']),
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.newrec-content {
		background-color: #EEEEEE;

		.covers {
			height: 360rpx;
		}

		.newrec-nav {
			// padding: 30rpx 0;
			background-color: #fff;

			.multiple {
				line-height: 80rpx;
			}

			.price {
				.texts {
					line-height: 80rpx;
				}

				.up-down {
					flex-direction: column;
					margin-left: 10rpx;

					.icon-one {
						margin-top: 10rpx;
					}
				}
			}

			.active-nav {
				color: #B4282D;
			}
		}

		.content {
			.item-model {
				width: 47.3%;
				background-color: #fff;
			}
		}
	}
</style>
