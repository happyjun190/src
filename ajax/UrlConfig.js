//api地址配置
var ip = "http://192.168.0.103:8080";
let base=ip+"/ShiAnCaiMa/services"//基础地址
const url = {
	login:base+"aut/login",//登录
	verifyCode:base+"user/verifyCode",//验证手机验证码
	employeeReg:base+"employee/reg",//注册
	addMember:base+"member/addMember",//开通会员卡
	updatePwd:base+'user/updatePwd',//修改密码
	getRechargeInfo:base+'rechargeAmount/getRechargeInfo',//充值金额列表和充值员工信息
	cerifyCode:base+'verifyCode/createReg',//获取验证码
	recharge:base+'card/recharge',//会员卡充值
	rechargeGet:base+'recharge/get',//会员卡充值记录
	card:base+"card/get",//查询会员卡
	checkout:base+"card/checkout",//会员卡退卡
	changing:base+"card/changing",//会员卡换卡
	UpCardSta:base+"UpCardSta",//更新会员卡状态
	upCard:base+"upCard",//会员服务补卡
	update:ip+"/recharge/update/version.json",//版本更新

	checkPublished:base+"/supervisory/getMarketDetectionInfos",//食品检验列表
	qrcScanedQuery:base+"/qrcode/qrcScanedQuery",//扫码详情
	getSellDetails:base+"/customerselldetail/getSellDetails",//获取订单详情
	getTracingSource:base+"/tracingsource/getTracingSource",//溯源信息列表查询
	classification:base+"/sellergoods/get",//获取菜品分类信息
	historyRecord:base+"/tracingsource/getShopTracingSourceGroupByDate",//获取进货历史记录
	getSellerSupplier:base+"/sellersupplier/get",//入货信息
	getShopTracingSourceForToday:base+"/tracingsource/getShopTracingSourceForToday",//获取档口录入货物信息(溯源信息)
	addtracingsource:base+"/tracingsource/addtracingsource",//溯源信息录入
	updateTracingSource:base+"/tracingsource/updateTracingSource",//溯源信息批量更新
}
module.exports = url
