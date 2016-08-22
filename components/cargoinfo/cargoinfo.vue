<template>
<!-- 布局容器 -->
<section class="container-fluid">
<section class="header">
  <header class="title">
    <div class="up">
      <a href="javascript:history.go(-1);">
        <img src="../../assets/images/left_1.png" alt="">
      </a>
    </div>
    <div class="food_name">
      <a href="">入货信息</a>
    </div>
    <div class="history">
      <a href="JavaScript:void(0)" @click="getHistoryRecordPage">历史记录</a>
    </div>
  </header>
</section>
<div v-if="type==0">
    
  <!-- 头部 -->
  <div>
    <!-- 入货信息 -->
    <section class="message">
      <table>
        <tr>
          <td>菜名</td>
          <td>进货渠道</td>
          <td>档口</td>
        </tr>
      </table>
      <article class="install">
        <div class="paragraph">
          <p>亲爱的用户您好，初次登录，</p>
          <p>请设置您档口的常进蔬菜，<a href="JavaScript:void(0)" @click="goClassification">立即设置</a>!</p>
        </div>
      </article>
    </section>
  </div>


  </div>
  <div v-else>
    
    <div>
      <!-- 入货信息2 -->
      <section class="message_1 message_2">
        <table>
          <tr>
            <td>菜名</td>
            <td>进货渠道</td>
            <td>档口</td>
            <td>数量</td>
          </tr>
          <tr class="message_3" v-for="tracingSource in dataItem.tracingSourcesHasSupplier">
            <td>{{tracingSource.goods.name}}</td>
            <td>{{tracingSource.supplier.name}}</td>
            <td>{{tracingSource.supplier.addr}}</td>
            <td>{{tracingSource.weigth}}{{tracingSource.goods.unit.name}}</td>
          </tr>
        </table>
        <!-- 蔬菜名 -->
        <article class="vegetables">
          <div class="greens">
            <div class="greens_up">
              <div v-if="dataItem.tracingSourcesNoSupplier.length>0">
                <a href="JavaScript:void(0)" @click="goStockMarket" v-for="tracingSource in dataItem.tracingSourcesNoSupplier" goodsId="{{tracingSource.goods.id}}">{{tracingSource.goods.name}}</a>
                <a href="JavaScript:void(0)" @click="goClassification">+</a>
              </div>
              <div v-else><a href="JavaScript:void(0)" @click="goClassification">+</a></div>
            </div>
          </div>
        </article>
      </section>
        <!-- 提交 -->
      <section class="submit">
        <article class="button">
          <div class="but">
            <input type="submit" @click="submitTracingSources">
          </div>
        </article>
      </section>
    
    </div>
  </div>
</section>

</template>


<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var type = 0;
  var dataItem;
  export default {
		name: "cargoinfo",
		ready(){
        var shopId = "88506b32521a11e6987cf8cab858db3f";
        var marketId = "";
        //查询溯源信息
        ajax.post("getShopTracingSourceForToday", {
          pageSize: 3,
          pageNum: 1,
          shopId:shopId,
          marketId:marketId
        }, (status,data) => {
          if(status){
            //TODO
            if(data!=null){
              this.dataItem = data;
              this.type=1;
              //mui.toast("获取测试数据成功");
            }else{
              this.type=0;
              //mui.toast("获取测试数据失败");
            }
          }
        },false)
		},
		components: {
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
        dataItem:"",
        type:""
			}
		},
		methods: {
      goClassification() {
        this.$router.go('/classification');
      },
      getHistoryRecordPage() {
        this.$router.go('/historyRecord');
      },
      goStockMarket(event) {
        var goodsId = $(event.target).attr('goodsId');
        //this.$router.go('/stockMarket?goodsId='+goodsId);
        this.$router.go({
          path:'/stockMarket',
          params:{goodsId:goodsId},
          query:{goodsId:goodsId}
        })
      },
      goClassification() {
        this.$router.go('/classification');
      },
      submitTracingSources() {
        ajax.post("updateTracingSource", {
          userId:""
        }, (status,data) => {
          if(status){
            this.$router.go('/');
          }
        },false)
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>

