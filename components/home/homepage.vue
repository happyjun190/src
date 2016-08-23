<template>
      <!-- 布局容器 -->
      <section>
      <!-- 头部
        <section class="header">
          <header class="title1">
            <div class="food_name">
              <a href="JavaScript:void(0)">食安菜妈</a>
            </div>
          </header>
        </section>
      -->
      <x-header :left-options="{showBack: false}" style="background-color:#04be02;">食安菜妈</x-header>
        <scroller lock-x v-ref:scroller class="full_screen">
          <div class="box">
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
      </div>
    </scroller>

    <!-- 脚部-->
    <section class="footer">
      <footer class="list_1">
        <ul class="row">
        <li class="col-sm-4 col-xs-4 text-center">
          <a href="JavaScript:void(0)">
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
          <a href="JavaScript:void(9)" @click="goCargoinfo">
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
  import {Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  function plusReady() {

  }
  //扩展API加载完毕后调用onPlusReady回调函数
  if(window.plus) {
     plusReady();
  } else {
    document.addEventListener( "plusready", plusReady, false );
  }


  var dataItem;
  export default {
		name: "homepage",
		ready(){
		},
		components: {
	    Scroller,Box,XHeader
	  },
		data() {
			return {
        dataItem:""
			}
		},
		methods: {
			//
			goCheckPublished(){
					this.$router.go('/checkPublished');
			},
      goTracingSource(){
          var ws=plus.webview.currentWebview();
          //console.log( "当前Webview窗口："+ws.getURL() );
          //alert(ws.getURL());
          //var currentURL = ws.getURL();
          var w;
          if(ws.getURL().indexOf('#!')>0) {
            w = plus.webview.create(ws.getURL()+'/tracingSource?shopId='+'402883b6561760a80156176529ff0177'+'marketId='+'');
          } else {
            w = plus.webview.create(ws.getURL()+'#!/tracingSource?shopId='+'402883b6561760a80156176529ff0177'+'marketId='+'');
          }
          w.show();

      },
      goSaoma() {
        var ws=plus.webview.currentWebview();
        //console.log( "当前Webview窗口："+ws.getURL() );
        //alert(ws.getURL());
        //var currentURL = ws.getURL();
        var w;
        if(ws.getURL().indexOf('#!')>0) {
          if(ws.getURL().indexOf('#!/')>0) {
            w = plus.webview.create(ws.getURL()+'saoma','saoma');
          } else {
            w = plus.webview.create(ws.getURL()+'/saoma');
          }
        } else {
          w = plus.webview.create(ws.getURL()+'#!/saoma');
        }
        w.show();
        //this.$router.go('/saoma');
      },
      needDevelop(){
        mui.toast("功能开发中");
      },
      goCargoinfo(){
        this.$router.go('/cargoinfo');
      }
		}
	}
</script>
