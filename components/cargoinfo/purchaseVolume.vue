<template>
  <!-- 布局容器 -->

  <div  class="page">
    <!--
    <x-header :left-options="{showBack: true, preventGoBack:false}" right-options="{showMore: true}"
              style="background-color:#fff;"><span style="color:#000;">分类信息</span><span slot="right" @click="onComplete" style="color:#04be02;">完成</span>
    </x-header>
    -->
    <header class="mui-bar mui-bar-nav mui-btn-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title" v-el:market>分类信息</h1>
      <span  @click="onComplete" style="color:#000; float: right;margin-top:12px;">完成</span>
    </header>


    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">
        <!-- 输入进货量 -->
        <section class="amount">
          <form action="" >
            <div class="input">
             <input type="text" id="weight" value="输入进货量" onfocus="if(this.value == '输入进货量') this.value = ''" onblur="if(this.value =='') this.value = '输入进货量'" />
            </div>
            <div class="weight">
              <span>kg</span>
            </div>
          </form>
        </section>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'


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
        var goodsId = this.$route.query.goodsId;
        var supplierId = this.$route.query.supplierId;
        var weight = document.getElementById("weight").value;
        var weight = weight;
        //执行登陆
        ajax.post("addtracingsource", {
          supplierId:supplierId,
          goodsIds:goodsId,
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
