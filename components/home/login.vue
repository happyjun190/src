<template>
    <section class="container-fluid">
        <!-- 登录页面 -->
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
                <div class="tel">
                  <img class="img1" src="../../assets/images/psd.png" alt="">
                  <img class="img3" src="../../assets/images/wrie.png" alt="">
                  <input type="password" name="password" placeholder="密码">
                </div>
                <input type="submit" name="submit" value="登录" class="zh_subm" @click="onLogin">
              </form>
              <div class="new1">
                <a href="">忘记密码？</a>
              </div>
              <div class="new new2">
                <a href="JavaScript:void(0)" @click="goRegister"><span>没有账号，</span>马上注册</a>
              </div>
              </form>
            </article>
            <div class="clear"></div>
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
		name: "login",
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
      goRegister() {
        this.$router.go('/register');
      },
      //登陆，去首页
      onLogin() {
        this.$router.go('/homepage');
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
<style src="../../assets/css/login.css"></style>
