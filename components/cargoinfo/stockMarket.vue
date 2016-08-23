<template>
  <!-- 布局容器 -->
    <section class="container-fluid">
    <!-- 头部 -->
      <section class="header">
        <header class="title volume">
          <div class="up">
           <a href="javascript:history.go(-1);">
            <img src="../../assets/images/left_1.png" alt="">
      </a>
          </div>
          <div class="food_name">
            <a href="JavaScript:void(0)">请选择进货市场</a>
          </div>
          <div class="history images">
            <img src="../../assets/images/shut.png" alt="">
          </div>
        </header>
      </section>
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
    </section>
</template>

<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
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
        //查询供货市场列表
        ajax.post("getSellerSupplier", {
          pageSize: 3,
          pageNum: 1
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
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
        dataItem:""
			}
		},
		methods: {
      goSelectStalls(event) {
        //var goodsId = getUrlParam('goodsId');
        var goodsId = this.$route.query.goodsId;
        var supplierId = $(event.target).attr("supplierId");
        //var goodsId = $(event.target).attr('goodsId');
        //alert(supplierId+":"+goodsId);
        //this.$router.go('/selectStalls?supplierId='+supplierId+'&goodsIds='+goodsId);
        this.$router.go({
          path:'/selectStalls',
          params:{goodsId:goodsId,supplierId:supplierId},
          query:{goodsId:goodsId,supplierId:supplierId}
        })
      }
		}
	}
</script>
