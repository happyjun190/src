// import ajax from '../../ajax/index.js';
import encryption from './encryption.js'
let ajax=null
//后台检测登录状态
function again_login(){
	device_get((status,data)=>{
		if(status&&data){
			maintain_login()
		}else{
			login()
		}
	})
}
//保持登录
function maintain_login(){
	setTimeout( ()=> {
		again_login()
	},600000)
}
//获取用户信息
function device_get(success){
	ajax.get("getRechargeInfo",{},(status,data)=>{
		success(status,data)
	},false)
}
//登录
function login(AJAX=ajax){
	ajax=AJAX
	let userName=plus.storage.getItem("username");
	let passWord=plus.storage.getItem("userpwd");
	if(userName&&passWord){
		ajax.post("login",{
			"name":userName,
			"pwd":encryption(passWord),
			"type":"com.firefly.pojo.data.Employee"
		},(status,data)=>{
			if(status&&data){
				mui.toast("登录成功")
				maintain_login()
			}else {
				mui.toast("登录失败,正在重新登录")
				login()
			}
		},false)
	}
}

//网络发生变化
function onNetChange() {
	var nt = plus.networkinfo.getCurrentType();
	switch (nt) {
		case plus.networkinfo.CONNECTION_ETHERNET:
		case plus.networkinfo.CONNECTION_WIFI:
			plus.nativeUI.toast("切换到wifi网络!");
			break;
		case plus.networkinfo.CONNECTION_CELL2G:
		case plus.networkinfo.CONNECTION_CELL3G:
		case plus.networkinfo.CONNECTION_CELL4G:
			plus.nativeUI.toast("切换到2G/3G/4G网络!");
			break;
		default:
			alert("没有网络!");
			break;
	}
}
//开启心跳
function heartbeat(AJAX){
	ajax=AJAX
	if (window.plus) {
		maintain_login()
		document.addEventListener("netchange", onNetChange, false);
	} else {
		document.addEventListener("plusready", function(){
			maintain_login()
			document.addEventListener("netchange", onNetChange, false);
		}, false);
	}
}

module.exports = {heartbeat,login}
