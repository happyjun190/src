<template>
<!-- 布局容器 -->
  <section class="container-fluid">
  <!-- 头部 -->
    <section class="header">
      <header class="title1">
    <div class="up">
      <a href="javascript:history.go(-1);">
          <img src="../../assets/images/left_1.png" alt="">
    </a>
    </div>
    <div class="food_name">
      <a href="">查询结果</a>
    </div>
      </header>
    </section>
    <div class="zh_main">
    <div class="zh_list">订单编号：<span class="zh_list_content">{{dataItem[0].id}}</span></div>
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
    <div class="zh_box">
      <span class="zh_tr">胡萝卜</span>
      <span class="zh_tr">15.0</span>
      <span class="zh_tr">0.25</span>
      <span class="zh_td">山东祁连大棚蔬菜种</span>
    </div>
    <a href="javascript:void(0)" @click="getAllShopDetailInfo"><div class="zh_list zh_footer">查看档口所有溯源信息</div></a>

</div>


  </section>
</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'
  var dataItem;
  export default {
		name: "checkPublishedDb",
		ready(){
      //查询信息
      ajax.post("qrcScanedQuery", {
        pageSize: "3",
        pageNum: "1",
        qrcode:"111"
      }, (status,data) => {
        if(status){
          if(data.length!=null){
            this.dataItem = data;
            mui.toast("获取测试数据成功");
          }else{
            mui.toast("获取测试数据失败");
          }
        }
        //this.disablevalue=false;
      },false)
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
			getAllShopDetailInfo(){
					this.disablevalue=true;
					//执行登陆
					ajax.post("qrcScanedQuery", {
						pageSize: "3",
						pageNum: "1",
						marketName:"bc96731e521811e6987cf8cab858db3f"
					}, (status,data) => {
						if(status){
							if(data.length>0){
								mui.toast("获取测试数据成功");
							}else{
								mui.toast("获取测试数据失败");
							}
						}
						this.disablevalue=false;
					},false)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/index.css"></style>
