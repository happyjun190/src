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
            <form action="">
            <input type="text" value="请输入关键词" onfocus="if(this.value == '请输入关键词') this.value = ''" onblur="if(this.value =='') this.value = '请输入关键词'" />
            </form>
            <div class="search">
              <img src="../../assets/images/search.png" alt="">
            </div>
          </div>
          <div class="history complete">
            <a href="cargo_information_1.html">完成</a>
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
            <div class="panel panel-default"  v-for="item1 in dataItem.vegetables1">
              <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   <span>叶菜</span>
                   <div class="img">

                    <img class="arrow arrow_1" src="../../assets/images/up.png" down="../../assets/images/down.png" alt="" show="1" @click="fnImg('arrow_1')" />

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
                        <a href="">大白菜</a>
                        <a href="">菠菜</a>
                        <a href="">西洋菜</a>
                        <a href="">番薯叶</a>
                      </div>
                      <div class="greens_dowm dowm">
                        <a href="">包菜</a>
                        <a href="">油麦菜</a>
                        <a href="">菜心</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 肉类 -->
        <article class="big_category">
          <div class="vegetables_1">
            <span>肉类</span>
          </div>
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

            <div class="panel panel-default" v-for="item2 in dataItem.vegetables2">
              <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="true" aria-controls="collapseEight" @click="myFunction()">
                   <span>冷冻鱼鲜肉类</span>
                   <div class="img">
                    <img src="../../assets/images/down.png" alt="." id="d_j" @click="fnImg(this,'d_h')" />

                    <img id="d_h" style="display:none;" src="../../assets/images/up.png" alt="." @click="fnImg(this,'d_j')" />
                   </div>
                  </a>
                </h4>
              </div>
              <div id="collapseEight" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body body">

                  <!-- 蔬菜名 -->
                  <div class="vegetables">
                    <div class="greens">
                      <div class="greens_up up">
                        <a href="">大白菜</a>
                        <a href="">菠菜</a>
                        <a href="">西洋菜</a>
                        <a href="">番薯叶</a>
                      </div>
                      <div class="greens_dowm dowm">
                        <a href="">包菜</a>
                        <a href="">油麦菜</a>
                        <a href="">菜心</a>
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
  export default {
		name: "classification",
		ready(){

		},
		components: {
	    Scroller,Checklist,Box,XButton
	  },
		data() {
			return {
        dataItem:{"vegetables1":[1,2],"vegetables2":[3,4,5,6]}
			}
		},
		methods: {
			//登陆
			onLogin(){
					this.disablevalue=true;
					//执行登陆
					ajax.post("checkPublished", {
						pageSize: "3",
						pageNum: "1",
						marketName:"bc96731e521811e6987cf8cab858db3f"
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
			},
      //
      fnImg(_x){
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
      }

		}
	}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../assets/css/allCss.css"></style>
