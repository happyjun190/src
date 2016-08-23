<template>
<!-- 头部
  <section class="header">
    <header class="title">
      <div class="up">
        <a href="javascript:history.go(-1);">
        <img src="../../assets/images/left_1.png" alt="">
  </a>
      </div>
      <div class="food_name">
        <a href="">历史记录</a>
      </div>
    </header>
  </section>
-->
  <x-header :left-options="{showBack: true}" style="background-color:#fff;"><span style="color:#000;">历史记录</span></x-header>

  <!-- 历史记录 -->
  <scroller lock-x v-ref:scroller class="full_screen">
    <div class="box">
      <section class="message_2 record">
        <div>
          <div v-for="item in dataItem">
            <div v-if="item.tracingSourceGoodsDatas.length > 0 ">
              <div class="date">
                <p>{{item.date}}</p>
              </div>
              <table>
                <tr class="message_3" v-for="goods in item.tracingSourceGoodsDatas">
                  <td>{{goods.goods.name}}</td>
                  <td>{{goods.supplier.name}}</td>
                  <td>{{goods.supplier.addr}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </scroller>

</template>
<script>
  import {Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'
  var dataItem;
  export default {
		name: "historyRecord",
		ready(){
      //执行登陆
      ajax.post("historyRecord", {
        pageSize: "3",
        pageNum: "1",
        shopId :"",
        marketId :"402883b6561760a801561762d3860140"
      }, (status,data) => {
        if(status){
          if(data!=null){
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
	    Scroller,Box,XHeader
	  },
		data() {
			return {
        dataItem:""
			}
		},
		methods: {
			//登陆
			onLogin(){
					this.disablevalue=true;
					//执行登陆
					ajax.post("checkPublished", {
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
