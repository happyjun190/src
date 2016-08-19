module.exports = function(error) {
	var msg = {
		'InsufficientBalance':'会员卡余额不足！',
		'NoNeedToRepeatTheOpening':'不需要重复注册',
		'Not Found':'没有找到页面！',
		'NoLogin':'检测到没有登录！点击确认重新登录',
		'NoPower':'检测到没有权限！',
		'MerchantDoesNotExist':'商家不存在',
		'EmployeeDoesNotExist':'用户不存在！',
		'PhoneNumVerifyCodeIsNotFound':'手机验证码已过期',
		'PhoneNumVerifyCodeIsWrong':'手机验证码错误',
		'PhoneNumVerifyCodeIsExist':'手机号码已经创建过验证码',
		'timeout':'连接超时',
		'error':'连接错误',
		'abort':'网络异常',
		'parsererror':'数据解析错误',
		'null':'空',
		'TheMemberIsNotExist':'会员不存在',
		'TheCardIsNotValid':'该卡无效',
		'TheShopIsNotExist':'商家不存在',
		'NotLoginPower':'无登录权限'
	}
	return msg[error] || error
}
