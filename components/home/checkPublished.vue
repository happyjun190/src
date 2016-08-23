<template>
    <!-- 布局容器 -->
    <section>
      <!-- 头部 -->
      <x-header :left-options="{showBack: true}" style="background-color:#04be02;">检测公布</x-header>
      <scroller lock-x v-ref:scroller class="full_screen">
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
  </section>

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
        pageSize: "3",
        pageNum: "1",
        marketName:"bc96731e521811e6987cf8cab858db3f"
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
