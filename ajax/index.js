import mui from 'mui';
import UrlConfig from './UrlConfig.js'
import GetErrorMsg from './error.js'
import {login} from '../assets/js/login.js'
//匹配路径
let matchUrl=function(val){
	if(UrlConfig[val]){
		return UrlConfig[val]
	}
	mui.alert("没有匹配到对应的url","提示","确定",()=>{
		return false;
	})
}

// 格式化发送参数
let FormatParameters = function (par) {
  return JSON.stringify(par)
}

//判断是否登录
let throwError = function(responseText) {
	if (responseText === 'NoLogin') {
		login(ajax)
		return false;
	}
	return true;
}

let ajax = {
	post: function(base_url, data, success) {
		this.mui_ajax(base_url,"",FormatParameters(data),success,"post")
	},

	get: function(base_url, data, success) {
		this.mui_ajax(base_url,"",data,success,"get")
	},

	Add: function(base_url, data, success) {
		this.mui_ajax(base_url,"/add",FormatParameters(data),success,"post")
	},

	Update: function(base_url, data, success) {
		this.mui_ajax(base_url,"/update",FormatParameters(data),success,"post")
	},

	Del: function(base_url, data, success) {
		this.mui_ajax(base_url,"/del",FormatParameters(data),success,"post")
	},

	Get: function(base_url, data, success) {
		this.mui_ajax(base_url,"/get",data,success,"get")
	},

	mui_ajax: function(base_url,path,data,success,type){
		let Url=matchUrl(base_url)
		let Data=""
		if(typeof data=="object"){
			Data=JSON.stringify(data)
		}else{
			Data=data
		}
		//alert("地址：\n"+Url+path+"\n数据：\n"+Data+"\ntype："+type)
		if(Url){
			mui.ajax(Url+path, {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: type, //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				crossDomain:true,//强制用H5+跨域
				xhrFields: {
					withCredentials: true
				},
				headers: {'Content-Type':'application/json;charset=UTF-8'},
				success: (data,textStatus,xhr)=>{
					success(true,data)
				},
				error: (xhr,type,errorThrown)=>{
					this.error(xhr,type,errorThrown,Url,success)
				}
			});
		}
	},
	//错误处理
	error: function(xhr,type,errorThrown,Url,success){
		let response=""
		try {
			response=JSON.parse(xhr.responseText).msg
		} catch (err) {
			response=xhr.responseText
		}
		let responseText=response?response:xhr.responseText
		console.log("api:"+Url+"\nmsg:"+GetErrorMsg(responseText)+"\nstatus："+xhr.status+"\ntype: "+type);
		if(Url.indexOf(":")>-1){
			let ErrorMsg=GetErrorMsg(responseText)+"\n状态："+xhr.status+"\n类型: "+GetErrorMsg(type)
			ErrorMsg="api:"+Url+"\nmsg:"+ErrorMsg
			mui.alert(ErrorMsg,"错误提示","确定",()=>{
				if (throwError(responseText)) {
					success(false,responseText)
				}
			})
		}else {
				mui.toast(GetErrorMsg(type)+","+GetErrorMsg(responseText))
				if (throwError(responseText)) {
					success(false,responseText)
				}
		}
	}
}

module.exports = ajax
