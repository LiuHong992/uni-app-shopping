import http from './http.js'
const url = 'http://49.233.66.125:1234/'

export default {
	// 首页相关接口
	// 请求首页的数据
	getIndex() {
		return http.get(`${url}index/index`)
	},
	// 首页制造商详情
	// 此处的id为制造商的id
	getBrand(id) {
		return http.get(`${url}brand/detailaction?id=${id}`)
	},
	// 专题
	getTopic(page) {
		return http.get(`${url}topic/listaction?page=${page}`)
	},
	// 分类
	// 分类列表
	getClassfy() {
		return http.get(`${url}category/indexaction`)
	},
	// 查看全部新品:默认综合（全部新品分类排列也用这个接口）
	// lookAllNew() {
	// 	return http.get(`${url}goods/goodsList?isNew=1`)
	// },
	// 全部新品升(降)序排列
	// 升序还是降序根据所传的order来决定
	// isNew:新品 isHot:人气推荐  /* type*/
	// asc:升序,desc:降序 /* order*/
	newGoodRank({type, order}) {
		return http.get(`${url}goods/goodsList?${type}=1&order=${order}`)
	},
	// 查看全部人气推荐:默认综合(人气推荐分类排列也用这个接口)
	// lookAllRec() {
	// 	return http.get(`${url}goods/goodsList?isHot=1`)
	// },
	// 全部人气推荐升(降)序排列
	// 升序还是降序根据所传的order来决定
	// asc:升序,desc:降序
	// newRecRank(order) {
	// 	return http.get(`${url}goods/goodsList?isHot=1&order=${order}`)
	// },
	// 当前分类
	// 此处的id为分类id
	getCurrentClassfy(id) {
		return http.get(`${url}category/currentaction?id=${id}`)
	},
	// 首页分类导航
	// 此处的id为分类导航的id
	getClassfyNav(id) {
		return http.get(`${url}goods/goodsList?id=${id}`)
	},
	// 分类导航商品列表
	// 此处的categoryId为分类导航id
	getNavGoodList(categoryId) {
		return http.get(`${url}goods/goodsList?categoryId=${categoryId}`)
	},
	// 搜索相关
	// 热门搜索(搜索历史)
	getHotSearch(openId) {
		return http.get(`${url}search/indexaction?openId=${openId}`)
	},
	// 添加搜索历史
	// post请求
	addHistory({
		keyword,
		openId
	}) {
		return http.post(`${url}search/addhistoryaction`, {
			keyword,
			openId
		})
	},
	// 清空搜索记录
	// post请求
	deleteHistory({
		openId
	}) {
		return http.post(`${url}search/clearhistoryAction`, {
			openId
		})
	},
	// 关键词搜索
	// keyword:搜索关键词
	searchValue(keyword) {
		return http.get(`${url}search/helperaction?keyword=${keyword}`)
	},

	// 跳转详情相关接口

	// 查看商品详情
	// id:商品id openId:生成的openId
	goodsDetail({id, openId}) {
		return http.get(`${url}goods/detailaction?id=${id}&openId=${openId}`)
	},
	// 查看专题详情
	// id:专题id
	topicDetail(id) {
		return http.get(`${url}topic/detailaction?id=${id}`)
	},

	// 收藏接口

	// 加入收藏,商品详情接口会返回是否收藏
	// post请求
	// goodsId:商品id openId:生成的openId
	addCollect({
		goodsId,
		openId
	}) {
		return http.post(`${url}collect/addcollect`, {
			goodsId,
			openId
		})
	},
	// 查看收藏
	// openId:生成的openId
	lookCollect(openId) {
		return http.get(`${url}collect/listAction?openId=${openId}`)
	},

	// 购买接口

	// 立即购买
	// post请求
	// allPrise:总价 goodsId:商品id openId:生成的openId
	buyRightNow({
		allPrise,
		goodsId,
		openId
	}) {
		return http.post(`${url}order/submitAction`, {
			allPrise,
			goodsId,
			openId
		})
	},
	// 购买详情
	// openId:生成的openId addressId:地址id
	orderDetail() {
		return http.get(`${url}order/detailAction?openId=${openId}&addressId=${addressId}`)
	},

	// 地址接口

	// 新增地址(修改地址)
	// post请求
	// @params
	// address:省市区 addressId:地区码(如果是修改地址则此处传地址id) 
	// checked:是否默认 detailadress:地址详情
	// openId:生成的openId  telNumber:电话 userName:姓名
	// addAddress(params) {
	// 	return http.post(`${url}address/saveAction`, params)
	// },
	addAddress(params) {
		return http.post(`${url}address/saveAction`, params)
	},
	// 获取全部地址
	// openId:生成的openId
	getAllAddress(openId) {
		return http.get(`${url}address/getListAction?openId=${openId}`)
	},
	// 查看单个地址详情
	// id:地址id
	getOneAddress(id) {
		return http.get(`${url}address/detailAction?id=${id}`)
	},

	// 购物车相关接口

	// 加入购物车
	// post请求
	// goodsId:商品id  number:数量 openId:生成的openId
	addCarts({
		goodsId,
		number,
		openId
	}) {
		return http.post(`${url}cart/addCart`, {
			goodsId,
			number,
			openId
		})
	},
	// 查看购物车
	// openId:生成的openId
	getCarts(openId) {
		return http.get(`${url}cart/cartList?openId=${openId}`)
	},
	// 删除购物车
	deleteCarts(id) {
		return http.get(`${url}cart/deleteAction?id=${id}`)
	}
}
