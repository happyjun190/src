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
          <a href="">历史记录</a>
        </div>
      </header>
    </section>

    <div>
       <!-- 入货信息2 -->
       <section class="message_1">
         <table>
           <tr>
             <td>菜名</td>
             <td>进货渠道</td>
             <td>档口</td>
             <td>数量</td>
           </tr>
         </table>
         <!-- 蔬菜名 -->
         <article class="vegetables">
           <div class="greens">
             <div class="greens_up">
               <a href="stock_market.html">生菜</a>
               <a href="">秋刀鱼</a>
               <a href="">卷芯包菜</a>
               <a href="">草鱼</a>
             </div>
             <div class="greens_dowm">
               <a href="">鸡蛋</a>
               <a href="">千张</a>
               <a href="JavaScript:void(0)" @click="goClassification">+</a>
             </div>
           </div>
         </article>
         <!-- 今天没有进货信息 -->
         <article class="today">
           <div class="none">
             <span>您今天还没有录入进货信息哦！</span>
           </div>
         </article>
       </section>
     </section>
  </div>
</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var dataItem;
  export default {
		name: "cargoinfo",
		ready(){
      this.type = 1;
		},
		components: {
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
        type:""
			}
		},
		methods: {
      goClassification() {
        this.$router.go('/classification');
      },

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
