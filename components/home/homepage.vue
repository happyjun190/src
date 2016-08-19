<template>
<!-- 布局容器 -->
  <section class="container-fluid">
  <!-- 头部 -->
    <section class="header">
      <header class="title1">
        <div class="food_name">
          <a href="JavaScript:void(0)">食安菜妈</a>
        </div>
      </header>
    </section>
    <!-- 轮播图 -->
    <section class="banner">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- 图片 -->
        <div class="carousel-inner" role="listbox">
          <div class="item active">
            <img src="../../assets/images/banner_1.jpg" alt="">
          </div>
          <div class="item">
            <img src="../../assets/images/banner_2.jpg" alt="">
          </div>
          <div class="item">
            <img src="../../assets/images/banner_1.jpg" alt="">
          </div>
        </div>
        <!-- 指标-->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
      </div><!-- 轮播图 -->
    </section>

  <!-- 扫码 -->
    <section class="list">
      <ul class="row">
        <li class="col-sm-4 col-xs-4 text-center">
          <a href="JavaScript:void(0)" @click="goTracingSource">
            <img src="../../assets/images/list_1.png" alt="">
            <span>溯源查询</span>
          </a>
        </li>

        <li class="col-sm-4 col-xs-4 text-center">
          <a href="JavaScript:void(0)" @click="goCheckPublished">
            <img src="../../assets/images/list_2.png" alt="">
            <span>检测公布</span>
          </a>
        </li>

        <li class="col-sm-4 col-xs-4 text-center">
          <a href="JavaScript:void(0)" @click="needDevelop">
            <img src="../../assets/images/list_3.png" alt="">
            <span>近期账单</span>
          </a>
        </li>
      </ul>
    </section>
    <!-- 菜妈商城 -->
    <section class="shop">
      <article class="">
        <div class="first">
          <a href="JavaScript:void(0)" @click="needDevelop">
            <div class="img">
              <img src="../../assets/images/list_4.png" alt="">
            </div>
            <div class="font">
              <span>菜妈商城</span>
              <p>新鲜好菜随时送</p>
            </div>
          </a>
        </div>
        <div class="second">
          <a href="JavaScript:void(0)" @click="needDevelop">
            <div class="img">
              <img src="../../assets/images/list_5.png" alt="">
            </div>
            <div class="font">
              <span>积分好礼</span>
              <p>赚积分，兑好礼</p>
            </div>
          </a>
        </div>
      </article>
    </section>
    <div class="clear"></div>
    <!-- 全民果鲜 -->
    <section class="fresh ">
      <article class="fruit">
        <div>
          <img src="../../assets/images/photo_1.jpg" alt="">
        </div>
      </article>
    </section>
    <div class="wrie"></div>
    <!-- 脚部 -->
    <section class="footer">
      <footer class="list_1">
        <ul class="row">
        <li class="col-sm-4 col-xs-4 text-center">
          <a href="javascript:;">
            <img src="../../assets/images/photo_2.png" alt="">
            <span>首页</span>
          </a>
        </li>
        <li class="col-sm-4 col-xs-4 text-center">
          <a href="JavaScript:void(0)" @click="goSaoma">
            <img src="../../assets/images/photo_3.png" alt="">
            <span>扫一扫</span>
          </a>
        </li>

        <li class="col-sm-4 col-xs-4 text-center">
          <a href="JavaScript:void(9)" @click="needDevelop">
            <img src="../../assets/images/photo_4.png" alt="">
            <span>个人</span>
          </a>
        </li>
      </ul>
      </footer>
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
			//登陆
			goCheckPublished(){
					this.$router.go('/checkPublished');
			},
      goTracingSource(){
      		this.$router.go('/inquire');
      },
      goSaoma() {
        this.$router.go('/saoma');
      },
      needDevelop(){
        mui.toast("功能开发中");
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
