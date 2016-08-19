<template>
  <div id= "bcid"></div>
  <input type='text' id='text' style="display:none"/>
</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var scan = null;
  //扩展API加载完毕后调用onPlusReady回调函数
  document.addEventListener( "plusready", onPlusReady, false );

  // 扩展API加载完毕，现在可以正常调用扩展API
  function onPlusReady() {
    var e = document.getElementById("scan");
    e.removeAttribute( "disabled" );
  }

  function onmarked( type, result ) {
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
    alert(text+result);
    ajax.post("checkPublished", {
      pageSize: "3",
      pageNum: "1",
      marketName:"bc96731e521811e6987cf8cab858db3f",
      text:text
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

  var dataItem;
  export default {
		name: "saoma",
		ready(){
        setTimeout(function(){
          scan = new plus.barcode.Barcode('bcid');
          scan.onmarked = onmarked;
          scan.start()
        }, 500);

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
        showUp() {
          scan = new plus.barcode.Barcode('bcid');
          scan.onmarked = onmarked;
          scan.start();
        },
        startRecognize() {
        	scan = new plus.barcode.Barcode('bcid');
        	scan.onmarked = onmarked;
        },
        startScan() {
        	scan.start();
        },
        cancelScan() {
        	scan.cancel();
          this.$router.go('/homepage');
        }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
	-webkit-user-select: none;
}
html,body{
	margin: 0px;
	padding: 0px;
	height: 100%;
}
#bcid {
	background:#000000;
	height:480px;
	width:360px;
}
</style>
