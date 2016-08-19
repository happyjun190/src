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
        <a href="">{{dataItem.market.name}}</a>
      </div>
    </header>
  </section>
  <!-- 分类 -->
  <section class="category">
  <!-- 蔬菜 -->
    <article class="big_category big_category1">
      <!-- 下拉 -->
      <!-- 下拉 -->
      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default" v-for="item in dataItem.tracingSourceShopDatas">
          <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               <span>{{item.shop.name}}</span><span>(菜名·入货渠道·档口·入货重量)</span>
               <div class="img">
                <img id="d_n" style="display:none;" src="../../assets/images/down.png" alt="." onclick="fnImg(this,'d_i')" />

                <img src="../../assets/images/up.png" alt="" id="d_i"  onclick="fnImg(this,'d_n')" />
               </div>
              </a>
            </h4>
          </div>
          <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
              <!-- 蔬菜名 -->
              <div class="vegetables">
                <div class="greens greens1">
                   <table>
                    <tr v-for="goods in item.tracingSourceGoodsDatas">
                      <td>{{goods.goods.name}}</td>
                      <td>{{goods.supplier.name}}</td>
                      <td>{{goods.supplier.addr}}</td>
                      <td>{{goods.weigth}}{{goods.goods.unit.name}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
		name: "getTracingSource",
		ready(){
      //执行登陆
      ajax.post("getTracingSource", {
        pageSize: "3",
        pageNum: "1",
        shopId:"402883b6561760a80156176529ff0177",
        marketId:"402883b6561760a801561762d3860140"
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
	    Scroller,Checklist,Box,XButton
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
