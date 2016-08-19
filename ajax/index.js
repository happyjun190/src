import mui from 'mui';
import UrlConfig from './UrlConfig.js'
import GetErrorMsg from './error.js'
import error_log from '../assets/js/error-log.js'
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
	post: function(base_url, data, success,waiting=true) {
		this.mui_ajax(base_url,"",FormatParameters(data),success,"post",waiting)
	},

	get: function(base_url, data, success,waiting=true) {
		this.mui_ajax(base_url,"",data,success,"get",waiting)
	},

	Add: function(base_url, data, success,waiting=true) {
		this.mui_ajax(base_url,"/add",FormatParameters(data),success,"post",waiting)
	},

	Update: function(base_url, data, success,waiting=true) {
		this.mui_ajax(base_url,"/update",FormatParameters(data),success,"post",waiting)
	},

	Del: function(base_url, data, success,waiting=true) {
		this.mui_ajax(base_url,"/del",FormatParameters(data),success,"post",waiting)
	},

	Get: function(base_url, data, success,waiting=true) {
		this.mui_ajax(base_url,"/get",data,success,"get",waiting)
	},

	mui_ajax: function(base_url,path,data,success,type,waiting){
		if(waiting){
			plus.nativeUI.showWaiting("正在处理，请稍后...",{back:"none"});
		}
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
					if(waiting){
						plus.nativeUI.closeWaiting();
						// mui.toast("查询成功")
					}
					success(true,data)
				},
				error: (xhr,type,errorThrown)=>{
					if(waiting){
						plus.nativeUI.closeWaiting();
					}
					this.error(xhr,type,errorThrown,Url,data,success)
				}
			});
		}
	},
	//错误处理
	error: function(xhr,type,errorThrown,Url,data,success){
		let response=""
		try {
			response=JSON.parse(xhr.responseText).msg
		} catch (err) {
			response=xhr.responseText
		}
		let responseText=response?response:xhr.responseText
		console.log("api:"+Url+"\nmsg:"+GetErrorMsg(responseText)+"\nstatus："+xhr.status+"\ntype: "+type);

		if((Url.split(":").length-1)>1){
			let ErrorMsg="api:"+Url+"\nmsg:"+GetErrorMsg(responseText)+"\n状态："+xhr.status+"\n类型: "+GetErrorMsg(type)
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
		error_log({
			"url":Url.split("services")[1],//错误信息的接口地址如果有就记录
		  "type":type,//接口错误类型
		  "status":xhr.status,//接口错误状态
		  "data":typeof(data)=="object"?data:JSON.parse(data),//发送给接口的数据，如果有就记录
			"error":responseText,//错误信息
			"responseText":responseText//服务器返回的错误
		})
	}
}

module.exports = ajax
