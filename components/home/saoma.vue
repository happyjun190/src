<template>
  <!--<input type='button' @click="closeCurrentPage" value='返回' />-->
  <!--<x-header :left-options="{showBack: true}" style="background-color:#04be02;">扫码</x-header>-->
<div class="page" id="page">
  <header class="mui-bar mui-bar-nav">
    <span class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></span>
    <h1 class="mui-title">扫码</h1>
  </header>
  <scroller lock-x v-ref:scroller class="content full_screen">
    <div class="box">
        <div id="bcid"></div>
    </div>
  </scroller>
</div>
</template>

<script>
  import {Scroller} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'
  export default {
		name: "saoma",
    ready() {

    },
		attached(){
      if(window.plus){
        setTimeout(()=>{
          this.scan = new plus.barcode.Barcode('bcid',[plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],{frameColor:'#00FF00',scanbarColor:'#00FF00'});
          this.scan.onmarked = this.onmarked;
          this.scan.start()
        },300)
      }
		},
		components: {
	    Scroller
	  },
		data() {
			return {
        scan:""
			}
		},
    route: {
      deactivate(transition) {
        this.scanclose()
        transition.next()
      }
    },
		methods: {
      scanclose(){
        if(window.plus){
          this.scan.close();
        }
      },
      onmarked( type, result ) {
        var text = '未知: ';
        switch(type){
          case plus.barcode.QR:
          text = 'QR: ';
          break;
          case plus.barcode.EAN13:
          text = 'EAN13: ';
          break;
          case plus.barcode.EAN8:
          text = 'EAN8: ';
          break;
        }
        //执行
        ajax.post("qrcScanedQuery", {
          qrcode:result
        }, (status,data) => {
          if(status){
            if(data!=null){
              var type = data.type;
              if(type=='order') {
                this.$router.go({path:'/checkPublishedDb',
                                 query:{orderId:data.sell.id},
                                 params:{orderId:data.sell.id}
                               });
              } else {
                if(type=='shop') {
                  this.$router.go({path:'/tracingSourceSaoma',
                                   query:{shopId:data.shop.id,marketId:data.shop.market.id},
                                   params:{shopId:data.shop.id,marketId:data.shop.market.id}
                                 });
                } else {
                  mui.toast("未检测到数据");
                  setTimeout(()=>{
                    this.scan.cancel();
                    this.scan.start();
                  },2000)
                }
              }

            }else{
              mui.toast("未检测到数据");
              setTimeout(()=>{
                this.scan.cancel();
                this.scan.start();
              },2000)
            }
          } else {
            mui.toast("未检测到数据");
            setTimeout(()=>{
              this.scan.cancel();
              this.scan.start();
            },2000)
          }
        },false)
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin: 0 !important;
}
#bcid {
	background:#000000;
	width:100%;
  position: absolute;
	top: 44px;
	bottom: 0px;
	text-align: center;
}
</style>
