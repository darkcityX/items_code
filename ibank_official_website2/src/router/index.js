import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: e => import('@/views/Index')
		},
		{
			path: '/other',
			name: '/other',
			component: e => import('@/views/Other')
		}
  ]
})
