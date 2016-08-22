<template>
    <!-- 布局容器 -->
    <section class="container-fluid">
    <!-- 头部 -->
      <section class="header">
        <header class="title">
          <div class="up">
           <a href="javascript:history.go(-1);">
            <img src="../../assets/images/left_1.png" alt="" class="zh_img">
           </a>
          </div>
          <div class="food_name">
            <input type="text" value="请输入关键词" onfocus="if(this.value == '请输入关键词') this.value = ''" onblur="if(this.value =='') this.value = '请输入关键词'" />
          </div>
          <div class="history complete">
            <a href="JavaScript:void(0)" @click="onComplete">完成</a>
          </div>
        </header>
      </section>
      <!-- 分类 -->
      <section class="category">
      <!-- 蔬菜 -->
        <article class="big_category">

          <img class="arrow_down" src="../../assets/images/down.png" style="display:none;" alt=""  />
          <img class="arrow_up" src="../../assets/images/up.png" style="display:none;" alt="" />

            <div class="vegetables_1">
              <span>蔬菜</span>
            </div>
            <!-- 下拉 -->
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
              <div class="panel panel-default"  v-for="(index, item) in dataItem">
                <div class="panel-heading" role="tab" id="headingOne">
                  <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                     <span>{{item.goodsClassify.name}}</span>
                     <div class="img">
                        <img class="arrow arrow_{{index+1}}" src="../../assets/images/up.png" down="../../assets/images/down.png" alt="" show="{{index+1}}" @click="fnImg" />
                     </div>
                    </a>
                  </h4>
                </div>
                <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                  <div class="panel-body">
                    <!-- 蔬菜名 -->
                    <div class="vegetables">
                      <div class="greens">
                        <div class="greens_up up">
                          <span v-for="goods in item.goods">
                            <a href="JavaScript:void(0)" @click="selectGoods" goodsId="{{goods.goods.id}}" class="goodsclass" v-if="goods.selected==0">{{goods.goods.name}}</a>
                            <a href="JavaScript:void(0)" @click="selectGoods" goodsId="{{goods.goods.id}}" class="goodsclass colorChange" v-else>{{goods.goods.name}}</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



        </article>

      </section>
    </section>
</template>


<script>
  import { Scroller,Checklist,Box,XButton} from 'vux'
  import ajax from 'src/ajax/index.js'
  import encryption from 'src/assets/js/encryption.js'

  var dataItem;
  var type;
  export default {
		name: "classification",
		ready(){
      //执行登陆
      ajax.post("classification", {
        pageSize:10000,
        pageNum:1
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
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
        dataItem:"",
        type:0
			}
		},
		methods: {
      //下拉展开函数
      fnImg(){

        var arrow_down = $('.arrow_down').attr('src');
        var arrow_up = $('.arrow_up').attr('src');
        var show = $('.'+_x).attr('show');

        if(show == 1){
            $('.'+_x).attr('src',arrow_down);
            $('.'+_x).attr('show',2);
        }else{
           $('.'+_x).attr('src',arrow_up);
           $('.'+_x).attr('show',1);
        }
        //_this.style.display = 'none';
        //document.getElementById('d_i').style.display = 'none';
        //document.getElementById('d_i').style.src = '../../assets/images/down.png';
        //$('#d_i').attr('src','src/assets/images/down.png');
        //document.getElementById(_x).style.display = 'block';
      },

      onComplete() {
        var goodsIdArray=new Array();
        var index = 0;
        $(".goodsclass").each(function(){
          
          var goodsId = $(this).attr('goodsId');
          var goodsClass = $(this).attr('class');
          //alert(goodsClass);
          if(goodsClass=="goodsclass") {
            //DO NOTHING
          } else {
            goodsIdArray[index++] = goodsId;
          }

        });

        if(goodsIdArray.length==0) {
          this.$router.go('/cargoinfo');
        } else {
          var goodsIdStr = goodsIdArray.toString();
          //执行登陆
          ajax.post("addtracingsource", {
            userId:"",
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
      selectGoods(evt) {
        var goodsclass = $(evt.target).attr('class');
        if(goodsclass=="goodsclass") {
          $(evt.target).addClass("colorChange");
        } else {
          $(evt.target).removeClass("colorChange");
        }
      }

		}
	}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
