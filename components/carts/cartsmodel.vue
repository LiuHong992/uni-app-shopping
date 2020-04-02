<template>
	<view class="carts-model-wrapper">
		<view class="carts-model-content fl s-b f-s-15">
			<!-- 左边的商品图片商品价格和名字 -->
			<view class="left-infos fl">
				<!-- 封面图 -->
				<view class="cover-image">
					<image class="img" :src="cartsmodel.list_pic_url"></image>
				</view>
				<!-- 右边的商品名和价格 -->
				<view class="name-price fl f-center m-l-10">
					<!-- 商品名 -->
					<view class="goods-name t-over">
						{{cartsmodel.goods_name || cartsmodel.name}}
					</view>
					<!-- 价格 -->
					<view class="goods-price m-t-5">
						￥{{cartsmodel.retail_price}}
					</view>
				</view>
			</view>
			<!-- 右边的件数 -->
			<view class="right-nums fl a-c">
				<view class="nums" v-if="payNum===0">
					x{{cartsmodel.number}}
				</view>
				<view class="nums" v-else>
					x{{payNum}}
				</view>
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
			cartsmodel: {
				type: Object,
				default: () => {}
			},
			payNum: {
				type: Number,
				default: 0
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
	.carts-model-wrapper {
		.carts-model-content {
			.left-infos {
				.cover-image {
					width: 160rpx;
					height: 160rpx;
					background-color: #F4F4F4;
				}

				.name-price {
					flex-direction: column;

					.goods-name {
						max-width: 300rpx;
					}
				}
			}
		}
	}
</style>
