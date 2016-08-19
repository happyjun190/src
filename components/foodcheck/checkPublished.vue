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
              <a href="JavaScript:void(0)">检测公布</a>
            </div>
          </header>
      </section>

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
  </section>

</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
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
        marketName:"402883b6561760a801561762d3860140"
      }, (status,data) => {
        if(status){
          if(data.length!=null){
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
