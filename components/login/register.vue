<template>
	<!--开始-->
	<!--结束-->
	<div class="page">
		<!--头部开始-->
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">买家注册</h1>
		</header>
		<!--头部结束-->
		<!--内容>填充开始-->
		<scroller lock-x v-ref:scroller height="-44px" class="content">
			<div class="box">
				<div class="weui_cells_title">填写注册信息</div>
				<div class="mui-content-padded" style="margin: 0px;">
					<validator name="validation1">
						<form class="mui-input-group">
							<div class="mui-input-row">
								<label>手机</label>
								<input type="number" placeholder="请输入手机号码(必填)" v-model="state.tel" v-validate:phonen="{required: true,phone:true}">
							</div>
							<div class="mui-input-row">
								<label>验证码</label>
								<input type="number" v-model="state.activation" placeholder="请输入验证码(必填)" v-validate:activation="{required: true}" />
							</div>
						</form>
						<button type="button" :disabled="$validation1.phonen.invalid" class="mui-btn mui-btn-outlined btn" @click="getyanzhenma">{{tip}}</button>
						<br />
						<div class="errors" v-for="error in $validation1.errors"><span class="mui-icon mui-icon-close"></span>{{error.message}}</div>
						<br />
						<br />
						<center>
							<button type="button" :disabled="$validation1.invalid" class="mui-btn mui-btn-success " @click="onJump">下一步</button>
						</center>
					</validator>
				</div>
			</div>
		</scroller>
		<!--内容>填充开始结束-->
	</div>
</template>

<script>
	import {
		Scroller,
		XInput,
		Group
	} from 'vux'
	import ajax from 'src/ajax/index.js'
	export default {

		components: {
			Scroller,
			XInput,
			Group,
		},
		ready() {

		},
		attached() {
			if(window.newPage){
				this.state={
					tel: '',
					activation: ''
				}
				this.tick= 0
			}
		},
		data() {
			return {
				state: {
					tel: '',
					activation: ''
				},
				tick: 0,
				tip:"免费获取验证码"
			}
		},
		computed: {
		},
		methods: {
			getyanzhenma() {
				if(this.tip!="免费获取验证码"){
					return
				}
				this.tick = 120
				this.countdown()
				ajax.get("cerifyCode", {
					phoneNum:this.state.tel
				}, (status,data) => {
					if(status){

					}else {
						this.tick = 0
					}
				})
			},
			countdown() {
				setTimeout(() => {
					if (this.tick > 0) {
						this.tick--
						this.tip='重新发送(' + this.tick + "秒)"
						this.countdown()
					}else {
						this.tip='免费获取验证码'
					}
				}, 1000)
			},
			onJump() {
				ajax.get("verifyCode", {
					phoneNum:this.state.tel,
					code:this.state.activation
				}, (status,data) => {
					if(status){
						if(data.ret){
							this.$router.go({
								path: '/login/register-password',
								query: this.state
							})
						}else{
							mui.toast("验证码不正确")
						}
					}
				})
			}
		}
	}
</script>
<style scoped>
	.content {
		padding-bottom: 20px
	}

	.btn {
		width: 100% !important;
		border-radius: 0%;
		border: 1px solid #eee;
		margin-top: 20px
	}

	.mui-btn {
		font-size: 20px;
		width: 80%;
		font-weight: 50;
	}

	.verification {
		width: 120px;
		height: 50px;
		margin: 4px;
		padding: 1px;
	}
	.errors {
		color: #dd524d;
	}
</style>
