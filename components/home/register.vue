<template>
    <section class="container-fluid">
        <!-- 注册页面 -->
        <section class="page">
          <header class="logo">
           <div class="images">
            <a href=""><img src="../../assets/images/logo.png" alt=""></a>
           </div>
          </header>
            <article class="register">
              <form action="javascript:;" method="">
                <div class="tel">
                  <img class="img" src="../../assets/images/tel.png" alt="">
                  <img class="img2" src="../../assets/images/wrie.png" alt="">
                  <input type="text"  name="user" placeholder="手机号">
                </div>
                <div class="tel verification">
                  <img class="img1" src="../../assets/images/tel_1.png" alt="">
                  <img class="img3" src="../../assets/images/wrie.png" alt="">
                  <input type="text"  name="user" placeholder="验证码">
                  <a href="">获取验证码</a>
                </div>
                <div class="tel">
                  <img class="img4" src="../../assets/images/psd.png" alt="">
                  <img class="img5" src="../../assets/images/wrie.png" alt="">
                  <input type="password" name="password" placeholder="密码">
                </div>
                <div class="tel">
                  <img class="img6" src="../../assets/images/psd.png" alt="">
                  <img class="img7" src="../../assets/images/wrie.png" alt="">
                  <input type="password" name="password" placeholder="重复密码">
                </div>
                <input type="submit" name="submit" value="注册" onclick="location='Register_1.html'">
              </form>
              <div class="new">
                <a href="JJavaScript:void(0)" @click="goLogin"><span>已有账号，</span>直接登录</a>
              </div>
            </article>
        </section>
    </section>
</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var dataItem;
  export default {
		name: "checkPublished",
		ready(){

		},
		components: {
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
        dataItem:""
			}
		},
		methods: {
			//跳转登陆页
      goLogin() {
        this.$router.go('/login');
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
<style src="../../assets/css/login.css"></style>
