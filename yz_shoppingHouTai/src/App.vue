<template>
  <div id="app">
    <!-- 头部 -->
    <Header v-if="isShow"/>
    <!-- 路由视图 -->
    <router-view/>
    <!-- 脚页 -->
    <Footer v-if="isShow"/>
  </div>
</template>

<script>
// 引入头部组件
import Header from "@/components/Header";
// 引入尾部组件
import Footer from "@/components/Footer";
export default {
  name: "App",
  data() {
    return {
      isShow: true
    };
  },
  components: {
    Header,
    Footer
  },
  watch: {
    $route(to, from) {
      to.path == "/" ? (this.isShow = false) : (this.isShow = true);
    }
  },
  created() {
    location.pathname == "/" ? (this.isShow = false) : (this.isShow = true);
    // 防止刷新数据丢失
    this.$store.dispatch(
      "changeUser",
      JSON.parse(sessionStorage.userInfo).user
    );
  }
};
</script>

<style>
#app {
  font-family: "MicrosoftYaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
/* iview 样式替换 */
.ivu-progress-inner {
  background-color: #daf3ff;
}

.ivu-progress-show-info .ivu-progress-outer {
  margin-right: 0;
  padding-right: 0;
}
.ivu-progress-bg {
  height: 14px !important;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
