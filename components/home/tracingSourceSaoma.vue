<template>
<!-- 布局容器 -->
<div class="page" >

  <!--<x-header :left-options="{showBack: true}" style="background-color:#04be02;">{{dataItem.market.name}}</x-header>-->
  <header class="mui-bar mui-bar-nav">
      <span class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
      <h1 class="mui-title">{{dataItem?dataItem.market.name:''}}</h1>
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

            <ul class="mui-table-view" v-for="item in dataItem.tracingSourceShopDatas">
                <li class="mui-table-view-cell mui-collapse mui-active">
                    <a class="mui-navigate-right" href="#" >
                      <span style="color:#04be02;font-size:1.3rem;">{{item.shop.name}}</span><span style="color:#999999;font-size:1.3rem;">(菜名·入货渠道·档口·入货重量)</span>
                    </a>
                    <div class="mui-collapse-content">
                      <div class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                        <div class="panel-body">
                          <!-- 蔬菜名 -->
                          <div class="vegetables">
                            <div class="greens greens1">
                               <table>
                                <tr v-for="goods in item.tracingSourceGoodsDatas">
                                  <td>{{goods.goods.name}}</td>
                                  <!--进货市场-->
                                  <td v-if="goods.supplier == null">-</td>
                                  <td v-else>{{goods.supplier.name}}</td>
                                  <!--进货市场档口-->
                                  <td v-if="goods.supplier == null">-</td>
                                  <td v-else>{{goods.supplier.addr}}</td>

                                  <td>{{goods.weigth}}{{goods.goods.unit.name}}</td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </li>
            </ul>
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
        
    },
    attached(){
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
      reset(){//重新计算页面高度
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
      }
		}
	}
</script>
