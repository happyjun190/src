<template>
    <div  class="page">
    <!-- 头部
    <x-header :left-options="{showBack: true}" style="background-color:#04be02;">查询结果</x-header>
    -->
    <header class="mui-bar mui-bar-nav">
        <span class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
        <h1 class="mui-title">查询结果</h1>
    </header>

    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">
        <div class="zh_main">
          <div class="zh_list">订单编号：<span class="zh_list_content">{{dataItem[0].sell.code}}</span></div>
          <div class="zh_list">交易时间：<span class="zh_list_content">{{dataItem[0].createDate}}</span></div>
          <div class="zh_list">所在市场：<span class="zh_list_content">{{dataItem[0].sell.shop.name}}</span></div>
          <div class="zh_list">交易档口：<span class="zh_list_content">{{dataItem[0].sell.shop.market.name}}</span></div>
          <div class="zh_list">会员卡号：<span class="zh_list_content">{{dataItem[0].sell.card.codeCardFace}}</span></div>
          <div class="zh_list">支付方式：<span class="zh_list_content">{{dataItem[0].sell.paymode|payMode}}</span></div>
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
          <span href="javascript:void(0)" @click="getAllShopInquireInfo"><div class="zh_list zh_footer">查看档口所有溯源信息</div></span>

        </div>
      </div>
    <scroller>
  </div>
</template>

<script>
  import {Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'


  var dataItem;
  export default {
		name: "checkPublishedDb",
		ready(){
        
    },
    attached(){
      //查询信息
      ajax.post("getSellDetails", {
        sellId:this.$route.query.orderId
      }, (status,data) => {
        if(status){
          if(data!=null){
            this.dataItem = data;
          }else{
            mui.toast("暂无订单数据");
          }
        }
        //this.disablevalue=false;
      },false)


		},
		components: {
	    Scroller,Box,XHeader
	  },
		data() {
			return {
        dataItem:""
			}
		},
    filters: {
      payMode : function (val) {
        return ['支付宝', '微信', '闪付', '现金', '会员卡'][val]
      }
    },
		methods: {
			//查看所有溯源信息
			getAllShopInquireInfo(){
          // var ws=plus.webview.currentWebview();
          // var words = ws.getURL().split('#!');
          // var baseURL = words[0]+'#!/';
          // var w = plus.webview.create(baseURL+'inquire');
					// w.show();
					this.$router.go('/tracingSource');
			},
      reset(){//重新计算页面高度
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
      }
		}
	}
</script>
