import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * (resolve) => require(['@/components/teacher/TeacherInfoCase.vue'], resolve) 这种方式有利于减轻项目第一次加载网页的负担
 */

const router = new Router({
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 });
      }, 0);
    });
  },
  // mode: 'history',
  routes: [
    // 首页
    {
      path: "/",
      redirect:'/kuangchi'
    },
    //矿池
    {
      path: "/kuangchi",
      name: "kuangchi",
      component: () => import("@/views/kuangchi.vue")
    },
    // { // 模拟——————团队收益list----删除
    //     path: "/teamList",
    //     name: "teamList",
    //     component: () => import("@/components/TeamList.vue")    
    // }
  ]
});

//  退出登录的时候需要删除session
//  全局导航守卫钩子
// router.beforeEach((to, from, next) => {
//   let isLogin = sessionStorage.token ? true : false; // 判断是否是登录状态 看sessionStorage有没有token
//   if (to.path == "/loginbeforezf" || to.path == "/loginzf" || to.path == "/forgetpwdzf" || to.path == "/registerzf" || to.path == "/register2zf" || to.path == "/register3zf") {
//     // 判断是不是在login和home页面如果是  放行
//     next();
//   } else {
//     isLogin ? next() : router.push("/loginbeforezf"); // 判断是不是登录状态，如果是就放行 不是回到login页面
//   }
// });

export default router
