<template>

<div  class="page">
  <!--
  <x-header :left-options="{showBack: true}" style="background-color:#fff;"><span style="color:#000;">历史记录</span></x-header>
  -->
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">历史记录</h1>
  </header>
  <!-- 历史记录 -->
  <scroller lock-x v-ref:scroller height="-44px" class="content">
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
</div>

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
