<template>
<!-- 布局容器 -->
<div class="page" >

  <!--<x-header :left-options="{showBack: true}" style="background-color:#04be02;">{{dataItem.market.name}}</x-header>-->
  <header class="mui-bar mui-bar-nav" style="background-color:#04be02 !important;">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">{{dataItem.market.name}}</h1>
  </header>
  <scroller lock-x v-ref:scroller height="-44px" class="content">
    <div class="box">
      <img id="arrow_down" src="../../assets/images/down.png" style="display:none;" alt=""  />
      <img id="arrow_up" src="../../assets/images/up.png" style="display:none;" alt="" />
      <!-- 分类 -->
      <section class="category">
      <!-- 蔬菜 -->
        <article class="big_category big_category1">
          <!-- 下拉 -->
          <!-- 下拉 -->
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default" v-for="item in dataItem.tracingSourceShopDatas">
              <div class="panel-heading" role="tab">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href="JavaScript:void(0)" aria-expanded="true" aria-controls="collapseOne">
                   <span>{{item.shop.name}}</span><span>(菜名·入货渠道·档口·入货重量)</span>
                   <div class="img">
                    <img src="../../assets/images/down.png" class="down" alt="" @click="fnImg"/>
                    <!--
                    <img src="../../assets/images/down.png" class="down" alt="" @click="fnImg" goodClassifyId="{{category2.goodsClassify.id}}"/>-->
                   </div>
                  </a>
                </h4>
              </div>
              <div class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
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
</div>
</template>

<script>
  import { Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  // function getUrlParam(name) {
  //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  //     var r = window.location.search.substr(1).match(reg); //匹配目标参数
  //     if (r != null) return unescape(r[2]); return null; //返回参数值
  // }

  var dataItem = null;
  export default {
		name: "tracingSourceSaoma",
		ready(){
        ajax.post("getTracingSource", {
          shopId:this.$route.query.shopId,
          marketId:this.$route.query.marketId
        }, (status,data) => {
          if(status){
            if(data!=null){
              //alert(JSON.stringify(data));
              this.dataItem = data;
              //mui.toast("获取测试数据成功");
            }else{
              mui.toast("暂无溯源信息");
            }
          }
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
      //下拉展开函数
      fnImg(event){
        var arrow_down = document.getElementById('arrow_down').src;
        var arrow_up = document.getElementById('arrow_up').src;
        var class1 = event.target.attributes["class"].value;
        var goodClassifyId = event.target.attributes["goodClassifyId"].value

        if(class1=='down') {
          event.target.setAttribute('src', arrow_up);
          event.target.setAttribute('class', 'up');
        } else {
          event.target.setAttribute('src', arrow_down);
          event.target.setAttribute('class', 'down');
        }
        //alert(document.getElementsByClassName(goodClassifyId)[0].attributes['class'].value);
        var displayValue = document.getElementsByClassName(goodClassifyId)[0].attributes['style'].value;
        if(displayValue=='') {
          document.getElementsByClassName(goodClassifyId)[0].setAttribute('style','display:none')
        } else {
          document.getElementsByClassName(goodClassifyId)[0].setAttribute('style','')
        }
      }
		}
	}
</script>
