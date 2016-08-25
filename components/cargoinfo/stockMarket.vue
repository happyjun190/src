<template>
  <div  class="page">
    <x-header :left-options="{showBack: true}" style="background-color:#fff;">
      <span style="color:#000;">请选择进货市场</span>
    </x-header>

    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">

        <!-- 选择市场 -->
        <section class="select">
          <div class="common">
            <span>常用市场：</span>
            <span>山东祁连大棚蔬菜养殖基地5</span>
          </div>
          <ul class="num">
            <a href="JavaScript:void(0)" @click="goSelectStalls" v-for="item in dataItem"><li supplierId="{{item.id}}">{{item.name}}</li></a>
          </ul>
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
        //查询供货市场列表
        ajax.post("getSellerSupplier", {
          
        }, (status,data) => {
          if(status){
            //TODO
            if(data!=null){
              //alert(JSON.stringify(data));
              this.dataItem = data;
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
        dataItem:""
			}
		},
		methods: {
      goSelectStalls(event) {
        var goodsId = this.$route.query.goodsId;

        var supplierId = event.target.attributes["supplierId"].value;

        this.$router.go({
          path:'/purchaseVolume',
          params:{goodsId:goodsId,supplierId:supplierId},
          query:{goodsId:goodsId,supplierId:supplierId}
        })
      }
		}
	}
</script>
