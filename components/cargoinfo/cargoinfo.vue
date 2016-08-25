<template>

<div  class="page">
  <header class="mui-bar mui-bar-nav mui-btn-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title" v-el:market>入货信息</h1>
    <span  v-link="{path:'/historyRecord'}" style="color: #000;float: right;margin-top:12px;">历史记录</span>
  </header>


  <div v-if="type==0">
    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">
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
              <p>请设置您档口的常进蔬菜，<a href="JavaScript:void(0)" v-link="{path: '/classification'}">立即设置</a>!</p>
            </div>
          </article>
        </section>
      </div>
    </scroller>
  </div>
  <div v-else>
    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">
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
                  <a href="JavaScript:void(0)" v-link="{path: '/classification'}">+</a>
                </div>
                <div v-else><a href="JavaScript:void(0)" v-link="{path: '/classification'}">+</a></div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </scroller>
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
</template>


<script>
  import {Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var type = 1;
  var dataItem;
  export default {
		name: "cargoinfo",
		ready(){
        //查询溯源信息
        ajax.post("getShopTracingSourceForToday", {
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
	    Scroller,Box,XHeader
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

        var goodsId = event.target.attributes["goodsId"].value;
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
          
        }, (status,data) => {
          if(status){
            this.$router.go('/homepage');
          }
        },false)
      }
		}
	}
</script>
