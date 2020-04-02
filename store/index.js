import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../utils/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 接收请求出来的首页信息
		indexObj: {},
		// 地址信息
		locations: '',
		// 接收专题信息
		topicArr: [],
		// 接收某一专题的详细信息
		topicObj: {},
		// 获取到专题信息的同时获取到的相关推荐数组
		topicRecArr: [],
		// 大分类
		bigClassfy: [],
		// 请求小分类的id
		bigId: null,
		// 接收小分类的信息
		littleObj: {},
		// 接收当前小分类的所有信息
		smallObj: {},
		// 接收新品或者人气推荐的信息
		newRecArr: [],
		// 接收请求到的厂家信息
		brandObj: {},
		// 接收请求到的商品详情数据
		goodsInfos: {},
		// 接收搜索热搜搜索历史相关数据
		historyHotObj: {},
		// 接收搜索出来的数据数组
		searchArr: [],
		// 登录后的用户信息
		userInfos: {},
		// 用户登录状态
		loginStatus: false,
		// 收藏数组
		collectArr: [],
		// 地址列表数组
		addressArr: [],
		// 购物车数组
		cartsArr: [],
		// 当前选中的地址
		addressObj: {}
	},
	mutations: {
		// 首页数据
		setUser(state, data) {
			state.indexObj = data
			// console.log(state.indexObj);
		},
		// 更改地址
		setLocation(state, data) {
			state.locations = data
			// console.log(state.locations);
		},
		// 专题信息的处理
		setTopic(state, data) {
			state.topicArr = state.topicArr.concat(data)
		},
		// 专题详细信息的处理
		setTopicDetail(state, data) {
			state.topicObj = data
			// console.log(state.topicObj);
		},
		// 专题相关推荐信息的处理
		setTopicRecArr(state, data) {
			state.topicRecArr = data
			// console.log(state.topicRecArr);
		},
		// 大分类信息处理
		setBigClassfy(state, data) {
			state.bigClassfy = data
			// console.log(state.bigClassfy);
		},
		// 请求小分类id的处理
		setBigId(state, data) {
			state.bigId = data
		},
		// 小分类数据的处理
		setLittleObj(state, data) {
			state.littleObj = data
		},
		// 当前小分类数据的处理
		setSmallObj(state, data) {
			state.smallObj = data
			// console.log(state.smallObj);
		},
		// 新品和人气推荐数据的处理
		setNewRecArr(state, data) {
			state.newRecArr = data
		},
		// 厂家信息的处理
		setBrandObj(state, data) {
			state.brandObj = data
		},
		// 商品信息的处理
		setGoodsInfos(state, data) {
			state.goodsInfos = data
			// console.log(state.goodsInfos);
		},
		// 热搜搜索历史数据处理
		setHistoryHotObj(state, data) {
			state.historyHotObj = data
			// console.log(state.historyHotObj);
		},
		// 搜索之后的数据处理
		setSearchArr(state, data) {
			state.searchArr = data
		},
		// 用户信息的处理
		setUserInfos(state, data) {
			state.userInfos = data
			// console.log(state.userInfos);
		},
		// 用户登录状态管理
		setLoginStatus(state, data) {
			state.loginStatus = data
		},
		// 收藏数组处理
		setCollectArr(state, data) {
			state.collectArr = data
		},
		// 地址列表数据处理
		setAddressArr(state, data) {
			state.addressArr = data
		},
		// 购物车数据处理
		setCartsArr(state, data) {
			state.cartsArr = data
		},
		// 地址数据处理
		setAddressObj(state, data) {
			state.addressObj = data
			// console.log(state.addressObj);
		}
	},
	getters: {
		newCartsArr(state) {
			state.cartsArr.map(item => {
				item.checked = false
			})
			return state.cartsArr
		}
	},
	actions: {
		// 获取首页信息
		async getIndexs({
			commit
		}) {
			let res = await $api.getIndex()
			if (res.status === 200) {
				commit('setUser', res.data)
			}
		},

		// 首页跳转到人气推荐和新品请求的方法
		async getNewRec({
			commit
		}, {
			type,
			order
		}) {
			uni.showLoading({
				title: '加载中...'
			});
			let res = await $api.newGoodRank({
				type,
				order
			})
			if (res.status === 200) {
				uni.hideLoading()
				commit('setNewRecArr', res.data.data)
			}
		},
		// 获取厂商信息
		async getBrands({
			commit
		}, id) {
			uni.showLoading({
				title: '加载中...'
			});
			let res = await $api.getBrand(id)
			if (res.status === 200) {
				uni.hideLoading()
				commit('setBrandObj', res.data)
			}
		},

		//专题

		// 获取专题信息
		async getTopics({
			commit
		}, page) {
			let res = await $api.getTopic(page)
			if (res.status === 200) {
				commit('setTopic', res.data.data)
				uni.hideLoading()
			}
		},
		// 根据id值来获取对应的专题信息
		async topicDetails({
			commit
		}, id) {
			let res = await $api.topicDetail(id)
			if (res.status === 200) {
				commit('setTopicDetail', res.data.data)
				commit('setTopicRecArr', res.data.recommendList)
			}
		},

		// 分类

		// 获取分类大类
		async getBigClassfy({
			commit,
			dispatch,
			state
		}) {
			uni.showLoading({
				title: '加载中...'
			});
			let res = await $api.getClassfy()
			if (res.status === 200) {
				uni.hideLoading()
				commit('setBigClassfy', res.data.categoryList)
				commit('setBigId', res.data.categoryList[0].id)
				if (state.bigId !== null) {
					dispatch('getSmallClassfy', state.bigId)
				}
			}
		},
		// 获取分类小分类
		async getSmallClassfy({
			commit
		}, id) {
			let res = await $api.getCurrentClassfy(id)
			if (res.status === 200) {
				commit('setLittleObj', res.data.data.currentOne)
			}
		},

		// 分类详情页

		// 根据所传id来请求对应分类的商品
		async getSmallGoods({
			commit
		}, categoryId) {
			uni.showLoading({
				title: '加载中...'
			});
			let res = await $api.getNavGoodList(categoryId)
			if (res.status === 200) {
				uni.hideLoading()
				commit('setSmallObj', res.data)
			}
		},

		// 商品详情页

		// 请求商品详情数据
		async getGoodsDetail({
			commit
		}, {
			id,
			openId
		}) {
			let res = await $api.goodsDetail({
				id,
				openId
			})
			if (res.status === 200) {
				uni.hideLoading()
				commit('setGoodsInfos', res.data)
			} else {
				uni.hideLoading()
			}
		},

		// 搜索页

		// 获取搜索历史和热搜内容
		async getHistory({
			commit
		}, openId) {
			let res = await $api.getHotSearch(openId)
			if (res.status === 200) {
				commit('setHistoryHotObj', res.data)
			}
		},
		// 搜索方法
		async startSearch({
			commit
		}, keyword) {
			let res = await $api.searchValue(keyword)
			if (res.status === 200) {
				commit('setSearchArr', res.data.keywords)
			}
		},
		// 添加历史记录
		async addHistorys({
			commit
		}, {
			keyword,
			openId
		}) {
			let res = await $api.addHistory({
				keyword,
				openId
			})
		},
		// 删除搜索历史
		async deleteHistorys({
			commit,
			dispatch
		}, {
			openId
		}) {
			let res = await $api.deleteHistory({
				openId
			})
			if (res.status === 200) {
				dispatch('getHistory')
			}
		},

		// 收藏功能

		// 加入收藏
		async addCollects({
			dispatch
		}, {
			goodsId,
			openId
		}) {
			let res = await $api.addCollect({
				goodsId,
				openId
			})
			if (res.status === 200) {}
		},
		// 查询收藏
		async getCollected({
			commit
		}, openId) {
			uni.showLoading({
				title: '加载中'
			});
			let res = await $api.lookCollect(openId)
			if (res.status === 200) {
				uni.hideLoading()
				commit('setCollectArr', res.data.collectGoodsList)
				// console.log(res.data);
			} else {
				uni.hideLoading()
			}
		},

		// 地址接口

		// 获取所有地址
		async getAllAddresses({
			commit
		}, openId) {
			uni.showLoading({
				title: '加载中'
			});
			let res = await $api.getAllAddress(openId)
			if (res.status === 200) {
				uni.hideLoading()
				if (res.data.data.length > 0) {
					commit('setAddressObj', res.data.data[0])
				}
				commit('setAddressArr', res.data.data)
			} else {
				uni.hideLoading()
			}
		},
		// 添加地址
		async addAddresses({
			commit,
			dispatch
		}, params) {
			let res = await $api.addAddress(params)
			// dispatch('getAllAddresses')
			dispatch('getAllAddresses', 'liuhong')
			if (res.data.data) {
				uni.showToast({
					title: '保存成功'
				});
			} else {
				uni.showToast({
					title: '保存失败',
					icon: "none"
				});
			}
		},
		// 获取单个地址详情的方法
		async getOnAddresses({
			commit
		}, id) {
			let res = await $api.getOneAddress(id)
			if (res) {
				return res
			}
		},

		// 购买接口

		// 加入购物车
		async addToCarts({
			commit,
			dispatch
		}, {
			goodsId,
			number,
			openId
		}) {
			let res = await $api.addCarts({
				goodsId,
				number,
				openId
			})
			if (res) {
				dispatch('getCartsNum', 'liuhong')
				uni.showToast({
					title: '加入购物车成功'
				});
			}
		},
		// 获取购物车数据
		async getCartsNum({
			commit
		}, openId) {
			let res = await $api.getCarts(openId)
			if (res) {
				commit('setCartsArr', res.data.data)
			}
		},
		// 删除购物车某样商品
		async delCartsGoods({
			commit,
			dispatch
		}, id) {
			let res = await $api.deleteCarts(id)
			if (res) {
				dispatch('getCartsNum', 'liuhong')
			} else {
				uni.showToast({
					title: '删除失败',
					icon: "none"
				});
			}
		},
		// 立即购买
		async buyNow({
			commit
		}, {
			allPrise,
			goodsId,
			openId
		}) {
			let res = await $api.buyRightNow({
				allPrise,
				goodsId,
				openId
			})
		}
	},
	modules: {}
})
