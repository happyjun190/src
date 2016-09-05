<template>
  <!-- 头部
    <section class="header">
      <header class="title1">
        <div class="food_name">
          <a href="JavaScript:void(0)">食安菜妈</a>
        </div>
      </header>
    </section>
  -->
  <div  class="page">
    <header class="mui-bar mui-bar-nav">
      <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
      <h1 class="mui-title">溯源信息</h1>
    </header>
      <scroller lock-x v-ref:scroller class="content" height="-100px">
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
                <span href="JavaScript:void(0)" @click="goTracingSource">
                  <img src="../../assets/images/list_1.png" alt="">
                  <span>溯源查询</span>
                </span>
              </li>

              <li class="col-sm-4 col-xs-4 text-center">
                <span href="JavaScript:void(0)" @click="goCheckPublished">
                  <img src="../../assets/images/list_2.png" alt="">
                  <span>检测公布</span>
                </span>
              </li>

              <li class="col-sm-4 col-xs-4 text-center">
                <span href="JavaScript:void(0)" @click="needDevelop">
                  <img src="../../assets/images/list_3.png" alt="">
                  <span>近期账单</span>
                </span>
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
            <span href="JavaScript:void(0)">
              <img src="../../assets/images/photo_2.png" alt="">
              <span>首页</span>
            </span>
          </li>
          <li class="col-sm-4 col-xs-4 text-center">
            <span href="JavaScript:void(0)" @click="goSaoma">
              <img src="../../assets/images/photo_3.png" alt="">
              <span>扫一扫</span>
            </span>
          </li>

          <li class="col-sm-4 col-xs-4 text-center">
            <span href="JavaScript:void(0)" @click="needDevelop">
              <img src="../../assets/images/photo_4.png" alt="">
              <span>个人</span>
            </span>
          </li>
        </ul>
        </footer>
      </section>

  </div>
</template>

<script>
  import {Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

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
			goCheckPublished(){
					this.$router.go('/checkPublished');
			},
      goTracingSource(){
          this.$router.go('/tracingSource');
      },
      goSaoma() {
        this.$router.go('/saoma');
      },
      needDevelop(){
        mui.toast("功能开发中");
      },
      reset(){//重新计算页面高度
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
      }
		}
	}
</script>
