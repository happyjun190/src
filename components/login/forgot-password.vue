<template><!--开始--><!--结束-->
<div>
	<!--头部开始-->
	<header class="mui-bar mui-bar-nav">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<h1 class="mui-title">忘记密码</h1>
	</header>
	<!--头部结束-->
	<!--内容>填充开始-->
	<scroller lock-x v-ref:scroller height="-44px" class="content">
		<div class="box">
		<div class="mui-content-padded" style="margin: 0px;">
			<div class="weui_cells_title">填写新密码</div>
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>新密码</label>
					<input class="mui-input-password" v-model="pwd" type="password" placeholder="请输入新密码" >
				</div>
				<div class="mui-input-row">
					<label>确认密码</label>
					<input class="mui-input-password" v-model="repwd" type="password" class="mui-input-clear" placeholder="请再次输入新密码">
				</div>

			</form>
			<!--需要添加两个分页小圆点-->
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<center>
				<button type="button" class="mui-btn mui-btn-success" @click="resetPwd()">完成修改</button>
			</center>
		</div>
	</div>
</scroller>
	<!--内容>填充开始结束-->
</div>
</template>

<script>
import {XHeader,XInput,Scroller} from 'vux'
import ajax from 'src/ajax/index.js'
export default{

	components:{
		XHeader,
		XInput,
		Scroller
	},
	ready(){
	},
	data(){
		return{
			phoneno:this.$route.query.phoneno,
			vcode:this.$route.query.vcode,
			pwd:'',
			repwd:''
		}
	},
	methods:{
		//重置密码
		resetPwd(){
			if(this.pwd==""){
				mui.toast("密码不能为空");return false;
			}
			if(this.pwd.length<6){
				mui.toast("密码应该在6位以上");return false;
			}
			if(this.pwd != this.repwd){
				mui.toast("确认密码和密码不一致");return false;
			}
			ajax.post("updatePwd", {
				pwd: this.pwd,
				tel:this.phoneno,
				activation:this.vcode,
				identity:1
			}, (status,data) => {
				if(status){
					if(data.ret){
						mui.toast("修改成功");
						this.$router.go('/');
					}else{
						mui.toast("修改失败");
					}
				}
			})
		}
	}

}
</script>
<style scoped>

	.mui-btn{
    font-size: 20px;
    width:80%;
    font-weight: 50;
    }

</style>
