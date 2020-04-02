<template>
	<view class="swipers">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="(item,index) in bannerArr" :key="index">
				<image class="img" :src="item.image_url || item.img_url"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			bannerArr: {
				type: Array,
				default: () => []
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
	.swipers {
		height: 100%;

		.swiper {
			height: 100%;
		}
	}
</style>
