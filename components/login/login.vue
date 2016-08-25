<template>
	<div class="page">

		<scroller lock-x v-ref:scroller class="content full_screen">
			<div class="box">

				<div class="picture">
					<img src="../../assets/img/LOGO.png" width="160px;">
				</div>

				<p align="center">
					<font size="3" color="#000000">-买家端-</font>
				</p>

				<br/>
				<validator name="validation1">
					<form class="mui-input-group" novalidate>
						<div class="mui-input-row">
							<label><span class="mui-icon mui-icon-person" style="margin-left: 15px;"></span></label>
							<input type="text" class="mui-input-clear" placeholder="请输入账号" v-model="username" v-validate:username="{required: true}">
						</div>
						<div class="mui-input-row">
							<label><span class="mui-icon mui-icon-locked" style="margin-left: 15px;"></span></label>
							<input type="password" class="mui-input-clear" placeholder="请输入密码" v-model="password" v-validate:password="{required: true}">
						</div>

						<!--<div class="mui-input-row mui-checkbox">
							<label style="text-align: right;color: #888888;font-size: 14px;">自动登录</label>
							<input name="checkbox1" value="Item1" type="checkbox" id="row">
						</div>-->
					</form>
				</validator>
				<br/>
				<center style="position: absolute;width: 100%;bottom:25%">
					<button type="button" class="mui-btn mui-btn-success btn" disabled="{{disablevalue}}" @click="onLogin">
						登陆
					</button>
				</center>

				<div class="bottom">
					<div class="text-align">
						<span style=";margin-right:5%"  v-link="{path: '/login/register'}">立即注册</span>|
						<!--左标签-->
						<span style="margin-left:5%" v-link="{path: '/login/forgot-phone'}">忘记密码</span>
						<!--右标签-->
					</div>
				</div>
			</div>
		</scroller>
	</div>

</template>

<script>
	import { Scroller} from 'vux'
	import ajax from 'src/ajax/index.js'
	import api from 'src/ajax/UrlConfig.js'
	import encryption from 'src/assets/js/encryption.js'
	import {heartbeat} from '../../assets/js/login.js'
	import update from '../../assets/js/update.js';
	export default {
		name: "login",
		ready(){
			setTimeout(()=>{
				update()
			},0)
		},
		attached() {
			mui.plusReady(()=> {
				let userName=plus.storage.getItem("username");
				let passWord=plus.storage.getItem("userpwd");
				if(userName&&passWord){
					this.username=userName
					this.password=passWord
				}
			})
		},
		components: {
	    Scroller
	  },
		data() {
			return {
				username: '',
				password: '',
				disablevalue:false
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
						//type:"com.firefly.pojo.data.Shop"
						type:"com.firefly.pojo.data.Member"
					}, (status,data) => {
						if(status){
							if(data.ret){
								heartbeat(ajax)
								mui.plusReady(()=> {
									plus.storage.setItem("username", this.username);
									plus.storage.setItem("userpwd", this.password);
								})
								this.$router.go('/homepage');
							}else{
								mui.toast("用户名或密码错误");
							}
						}
						this.disablevalue=false;
					})
				}else {
						mui.toast("用户名或密码没有填写");
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
</style>
