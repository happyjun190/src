<template>
  <div>
    <router-view v-ref:app :transition="transitionName" keep-alive></router-view>
  </div>
</template>

<script>
import ajax from 'src/ajax/index.js'
export default {
  name: "app",
  ready(){
    //打印
    this.$on('PRINT', ()=> {
        let print_data=null
        //window.print要打印的内容
    		if(window.print){
    			print_data=window.print
    			plus.storage.setItem("print_data",JSON.stringify(window.print));
    		}else {
    			print_data=JSON.parse(plus.storage.getItem("print_data"))
    		}
        let print_time=plus.storage.getItem("print_time")
        let time=3
        if(print_time){
          time+=Number(print_time)
        }
        let type=1
        if(plus.device.model!="DH9600"){
          type=0
        }
    })

  },
  attached() {
    //切换动画
    this.$router.beforeEach((transition)=> {
      if (transition.to.path === '/forbidden') {
        transition.abort()
      } else {
        if(window.afterEnter){
          if(transition.to.path=="/"){
            this.transitionName="popIn"
            window.newPage=true
            this.record=[]
          }else if(!this.contains(transition.to.path,transition.from.path)){
            this.transitionName="popIn"
            window.newPage=true
          }else {
            this.transitionName="popOut"
            window.newPage=false
          }
          setTimeout(()=> {
            transition.next()
          }, 0)
        }
      }
    })
    this.$router.afterEach((transition)=> {
      if(transition.to.path=="/index"||transition.to.path=="/"){
        mui.back=this.back
      }else {
        mui.back=this.mui_back
      }
    })
  },
  data() {
	   return {
       transitionName: 'popIn',
       record:[],
       first:false
     }
  },
  methods: {
    //判断浏览前进后退
    contains(to_path,form_path){
      if(this.array_remove(to_path)){
        this.array_remove(form_path,true)
        return true
      }
      this.record.push(to_path)
      return false;
    },
    //删除一个浏览记录
    array_remove(val,remove){
      if(this.record.length!=1){
        for (var i = 0; i < this.record.length; i++) {
            if (this.record[i] == val) {
              if(remove){
                this.record.splice(i,1);
              }
              return true
            }
        }
      }
      return false;
    },
    //后退逻辑
    mui_back(){
      window.history.back(-1)
    },
    //首次按键，提示‘再按一次退出应用’
    back() {
      if (!this.first) {
        this.first = new Date().getTime();
        mui.toast('再按一次退出应用');
        setTimeout(() =>{
          this.first = false;
        }, 1000);
      } else {
        if (new Date().getTime() - this.first < 1000) {
          plus.runtime.quit();
        }
      }
    },
    //查询会员卡信息
    cardGet(cardNum){
      ajax.get("card",{"codeCardFace":cardNum},(status,data)=>{
        if(status){
          if(data.length==0){
            mui.toast("没有查询到该会员卡的信息")
          }else if(data[0].cardStatus!="0"){
            switch (data[0].cardStatus) {
              case "1":mui.toast("该卡已停用");break;
              case "2":mui.toast("该卡已冻结");break;
              case "3":mui.toast("该卡未激活");break;
              case "4":mui.toast("该卡已挂失");break;
              case "5":mui.toast("该卡已退卡");break;
              case "6":mui.toast("该卡已换卡");break;
              default:
            }
          }else {
            mui.toast("余额："+data[0].balance)
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
