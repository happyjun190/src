<template>
	<!--开始-->
	<!--结束-->
	<div class="page">
		<!--头部开始-->
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">忘记密码</h1>
		</header>
		<!--头部结束-->
		<!--内容>填充开始-->
		<scroller lock-x v-ref:scroller height="-44px" class="content">
			<div class="box">
				<div class="weui_cells_title">验证手机</div>
				<validator name="validation">
					<form class="mui-input-group">
						<div class="mui-input-row">
							<label>手机号</label>
							<input class="mui-input" v-model="dataInfo.phoneno" type="text" placeholder="请输入手机号码" v-validate:phonen="{required: true,phone:true}">
						</div>
						<div class="mui-input-row">
							<label>验证码</label>
							<input class="mui-input" v-model="dataInfo.vcode" type="number" class="mui-input-clear" placeholder="请输入验证码" v-validate:vcode="{required: true}">
						</div>
					</form>
				</validator>
			<button type="button" class="mui-btn mui-btn-outlined btn" @click="getyanzhenma">{{tip}}</button>
			<center style="margin-top:120px">
					<button type="button" class="mui-btn mui-btn-success" :disabled="$validation.invalid" @click="onJump()"> 下一步</button>
			</center>
		</scroller>
	</div>
	<!--内容>填充开始结束-->
</template>

<script>
	import {
		Scroller,
		XInput,
		Group,
	} from 'vux'
	import ajax from 'src/ajax/index.js'
	export default {

	components: {
		XInput,
		Scroller,
		Group,
	},
	ready() {},
	attached() {
		if(window.newPage){
			this.state={
				phone:"",
				vcode:''
			}
			this.tick=0
		}
	},
	data() {
		return {
			tick: 0,
			dataInfo:{
				phoneno:'',
				vcode:''
			}
		}
	},computed: {
		// 一个计算属性的 getter
		tip: function() {
			if (this.tick > 0) {
				return '重新发送(' + this.tick + "秒)"
			} else {
				return '免费获取验证码'
			}
		}
	},
	methods: {
		//获取验证码
		getyanzhenma() {
			if (this.dataInfo.phoneno == "") {
				mui.toast("手机号码不能为空");
				return false;
			}else if (this.tip!="免费获取验证码") {
				return
			}
			ajax.get("cerifyCode", {
				phoneNum:this.dataInfo.phoneno
			}, (status,data) => {
				if(status&&data.ret){
					this.tick = 120
					this.countdown()
				}
			})
		},
		//倒计时显示按钮值
		countdown() {
			setTimeout(() => {
				if (this.tick > 0) {
					this.tick -= 1
					this.countdown()
				}
			}, 1000)
		},
		//跳转到更改密码页面
		onJump() {
			if (this.phoneno == "") {
				mui.toast("手机号码不能为空");
				return;
			}
			if (this.vcode == "") {
				mui.toast("验证码不能为空");
				return;
			}
			ajax.get("verifyCode", {
				phoneNum:this.dataInfo.phoneno,
				code:this.dataInfo.vcode
			}, (status,data) => {
				if(status){
					if(data.ret){
						this.$router.go({
							path: '/login/forgot-password',
							query: this.dataInfo
						})
					}else{
						mui.toast("验证码不正确")
					}
				}
			})
		},
	}

}</script>
<style scoped>

	.btn {
		width:100% !important;
		border-radius: 0%;
		border: 1px solid #eee;
		margin-top:20px
	}
	.mui-btn {
		font-size: 20px;
		width:80%;
		font-weight: 50;
	}
</style>
