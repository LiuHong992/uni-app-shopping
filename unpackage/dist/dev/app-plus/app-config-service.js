
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/topic/topic","pages/classfy/classfy","pages/carts/carts","pages/my/my","pages/search/search","pages/navdetail/navdetail","pages/goodsdetail/goodsdetail","pages/classfydetail/classfydetail","pages/newrec/newrec","pages/category/category","pages/brand/brand","pages/topicdetail/topcidetail","pages/orderdetail/orderdetail","pages/collect/collect","pages/history/history","pages/addresslist/addresslist","pages/feedback/feedback","pages/addressedit/addressedit","pages/settlement/settlement"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"品韵易购","navigationBarBackgroundColor":"#B4282D","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#666666","selectedColor":"#B4282D","backgroundColor":"#FAFAFA","borderStyle":"white","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/home.png","selectedIconPath":"static/home-active.png"},{"pagePath":"pages/topic/topic","text":"专题","iconPath":"static/topic.png","selectedIconPath":"static/topic-active.png"},{"pagePath":"pages/classfy/classfy","text":"分类","iconPath":"static/classfy.png","selectedIconPath":"static/classfy-active.png"},{"pagePath":"pages/carts/carts","text":"购物车","iconPath":"static/carts.png","selectedIconPath":"static/carts-active.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/my.png","selectedIconPath":"static/my-active.png"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-app-demo","compilerVersion":"2.6.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/topic/topic","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/classfy/classfy","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/carts/carts","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/search/search","meta":{},"window":{}},{"path":"/pages/navdetail/navdetail","meta":{},"window":{}},{"path":"/pages/goodsdetail/goodsdetail","meta":{},"window":{}},{"path":"/pages/classfydetail/classfydetail","meta":{},"window":{}},{"path":"/pages/newrec/newrec","meta":{},"window":{}},{"path":"/pages/category/category","meta":{},"window":{}},{"path":"/pages/brand/brand","meta":{},"window":{}},{"path":"/pages/topicdetail/topcidetail","meta":{},"window":{}},{"path":"/pages/orderdetail/orderdetail","meta":{},"window":{}},{"path":"/pages/collect/collect","meta":{},"window":{}},{"path":"/pages/history/history","meta":{},"window":{}},{"path":"/pages/addresslist/addresslist","meta":{},"window":{}},{"path":"/pages/feedback/feedback","meta":{},"window":{}},{"path":"/pages/addressedit/addressedit","meta":{},"window":{}},{"path":"/pages/settlement/settlement","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0}}}});