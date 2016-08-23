<template>
    <!-- 头部
    <section class="header">
      <header class="title volume">
        <div class="up">
         <a href="javascript:history.go(-1);">
          <img src="../../assets/images/left_1.png" alt="">
    </a>
        </div>
        <div class="food_name">
          <a href="JavaScript:void(0)">请选择档口</a>
        </div>
        <div class="history images">
          <img src="../../assets/images/shut.png" alt="">
        </div>
      </header>
    </section>
    -->
    <x-header :left-options="{showBack: true}" style="background-color:#fff;"><span style="color:#000;">请选择档口</span></x-header>
    <scroller lock-x v-ref:scroller class="full_screen">
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
</template>

<script>
  import { Scroller,XHeader,Box} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
  }

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
      goPurchaseVolume() {
        this.$router.go('/purchaseVolume');
      }
		}
	}
</script>
