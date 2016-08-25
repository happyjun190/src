<template>
  <div  class="page">
      <!-- 头部 
      <x-header :left-options="{showBack: true}" style="background-color:#04be02;">检测公布</x-header>-->
      <header class="mui-bar mui-bar-nav" style="background-color:#04be02 !important;">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">检测公布</h1>
      </header>
      <scroller lock-x v-ref:scroller height="-44px" class="content">
        <div class="box">
          <!-- 检测公布 -->
          <section class="detect" v-for="item in dataItem">
            <!-- 循环输出检测结果-->
            <article class="announce">
              <div class="date">
                <span>{{item.checkDate}}</span>
              </div>

              <div v-for="detectionData in item.detectionDatas">
                <div class="stalls">
                  <span>{{detectionData.shopName}}</span>
                </div>
                <div class="ratio">
                  <table>
                    <tr>
                      <td>{{detectionData.detectionName}}：</td>
                      <td>{{detectionData.detectionValue}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </section>
          </article>

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
		name: "checkPublished",
		ready(){
      //执行登陆
      ajax.post("checkPublished", {
      
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

		}
	}
</script>
