/* ---------------------- 该文件为路由文件 -------------------------------- */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{ // 【启动页】
			path: '*',
			redirect: '/home',
		},
		{ // 【启动页】
			path: '/',
			name: '',
			component: e => import('@/views/Launch.vue')
		},
		{ // 【登陆/首页】
			path: '/home',
			name: '',
			component: e => import('@/views/Login')
		},
		{ // 【注册页面】
			path: '/registerPage',
			name: 'registerPage',
			component: e => import('@/views/Register')
		},
		{ // 【原子联盟】
			path: '/alliancePage',
			// name: 'alliancePage',
			component: e => import('@/views/AlliancePage'),
			children: [
				{ // 【我的奖励】页面 原子联盟默认入口页面
					path: '/',
					component: e => import('@/views/AlliancePages/MyReward'),
				},
				{ // 【我的奖励】页面
					path: 'myReward',
					name: 'myReward',
					component: e => import('@/views/AlliancePages/MyReward'),
				},
				{ // 【奖励规则】页面
					path: 'rewardRules',
					name: 'rewardRules',
					component: e => import('@/views/AlliancePages/RewardRules'),
				},
				{ // 【我的盟友】页面
					path: 'myAlly',
					name: 'myAlly',
					component: e => import('@/views/AlliancePages/MyAlly'),
				},
				{ // 【我的邀请】页面
					path: 'myInvitation',
					name: 'myInvitation',
					component: e => import('@/views/AlliancePages/MyInvitation'),
				},
				{ // 【我的资产】页面
					path: 'myAssets',
					name: 'myAssets',
					component: e => import('@/views/AlliancePages/MyAssets'),
					children: [
						{// 【我的钱包】页面
							path: 'myPurse',
							name: 'myPurse',
							component: e => import('@/views/AlliancePages/MyAssets/MyPurseIndex'),
						},
						{// 【人民币提现】页面/【人民币提现弹窗（客服）】页面
							path: 'withdrawalRmb',
							name: 'withdrawalRmb',
							component: e => import('@/views/AlliancePages/MyAssets/WithdrawalRmb'),
                        },
                        {// 【人民币兑换原子币】页面/【兑换成功】页面
							path: 'exchange',
							name: 'exchange',
							component: e => import('@/views/AlliancePages/MyAssets/Exchange'),
                        },
						{// 【绑定支付宝账号】页面/【绑定成功（提示框）】页面
							path: 'alipay',
							name: 'alipay',
							component: e => import('@/views/AlliancePages/MyAssets/Alipay'),
						},
						{// 【绑定微信】页面/【绑定成功（提示框）】页面
							path: 'weChat',
							name: 'weChat',
							component: e => import('@/views/AlliancePages/MyAssets/WeChat'),
						},
						{// 【绑定银行卡】页面/【绑定成功（提示框）】页面
							path: 'bankCard',
							name: 'bankCard',
							component: e => import('@/views/AlliancePages/MyAssets/BankCard'),
						},
						{// 【原子币提现原子币提现】页面/【弹窗（客服）】页面
							path: 'withdrawalAtomicCurrency',
							name: 'withdrawalAtomicCurrency',
							component: e => import('@/views/AlliancePages/MyAssets/WithdrawalAtomicCurrency'),
						},
					]

				},
				{ // 【我的消息】页面
					path: 'myMessage',
					name: 'myMessage',
					component: e => import('@/views/AlliancePages/MyMessage'),
				},
				{ // 【联系客服】页面
					path: 'contactCustomerService',
					name: 'contactCustomerService',
					component: e => import('@/views/AlliancePages/ContactCustomer'),
				},
				{ // 【提高奖励】页面
					path: 'increaseRewards',
					name: 'increaseRewards',
					component: e => import('@/views/AlliancePages/ImproveRewards'),
				}
			]
		},
		{ // 【我的订单】
			path: '/myProduct',
			name: 'myProduct',
			redirect: '/myProduct/all_product',
			component: e => import('@/views/MyProduct/MyProduct.vue'),
			children: [
				{
					path: '/myProduct/all_product',
					name: 'all_product',
					component: e => import('@/views/MyProduct/AllProduct.vue')
				}
			]
		},
		{// 【账户设置】
			path: '/accountSettingsPage',
			name: 'accountSettingsPage',
			component: e => import('@/views/AccountSettings'),
			children: [
				{// 【个人资料】页面
					path: 'personalInformation',
					name: 'personalInformation',
					component: e => import('@/views/AccountSettings/PersonalInfo'),
				},
				{// 【收获地址】页面
					path: 'shippingAddress',
					name: 'shippingAddress',
					component: e => import('@/views/AccountSettings/ShippingAddress'),
				},
				{// 【修改密码】页面
					path: 'editPassword',
					name: 'editPassword',
					component: e => import('@/views/AccountSettings/EditPassword'),
				},
			]
		},
		{ // 产品详情页
			path: '/product_del',
			name: 'product_del',
			component: e => import('@/views/ProductDel')
		},
		{ // 购物车
			path: '/cart',
			name: 'cart',
			component: e => import('@/views/Cart')
		},
		{ // 订单
			path: '/order',
			name: 'order',
			component: e => import('@/views/Order')
		},
		{ // 忘记密码
			path: '/telChangePwd',
			name: 'telChangePwd',
			component: e => import('@/views/TelChangePwd')
		},
	]
});