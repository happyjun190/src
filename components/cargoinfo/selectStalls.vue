<template>
    
  <div  class="page">
    <x-header :left-options="{showBack: true}" style="background-color:#fff;"><span style="color:#000;">请选择档口</span></x-header>
    <scroller lock-x v-ref:scroller height="-44px" class="content">
      <div class="box">

        <!-- 选择档口 -->
        <section class="select">
          <div class="common">
            <span>常用档口：</span>
            <span>12号</span>
          </div>
          <ul>
            <a href="JavaScript:void(0)" @click="goPurchaseVolume"><li>1号</li></a>
            <li>2号</li>
          </ul>
        </section>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller,XHeader,Box} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var dataItem;
  export default {
		name: "selectStalls",
		ready(){

		},
		components: {
	    Scroller,XHeader,Box
	  },
		data() {
			return {
        dataItem:""
			}
		},
		methods: {
      goPurchaseVolume(event) {
        var goodsId = this.$route.query.goodsId;
        var marketId = this.$route.query.marketId;
        var supplierId = event.target.attributes["supplierId"].value;
        this.$router.go({path:'/purchaseVolume',
                         query:{goodsId:goodsId,marketId:marketId,supplierId:supplierId}, 
                         params:{goodsId:goodsId,marketId:marketId,supplierId:supplierId}
                       });
      }
		}
	}
</script>
