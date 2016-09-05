//api地址配置

//var ip = "http://192.168.3.144:8080";
//var ip = "http://123.207.119.48:8056";
var ip="http://192.168.0.135:8088";
let base=ip+"/ShiAnCaiMa/services/"//基础地址
const url = {
	login:base+"aut/login",//登录
	getMySelf:base+"shop/getShopInfo",//获取当前登录的用户信息
	shopreg:base+"shop/reg",//注册
	sell:base+"sell",//销售单
	addressMgr:base+'addressMgr',//地址管理
	cerifyCode:base+'verifyCode/createReg',//获取验证码
	bankcardMgr:base+'bankCardMgr',//银行卡
	updatePwd:base+'user/updatePwd',//修改密码
	bankcardList:base+'bankCardMgr/get',//银行卡管理
	expensesRecord:base+"expensesRecord/getIncomeCount",//获取统计
	expensesRecordList:base+"expensesRecord/getExpensesRecordDayCount",//获取月消费记录列表
	getRecord:base+"expensesRecord/get",//获取日消费记录详情
	getRecord_getPageCount:base+"expensesRecord/getPageCount",//获取日消费记录详情页数
	sellDetail:base+"sellDetail/totalSell",//销售单明细
	aliPay:base+"aliPay/precreate",//支付宝
	wechatPay:base+"wechatPay/precreate",//微信
	memberPay:base+"sellDetail/memberPay",//会员卡
	payComplete:base+"payComplete/complete",//获取支付通知
	device:base+"device",//获取支付通知
	evaluation:base+"evaluation",//用户订单评价
	adInfo:base+"adInfo",//获取广告
	download:base+"file/download",//文件下载
	update:ip+"/shop/update/version.json",//版本更新
	verifyCode:base+"user/verifyCode",//验证手机验证码



	//important :需要引入css文件

	//买家vue文件在cargoinfo目录
	//登陆vue文件在login目录
	buyerMemberReg:base+"member/reg",//买家-用户注册
	checkPublished:base+"supervisory/getMarketDetectionInfos",//买家-食品检验列表
	qrcScanedQuery:base+"qrcode/qrcScanedQuery",//买家-扫码详情
	getSellDetails:base+"customerselldetail/getSellDetails",//买家-获取订单详情
	getTracingSource:base+"tracingsource/getTracingSource",//买家-溯源信息列表查询
	getMarketTracingSource:base+"tracingsource/getMarketTracingSource",//买家-获取溯源信息

	//卖家vue文件在home目录
	classification:base+"sellergoods/get",//卖家-获取菜品分类信息
	historyRecord:base+"tracingsource/getShopTracingSourceGroupByDate",//卖家-获取进货历史记录
	getSellerSupplier:base+"sellersupplier/get",//卖家-入货信息
	getShopTracingSourceForToday:base+"tracingsource/getShopTracingSourceForToday",//卖家-获取档口录入货物信息(溯源信息)
	addtracingsource:base+"tracingsource/addtracingsource",//卖家-溯源信息录入
	updateTracingSource:base+"tracingsource/updateTracingSource",//卖家-溯源信息更新
	commitTracingSource:base+"tracingsource/commitTracingSource",//卖家-溯源信息提交
	deleteTracingSource:base+"tracingsource/deleteTracingSource"//卖家-删除溯源记录

}
module.exports = url
