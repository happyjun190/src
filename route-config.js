//配置页面
module.exports = function(router) {
	router.map({
		//商家端
		'/': {
			component: function (resolve) {
				require(['./components/login/login.vue'], resolve)
			}
		},
		//商家注册
		'/login/register': {
			component: function (resolve) {
				require(['./components/login/register.vue'], resolve)
			}
		},
		//商家注册.密码
		'/login/register-password': {
			component: function (resolve) {
				require(['./components/login/register-password.vue'], resolve)
			}
		},
		//忘记密码.手机验证
		'/login/forgot-phone': {
			component: function (resolve) {
				require(['./components/login/forgot-phone.vue'], resolve)
			}
		},
		//忘记密码
		'/login/forgot-password': {
			component: function (resolve) {
				require(['./components/login/forgot-password.vue'], resolve)
			}
		},

		//主页
		'/homepage': {
			component: function (resolve) {
				require(['./components/home/homepage.vue'], resolve)
			}
		},
		'/saoma': {
			component: function (resolve) {
				require(['./components/home/saoma.vue'], resolve)
			}
		},
		//抽检结果列表
		'/checkPublished': {
			component: function (resolve) {
				require(['./components/home/checkPublished.vue'], resolve)
			}
		},
		//抽检结果详情
		'/checkPublishedDb': {
			component: function (resolve) {
				require(['./components/home/checkPublishedDb.vue'], resolve)
			}
		},
		//溯源信息查询
		'/tracingSource': {
			component: function (resolve) {
				require(['./components/home/tracingSource.vue'], resolve)
			}
		},
		//溯源信息查询
		'/tracingSourceSaoma': {
			component: function (resolve) {
				require(['./components/home/tracingSourceSaoma.vue'], resolve)
			}
		}

	});
}
