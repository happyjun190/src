<template>
<!-- 布局容器 -->
<section class="container-fluid">
<!-- 头部 -->
  <section class="header">
    <header class="title">
      <div class="up">
        <a href="javascript:history.go(-1);">
        <img src="../../assets/images/left_1.png" alt="">
  </a>
      </div>
      <div class="food_name">
        <a href="">历史记录</a>
      </div>
    </header>
  </section>
  <!-- 历史记录 -->
  <section class="message_2 record">
  <div>
    <div class="date">
      <p>07-23</p>
    </div>
    <table>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
      <tr class="message_3">
        <td>四季豆</td>
        <td>山东祁连大棚蔬菜养殖基地</td>
        <td>12号</td>
      </tr>
    </table>
    </div>
    </section>
</section>

</div>


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
      ajax.post("qrcScanedQuery", {
        pageSize: "3",
        pageNum: "1",
        qrcode:"111"
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
<style src="../../assets/css/index.css"></style>
