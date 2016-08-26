<template>

  <div  class="page">
    <header class="mui-bar mui-bar-nav mui-btn-nav">
      <span class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
      <h1 class="mui-title" v-el:market style="right:80px !important;left:80px !important;">入货信息</h1>
      <span  v-link="{path:'/historyRecord'}" style="color: #000;float: right;margin-top:12px;">历史记录</span>
    </header>

    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">
        <div v-if="type==0">
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
        <div v-else>
          <!-- 入货信息2 -->
          <section class="message_1 message_2" v-if="type==2">
            <table>
              <tr>
                <td>菜名</td>
                <td>进货渠道</td>
                <td>档口</td>
                <td>数量</td>
              </tr>
              <tr class="message_3" v-for="tracingSource in dataItem.tracingSourcesHasSupplier" @click="editGoodsInfo(tracingSource.id,tracingSource.goods.name)">
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
                    <a href="JavaScript:void(0)" @click="goStockMarket(tracingSource.id)" v-for="tracingSource in dataItem.tracingSourcesNoSupplier">{{tracingSource.goods.name}}</a>
                    <a href="JavaScript:void(0)" v-link="{path: '/classification'}">+</a>
                  </div>
                  <div v-else><a href="JavaScript:void(0)" v-link="{path: '/classification'}">+</a></div>
                </div>
              </div>
            </article>
          </section>
          <!-- 入货信息3 -->
          <section class="message_1 message_2">
            <table>
              <tr>
                <td>菜名</td>
                <td>进货渠道</td>
                <td>档口</td>
                <td>数量</td>
              </tr>
              <tr class="message_3" v-for="tracingSource in dataItem.tracingSourcesHasSupplier" @click="editGoodsInfo(tracingSource.id,tracingSource.goods.name)">
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
                    <a href="JavaScript:void(0)" @click="goStockMarket(tracingSource.id)" v-for="tracingSource in dataItem.tracingSourcesNoSupplier">{{tracingSource.goods.name}}</a>
                    <a href="JavaScript:void(0)" v-link="{path: '/classification'}">+</a>
                  </div>
                  <div v-else><a href="JavaScript:void(0)" v-link="{path: '/classification'}">+</a></div>
                </div>
              </div>
            </article>
          </section>
        </div>
        <button type="button" class="mui-btn mui-btn-success" style="width:100%;height:50px;font-size:1.6rem;" @click="submitTracingSources">
          提交</button>
        <!-- 提交
        <section class="submit" style="margin-top:100px;">
          <article class="button">
            <div class="but">
              <input type="submit" @click="submitTracingSources">
            </div>
          </article>
        </section>-->
      </div>
    </scroller>
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
    attached() {
      this.getCargoInfo();
    },
		methods: {
      getCargoInfo() {
        //查询溯源信息
        ajax.post("getShopTracingSourceForToday", {
        }, (status,data) => {
          if(status){
            //TODO
            if(data!=null){
              this.dataItem = data;
              if(data.isOldData) {//是旧数据
                this.type=2;
              } else {//当天数据
                this.type=1;
              }

              //mui.toast("获取测试数据成功");
            }else{
              this.type=0;
              //mui.toast("获取测试数据失败");
            }
          }
        },false)
      },
      getHistoryRecordPage() {
        this.$router.go('/historyRecord');
      },
      goStockMarket(tracingSourceId) {
        this.$router.go({
          path:'/stockMarket',
          params:{tracingSourceId:tracingSourceId},
          query:{tracingSourceId:tracingSourceId}
        })
      },
      submitTracingSources() {

        ajax.post("commitTracingSource", {

        }, (status,data) => {
          if(status){
            if(data) {
              mui.toast("提交成功");
            } else {
              mui.toast("提交失败");
            }

          }
        },false)
      },
      editGoodsInfo(tracingSourceId, goodsName) {
        // 弹出系统选择按钮框
        plus.nativeUI.actionSheet( {title:goodsName,cancel:"取消",buttons:[{title:"编辑"},{title:"删除"}]}, (e)=>{
          if(e.index!=0){
            if(e.index==1) {
                this.$router.go({
                  path:'/stockMarket',
                  params:{tracingSourceId:tracingSourceId},
                  query:{tracingSourceId:tracingSourceId}
                })
            }
            if(e.index==2) {
              //删除溯源信息
              ajax.post("deleteTracingSource", {
                tracingSourceId:tracingSourceId
              }, (status,data) => {
                this.getCargoInfo();
              },false)
            }
          }
        });
      },
      reset(){//重新计算页面高度
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
      }
		}
	}
</script>

<style src="../../../node_modules/bootstrap/dist/css/bootstrap.css"></style>
