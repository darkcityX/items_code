import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './http';

// 引入echarts
import echarts from 'echarts';

/** 引用element框架 **/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

/** 引入国际化插件 **/ 
import VueI18n from 'vue-i18n';

/**  自定义重置样式  **/
import '@/common/css/reset.css';

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

Vue.use(VueI18n); 			// 通过插件的形式挂载
const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识
    messages: {
        'zh-CN': require('./common/lang/zh'), // 中文语言包
		'en-US': require('./common/lang/en'), // 英文语言包
		'ko-KR': require('./common/lang/ko'), // 韩语语言包
		'ja-JP': require('./common/lang/ja'), // 日语语言包
    }
})


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	router,
	components: { App },
	template: '<App/>'
})
