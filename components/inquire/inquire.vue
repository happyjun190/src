<template>
<!-- 布局容器 -->
<div v-if="dataItem != null" >
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
        <a href="JavaScript:void(0)">{{dataItem.market.name}}</a>
      </div>
    </header>
  </section>

  <scroller lock-x v-ref:scroller class="full_screen">
    <div class="box">

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
    </div>
  </scroller>
</section>
</div>
<div v-else></div>
</template>

<script>
  import { Scroller,Box} from 'vux'
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

  var dataItem = null;
  export default {
		name: "getTracingSource",
		ready(){
        getUrlParam("shopId");
        //查询信息
        ajax.post("getTracingSource", {
          pageSize: 3,
          pageNum: 1,
          shopId:getUrlParam("shopId"),
          marketId:getUrlParam("marketId")
        }, (status,data) => {
          if(status){
            if(data!=null){
              //alert(JSON.stringify(data));
              this.dataItem = data;
              mui.toast("获取测试数据成功");
            }else{
              mui.toast("获取测试数据失败");
            }
          }
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
        dataItem:dataItem
			}
		},
		methods: {
      closeCurrentPage() {
          var ws=plus.webview.currentWebview();
          plus.webview.close(ws);
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
