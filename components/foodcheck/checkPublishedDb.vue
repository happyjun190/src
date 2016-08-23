<template>
<!-- 布局容器 -->
  <section class="container-fluid">
  <!-- 头部 -->
    <section class="header">
      <header class="title1">
        <div class="up">
          <a href="JavaScript:void(0)" @click="closeCurrentPage">
              <img src="../../assets/images/left_1.png" alt="">
        </a>
        </div>
        <div class="food_name">
          <a href="">查询结果</a>
        </div>
      </header>
    </section>

    <scroller lock-x v-ref:scroller class="full_screen">
      <div class="box">
        <div class="zh_main">
          <div class="zh_list">订单编号：<span class="zh_list_content">{{dataItem[0].sell.code}}</span></div>
          <div class="zh_list">交易时间：<span class="zh_list_content">{{dataItem[0].createDate}}</span></div>
          <div class="zh_list">所在市场：<span class="zh_list_content">{{dataItem[0].sell.shop.name}}</span></div>
          <div class="zh_list">交易档口：<span class="zh_list_content">{{dataItem[0].sell.shop.market.name}}</span></div>
          <div class="zh_list">会员卡号：<span class="zh_list_content">{{dataItem[0].sell.card.codeCardFace}}</span></div>
          <div class="zh_list">支付方式：<span class="zh_list_content">{{dataItem[0].sell.paymode}}</span></div>
          <div class="zh_list">交易金额：<span class="zh_list_content">{{dataItem[0].sell.money}}</span></div>
          <hr class="zh_hr"/>

          <div class="zh_box">
            <span class="zh_tr">菜名</span>
            <span class="zh_tr">单价/kg</span>
            <span class="zh_tr">重量kg</span>
            <span class="zh_td">溯源信息</span>
          </div>
          <div class="zh_box" v-for="item in dataItem">
            <span class="zh_tr">{{item.goods.name}}</span>
            <span class="zh_tr">{{item.price}}</span>
            <span class="zh_tr">{{item.weight}}</span>
            <span class="zh_td">{{item.goods.supplier}}</span>
          </div>
          <a href="javascript:void(0)" @click="getAllShopInquireInfo"><div class="zh_list zh_footer">查看档口所有溯源信息</div></a>

        </div>
      </div>
    <scroller>
  </section>
</template>

<script>
  import {Scroller,Box} from 'vux'
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

  function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
  }


  var dataItem;
  export default {
		name: "checkPublishedDb",
		ready(){
      //查询信息
      ajax.post("getSellDetails", {
        sellId:getUrlParam("orderId")
      }, (status,data) => {
        if(status){
          if(data!=null){
            this.dataItem = data;
            mui.toast("获取数据成功");
          }else{
            mui.toast("获取测试数据失败");
          }
        }
        //this.disablevalue=false;
      },false)

      setTimeout(function(){
        var ws=plus.webview.getWebviewById('saoma');
        plus.webview.close(ws);
      },100)

		},
		components: {
	    Scroller,Box
	  },
		data() {
			return {
        dataItem:""
			}
		},
		methods: {
			//查看所有溯源信息
			getAllShopInquireInfo(){
          var ws=plus.webview.currentWebview();
          var words = ws.getURL().split('#!');
          var baseURL = words[0]+'#!/';
          var w = plus.webview.create(baseURL+'inquire');
					w.show();
			},
      closeCurrentPage() {
          var ws=plus.webview.currentWebview();
          plus.webview.close(ws);
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style src="../../assets/css/normalize.css"></style>-->-->
<!--<style src="../../assets/css/index.css"></style>-->
<!--<style src="../../assets/css/reset.css"></style>-->
<style src="../../assets/css/allCss.css"></style>
