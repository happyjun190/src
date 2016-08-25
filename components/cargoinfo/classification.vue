<template>
    <!-- 布局容器
    <div  class="page">
      <x-header :left-options="{showBack: true, preventGoBack:false}" right-options="{showMore: true}"
                style="background-color:#fff;"><span style="color:#000;">分类信息</span><span slot="right" @click="onComplete" style="color:#04be02;">完成</span>
      </x-header>-->
    <div  class="page">
      <header class="mui-bar mui-bar-nav mui-btn-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title" v-el:market>分类信息</h1>
        <span  @click="onComplete" style="color: #04be02;float: right;margin-top:12px;">完成</span>
      </header>

      <scroller lock-x v-ref:scroller height="-44px" class="content">
        <div class="box">
          <img id="arrow_down" src="../../assets/images/down.png" style="display:none;" alt=""  />
          <img id="arrow_up" src="../../assets/images/up.png" style="display:none;" alt="" />
          <!-- 分类 -->
          <section class="category">
          <!-- 蔬菜 -->
            <article class="big_category">
              <div v-for="category1 in dataItem">
                <div class="vegetables_1">
                  <span>{{category1.goodsClassify.name}}</span>
                </div>
                <!-- 下拉 -->
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  <!-- <ul class="mui-table-view" v-for="category2 in category1.goodsQueryResults" style="padding-left:8px;padding-right:8px;"> -->
                  <ul class="mui-table-view" v-for="category2 in category1.goodsQueryResults">
                      <li class="mui-table-view-cell mui-collapse">
                          <a class="mui-navigate-right" href="#" style="color:#04be02;font-size:1.3rem;background-color:#e9e9e9;">{{category2.goodsClassify.name}}</a>
                          <div class="mui-collapse-content" style="padding-body:0px">
                            <div class="vegetables">
                              <div class="greens">
                                <div class="greens_up up">
                                  <span v-for="goods in category2.goods">
                                    <a href="JavaScript:void(0)" @click="selectGoods" goodsId="{{goods.goods.id}}" class="goodsclass" v-if="goods.selected==0">{{goods.goods.name}}</a>
                                    <a href="JavaScript:void(0)" @click="selectGoods" goodsId="{{goods.goods.id}}" class="goodsclass colorChange" v-else>{{goods.goods.name}}</a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                      </li>
                  </ul>


                  <!-- <div class="panel panel-default"  v-for="category2 in category1.goodsQueryResults">
                    <div class="panel-heading" role="tab" id="headingOne">
                      <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="JavaScript:void(0)" aria-expanded="true" aria-controls="collapseOne">
                         <span>{{category2.goodsClassify.name}}</span>
                         <div class="img">
                            <img src="../../assets/images/down.png" class="down" alt="" @click="fnImg" goodClassifyId="{{category2.goodsClassify.id}}"/>
                         </div>
                        </a>
                      </h4>
                    </div>

                    <div class="{{category2.goodsClassify.id}}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne" style="display:none">
                      <div style="padding-body:0px">
                        <div class="vegetables">
                          <div class="greens">
                            <div class="greens_up up">
                              <span v-for="goods in category2.goods">
                                <a href="JavaScript:void(0)" @click="selectGoods" goodsId="{{goods.goods.id}}" class="goodsclass" v-if="goods.selected==0">{{goods.goods.name}}</a>
                                <a href="JavaScript:void(0)" @click="selectGoods" goodsId="{{goods.goods.id}}" class="goodsclass colorChange" v-else>{{goods.goods.name}}</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>

              </div>

            </article>
          </section>
        </div>
      </scroller>
    </div>
</template>


<script>
  import {Scroller,Box,XHeader} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var dataItem;
  var type;
  export default {
		name: "classification",
		ready(){
      //执行登陆
      ajax.post("classification", {

      }, (status,data) => {
        if(status){
          if(data!=null){
            this.dataItem = data;
            this.type = 1;
            mui.toast("获取数据成功");
          }else{
            mui.toast("没有获取到有效数据");
          }
        }
        //this.disablevalue=false;
      },false)
		},
		components: {
	    Scroller,Box,XHeader
	  },
		data() {
			return {
        dataItem:"",
        type:0
			}
		},
		methods: {
      //下拉展开函数
      fnImg(event){
        var arrow_down = document.getElementById('arrow_down').src;
        var arrow_up = document.getElementById('arrow_up').src;
        var class1 = event.target.attributes["class"].value;
        var goodClassifyId = event.target.attributes["goodClassifyId"].value

        if(class1=='down') {
          event.target.setAttribute('src', arrow_up);
          event.target.setAttribute('class', 'up');
        } else {
          event.target.setAttribute('src', arrow_down);
          event.target.setAttribute('class', 'down');
        }
        //alert(document.getElementsByClassName(goodClassifyId)[0].attributes['class'].value);
        var displayValue = document.getElementsByClassName(goodClassifyId)[0].attributes['style'].value;

        if(displayValue=='') {
          document.getElementsByClassName(goodClassifyId)[0].setAttribute('style','display:none')
        } else {
          document.getElementsByClassName(goodClassifyId)[0].setAttribute('style','')
        }
      },

      onComplete() {
        var goodsIdArray=new Array();
        var index = 0;
        var i;
        var goodsClassObjs =  document.getElementsByClassName('goodsclass');
        for (i = 0; i < goodsClassObjs.length; i++) {
          var goodsId = goodsClassObjs[i].attributes["goodsId"].value;
          var goodsClass = goodsClassObjs[i].attributes['class'].value;
          if(goodsClass=="goodsclass") {
            //DO NOTHING
          } else {
            goodsIdArray[index++] = goodsId;
          }
        }
        if(goodsIdArray.length==0) {
          this.$router.go('/cargoinfo');
        } else {
          var goodsIdStr = goodsIdArray.toString();
          //执行登陆
          ajax.post("addtracingsource", {
            supplierId:"",
            goodsIds:goodsIdStr,
            weigth:0
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

      },
      selectGoods(event) {
        var goodsclass = event.target.attributes["class"].value;
        if(goodsclass=="goodsclass") {
          event.target.setAttribute('class','goodsclass colorChange');
          //$(evt.target).addClass("colorChange");
        } else {
          event.target.setAttribute('class','goodsclass');
          //$(evt.target).removeClass("colorChange");
        }
      }

		}
	}

</script>
