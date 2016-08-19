<template>
	<div class="page">

		<scroller lock-x v-ref:scroller class="content full_screen">
			<div class="box">

				<div class="picture">
					<img src="../../assets/img/LOGO.png" width="160px;">
				</div>

				<p align="center">
					<font size="3" color="#000000">-服务端-</font>
				</p>
				<validator name="validation1">
					<form class="mui-input-group" novalidate>
						<div class="mui-input-row">
							<label><span class="mui-icon mui-icon-person" style="margin-left: 15px;"></span></label>
							<input type="number" class="mui-input-clear" placeholder="请输入账号" v-model="username" v-validate:username="{required: true}">
						</div>
						<div class="mui-input-row">
							<label><span class="mui-icon mui-icon-locked" style="margin-left: 15px;"></span></label>
							<input type="password" class="mui-input-clear" placeholder="请输入密码" v-model="password" v-validate:password="{required: true}">
						</div>
					</form>
					<div class="mui-input-row mui-checkbox">
						<label style="text-align: right;color: #888888;font-size: 14px;">记住密码</label>
						<input  value="Item" type="checkbox" v-model="checkbox">
					</div>
				</validator>
				<br/>
				<box gap="0px 20px">
      		<x-button type="primary" :disabled="disablevalue" @click="onLogin">登录</x-button>
      	</box>
				<div class="bottom">
					<div class="text-align">
						<span style="margin-right:5%;padding: 5px;"  v-link="{path: '/register'}">立即注册</span>|
						<!--左标签-->
						<span style="margin-left:5%;padding: 5px;" v-link="{path: '/forgot-phone'}">忘记密码</span>
						<!--右标签-->
					</div>
				</div>
			</div>
		</scroller>
	</div>

</template>

<script>
	import { Scroller,Checklist,Box,XButton} from 'vux'
	import ajax from 'src/ajax/index.js'
	import encryption from 'src/assets/js/encryption.js'
	export default {
		name: "login",
		ready(){
		},
		attached() {
			if(window.newPage){

			}
			mui.plusReady(()=> {
				let userName=plus.storage.getItem("username");
				let passWord=plus.storage.getItem("userpwd");
				let record=plus.storage.getItem("record");
				if(record=="true"){
					this.checkbox=true
				}else {
					this.checkbox=false
				}
				if(userName&&passWord){
					this.username=userName
					if(this.checkbox){
						this.password=passWord
					}
				}
			})
		},
		components: {
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
				username: '',
				password: '',
				disablevalue:false,
				checkbox:false
			}
		},
		methods: {
			//登陆
			onLogin(){
				//验证用户名和密码
				if(this.$validation1.valid){
					this.disablevalue=true;
					//执行登陆
					ajax.post("login", {
						name: this.username,
						pwd: encryption(this.password),
						type:"com.firefly.pojo.data.Employee"
					}, (status,data) => {
						if(status){
							if(data.ret){
								mui.toast("登录成功");
							}else{
								mui.toast("用户名或密码错误");
							}
						}
						this.disablevalue=false;
					},false)
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content {
		margin: 0 !important;
	}
	.btn {
		font-size: 20px !important;
		padding: 15px !important;
		width: 70% !important
	}
	.mui-input-group:after {
		height: 0px;
	}
	.mui-input-group:before {
		height: 0px;
	}
	.mui-input-group .mui-input-row:after {
		right: 15px;
	}

	.mui-btn {
		font-size: 20px;
		width:80% !important;
		font-weight: 50;
	}

	.picture {
		text-align: center;
		margin: 10% auto auto auto;
		padding-left: 40px;
	}
	.text-align {
		font-size: 14px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
	.bottom {
		position: absolute;
		bottom: 50px;
		left: 0;
		right: 0;
	}
	.mui-checkbox input[type=checkbox]:checked:before, .mui-radio input[type=radio]:checked:before {
		color: #04be02
	}
	.text-align {
		font-size: 14px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
</style>
