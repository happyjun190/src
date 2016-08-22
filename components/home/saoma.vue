<template>
  <input type='button' @click="cancelScan" value='返回' />
  <div id= "bcid"></div>
  <input type='text' id='text' style="display:none"/>
</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var scan = null;
  //扩展API加载完毕后调用onPlusReady回调函数
  function plusReady() {

  }
  //扩展API加载完毕后调用onPlusReady回调函数
  if(window.plus) {
     plusReady();
  } else {
    document.addEventListener( "plusready", plusReady, false );
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
    
    var ws=plus.webview.currentWebview();
    var words = ws.getURL().split('#!');
    var baseURL = words[0]+'#!/';
    //执行登陆
    ajax.post("qrcScanedQuery", {
      pageSize: "3",
      pageNum: "1",
      qrcode:result
    }, (status,data) => {
      if(status){
        if(data!=null){
          var type = data[0].type;
          var w;
          if(type=='order') {
              baseURL = baseURL+'checkPublishedDb?orderId='+data[0].sell.id;
              w = plus.webview.create(baseURL);
          } else {
              baseURL = baseURL+'inquire?shopId='+data[0].shop.id+'&marketId='+'';
              //w = plus.webview.create(baseURL,'inquireView',{},{shopId:data[0].shop.id,marketId:""});
              w = plus.webview.create(baseURL);
          }          
          w.show();
          //mui.toast("获取测试数据成功");
        }else{
          mui.toast("获取扫码数据失败");
        }
      }
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
        }, 100);
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
        cancelScan() {
          var ws=plus.webview.currentWebview();
          plus.webview.close(ws);
        },
        startScan() {
          scan.start();
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
