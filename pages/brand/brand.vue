<template>
	<view class="brand-detail" v-if="brandObj.data">
		<!-- 上半部分厂商介绍 -->
		<view class="brand-infos" v-if="brandObj.data">
			<!-- 厂商封面图 -->
			<view class="cover-brand w-100">
				<image class="img" :src="brandObj.data.list_pic_url"></image>
			</view>
			<!-- 厂商名字 -->
			<h4 class="p-10">{{brandObj.data.name}}</h4>
			<!-- 厂商简介 -->
			<view class="brand-desc f-s-13">
				{{brandObj.data.simple_desc}}
			</view>
			<!-- 厂商参考价 -->
			<view class="brand-price fl f-s-13 l-h-20">
				<!-- 参考文字 -->
				<view class="price-text">
					参考价:
				</view>
				<view class="price-num f-w f-s-18">
					￥{{brandObj.data.floor_price}}
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<h4 class="more-text t-center">该厂商相关商品</h4>
		<!-- 下半部分的厂商商品 -->
		<view class="bottom-content fl fl-w s-b" v-if="brandObj.goodsList.length>0">
			<view class="good-item m-t-10" v-for="(item,index) in brandObj.goodsList" :key="index">
				<commongood :commonObj="item"></commongood>
			</view>
		</view>
		<view class="bottom-content nones fl a-c f-center m-t-15 f-s-15" v-else>
			<view class="notice m-t-20 m-b-20 t-center">
				该厂商暂无商品数据展示~
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
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
				// 接收传过来的id
				brandId: null
			}
		},
		methods: {
			...mapActions(['getBrands']),
		},
		mounted() {
			if (this.brandId !== null) {
				this.getBrands(this.brandId)
			}
		},
		onLoad(option) {
			this.brandId = option.id
		},
		filters: {

		},
		computed: {
			...mapState(['brandObj'])
		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.brand-detail {
		background-color: #EEEEEE;

		.brand-infos {
			background-color: #fff;

			.cover-brand {
				height: 400rpx;
			}

			.brand-desc {
				padding: 0 20rpx 20rpx;
			}

			.brand-price {
				padding: 0 20rpx 20rpx;

				.price-num {
					color: #B4282D;
				}
			}
		}

		.more-text {
			padding: 30rpx 0;
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
