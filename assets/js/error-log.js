/**
 *
 * 错误日志文件为JSON格式数据，如下：
[{
  "time":"",//出错时间，本地时间
  "url":"",//错误信息的接口地址如果有就记录
  "type":"",//接口错误类型
  "status":"",//接口错误状态
  "data":"",//发送给接口的数据，如果有就记录
	"error":"",//错误信息
  "responseText":""//服务器返回的错误
}]
 *
 */
;(function() {
	var errorDir = "error",//本地保存错误日记描述目录和
		errorFile = "error.log", //本地保存错误日记描述文件名
	  lastcheck_key="lastcheck",//最后清理缓存的时间的键名
		check_cache = 604800000, //检查缓存间隔，单位为ms,7天为7*24*60*60*1000=604800000, 如果每次调用需要检查设置值为0
		dir = null;
	//错误信息处理
	function error_dispose(new_data){
	  plus_ready(function(){
	    init(function(){
	      read(function(old_data){
	        var init_data=[];
	        if(old_data&&!del_check()){
	          init_data=old_data
	        }
	        //错误时间
	        new_data.time=getNowFormatDate();
	        //添加新的错误信息
	        init_data.push(new_data)
	        write(init_data,function(){
	          // plus.nativeUI.toast("错误日志写入成功");
	        })
	      })
	    })
	  })
	}
	//初始化doc目录
	function init(callback) {
		// 打开doc根目录
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
			fs.root.getDirectory(errorDir, {
				create: true
			}, function(entry) {
				dir = entry;
	      callback();
			}, function(e) {
				plus.nativeUI.toast("准备错误日记操作，打开error目录失败：" + e.message);
			});
		}, function(e) {
			plus.nativeUI.toast("准备错误日记操作，打开doc目录失败：" + e.message);
		});
	}
	//检查是否需要删除缓存
	function del_check(){
	  // 判断检查时间
		var lastcheck = plus.storage.getItem(lastcheck_key);
	  var dn = (new Date()).getTime();
		if (lastcheck) {
			var dc = parseInt(lastcheck);
			if (dn - dc < check_cache) { // 未超过上次升级检测间隔
				return false;
			}else {
	      plus.storage.setItem(lastcheck_key,dn.toString());
			  return true
			}
		}else{
	    plus.storage.setItem(lastcheck_key,dn.toString());
	    return false;
	  }
	}
	//读取文件内容
	function read(callback){
	  dir.getFile(errorFile, {
			create: false
		}, function(fentry) {
			fentry.file(function(file) {
				var reader = new plus.io.FileReader();
				reader.onloadend = function(e) {
					var data = null;
	        if(e.target.result){
	          try {
	  					data = JSON.parse(e.target.result);
	  				} catch (e) {
	  					plus.nativeUI.toast("读取本地错误日记文件，数据格式错误！");
	            return;
	  				}
	          callback(data)
	        }else {
	          callback(false)
	        }
				}
				reader.readAsText(file);
			}, function(e) {
				plus.nativeUI.toast("读取本地错误日记文件，获取文件对象失败：" + e.message);
			});
		}, function(e) {
			// 失败表示文件不存在，从服务器获取错误日记数据
			callback(false);
		});
	}
	//写入文件内容
	function write(data,callback){
	  dir.getFile(errorFile, {
	    create: true
	  }, function(fentry) {
	    fentry.createWriter(function(writer) {
	      writer.onerror = function() {
	        plus.nativeUI.toast("获取错误日记数据，保存文件失败！");
	      }
	      writer.onwrite = function(){
	        callback()
	      }
	      writer.write(JSON.stringify(data));
	    }, function(e) {
	      plus.nativeUI.toast("获取错误日记数据，创建写文件对象失败：" + e.message);
	    });
	  }, function(e) {
	    plus.nativeUI.toast("获取错误日记数据，打开保存文件失败：" + e.message);
	  });
	}
	//获取本地时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();

	    var currentdate = date.getFullYear()
	            + seperator1
	            + format(month)
	            + seperator1
	            + format(strDate)
	            + " "
	            + format(date.getHours())
	            + seperator2
	            + format(date.getMinutes())
	            + seperator2
	            + format(date.getSeconds());
	    return currentdate;
	    function format(data){
	      if (data >= 1 && data <= 9) {
	          return "0" + data;
	      }
	      return data
	    }
	}

	var plus_ready = function(callback) {
		if (window.plus) {
			callback();
		} else {
			document.addEventListener("plusready", callback, false);
		}
	}
	module.exports = error_dispose
})();
