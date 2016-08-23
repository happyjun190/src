<template>
  <!-- 布局容器 -->
  <!-- 头部
  <section class="header">
    <header class="title volume">
      <div class="up">
        <a href="javascript:history.go(-1);">
        <img src="../../assets/images/left_1.png" alt="">
  </a>
      </div>
      <div class="food_name">
        <a href="">请输入进货重量</a>
      </div>
      <div class="history complete">
        <a href="JavaScript:void(0)" @click="onComplete">完成</a>
      </div>
    </header>
  </section>
  -->
  <x-header :left-options="{showBack: true, preventGoBack:false}" right-options="{showMore: true}"
            style="background-color:#fff;"><span style="color:#000;">分类信息</span><span slot="right" @click="onComplete" style="color:#04be02;">完成</span>
  </x-header>


  <scroller lock-x v-ref:scroller class="full_screen">
    <div class="box">
      <!-- 输入进货量 -->
      <section class="amount">
        <form action="" >
          <div class="input">
           <input type="text" value="输入进货量" onfocus="if(this.value == '输入进货量') this.value = ''" onblur="if(this.value =='') this.value = '输入进货量'" />
          </div>
          <div class="weight">
            <span>kg</span>
          </div>
        </form>
      </section>
    </div>
  </scroller>
</template>

<script>
  import { Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
  }

  var dataItem;
  export default {
		name: "checkPublished",
		ready(){

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
      onComplete() {
        var goodsIds = getUrlParam("goodsIds");
        var supplierId = getUrlParam("supplierId");
        var weight = 50;
        //执行登陆
        ajax.post("addtracingsource", {
          userId:"",
          supplierId:supplierId,
          goodsIds:goodsIds,
          weigth:weight
        }, (status,data) => {
          if(status){
            if(data!=null){
              this.$router.go('/cargoinfo');
            }else{
              mui.toast("没有获取到有效数据");
            }
          }
          //this.disablevalue=false;
        },false)
      }
		}
	}
</script>
