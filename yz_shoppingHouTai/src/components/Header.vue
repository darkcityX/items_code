<template>
  <div class="header">
    <!-- 1、头部top：官网、用户名、退出登陆按钮 -->
    <Row class="headerTop">
      <Col class="headerTopContainer" span="16" offset="4">
        <div class="mainLeft">
          <a style="color:#fff;" target="_blank" href="http://atoshi.talkingcake.com/">原子链官网</a>
        </div>
        <div class="mainRight">
          <div class="yeslogin" v-show="isLogin">
            <img src="./../assets/images/tab_icon_mine.png" alt>
            <!-- <img src="./../assets/images/tab_jiantou.png" alt> -->
            <!-- userInfo.user.userName -->
            <span>{{ userInfos.userName }}</span>
            <span @click="dropOut();">退出</span>
          </div>
          <div class="noLogin" v-show="!isLogin">
            <span @click="login();">登录</span>
            <span>|</span>
            <span @click="register();">注册</span>
          </div>
        </div>
      </Col>
    </Row>
    <!-- 2、logo、一级导航 -->
    <Row class="headerBottom">
      <Col span="16" offset="4">
        <div class="mainLeft">
          <router-link to="/home">
            <img src="./../assets/images/login_tab_logo.png" alt>
          </router-link>
        </div>
        <div class="mainCenter">
          <router-link to="/home">原子恋商城首页</router-link>
          <router-link to="/alliancePage">原子联盟</router-link>
          <router-link to="/myProduct">我的订单</router-link>
          <router-link to="/accountSettingsPage/personalInformation">账户设置</router-link>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueEvent from "./../common/js/VueEvent.js";
export default {
  name: "Header",
  data() {
    return {
      // 是否登陆
      isLogin: false,

      userInfo: {
        userName: ""
      }
    };
  },
  // props: [
  // 	// 是否登陆
  // 	"isLogin"
  // ],
  created: function() {
    // // 进行登陆状态判断
    if (!sessionStorage.isLogin) {
      //   alert("未登陆");
      this.isLogin = false;
    } else {
      this.isLogin = true;
      let sessionUser = JSON.parse(sessionStorage.getItem("userInfo"));
      this.userInfo.userName = sessionUser.user.userName;
      // console.log(this.userInfo.userName);
    }
  },
  mounted: function() {
    // console.log("---------组件挂载完毕------");
    let _this = this;
    VueEvent.$on("to-head", function(data) {
      //   console.log( "header中接收到了来自兄弟组件login的传值：" + data );
      //   console.log( "header组件的isLogin值(修改后)：" + _this.isLogin );
      _this.isLogin = true;
      //   console.log( "header组件的isLogin值(修改后)：" + _this.isLogin );
    });
  },
  computed: {
    ...mapGetters({
      userInfos: "getUser"
    })
  },
  methods: {
    register() {
      this.$router.push({ path: "/registerPage" });
    },
    login() {
      // console.log( this.isLogin );
      if (this.isLogin) {
        // this.$router.push({path: '/loginPage'});
      } else {
        this.$router.push({ path: "/loginPage" });

        //给首页组件传值
        this.openLoginModel();

        // console.log( this.$parent.isLoginViewModel );
        // 打开登陆模态框
        // this.$parent.isLoginViewModel = true;
      }
    },
    dropOut() {
      this.$router.push({ path: "/loginPage" });
      sessionStorage.clear();
      this.isLogin = false;

      //给首页组件传值
      this.openLoginModel();

      // 成功退出提示
      this.$Message.success("退出成功!");
      // this.$parent.isLoginViewModel = true;
    },
    openLoginModel() {
      // 将头部组件的状态值传给login页面
      VueEvent.$emit("to-login", true);
    }
  }
};
</script>

<style lang="less">
.header {
  height: 120px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.07);
  .headerTop {
    color: #fff;
    font-size: 14px;
    background: #333;
    .headerTopContainer {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      .mainRight {
        .yeslogin {
          img,
          span {
            cursor: pointer;
            vertical-align: middle;
          }
          img {
            padding-right: 0;
          }
          span:last-child {
            padding: 0 10px;
          }
        }
        .noLogin {
          font-size: 0;
          span {
            font-size: 14px;
            cursor: pointer;
            vertical-align: middle;
          }
          span:nth-child(2) {
            margin: 0 10px;
          }
        }
      }
    }
  }
  .headerBottom {
    height: 80px;
    .mainLeft {
      position: absolute;
      top: 0;
      left: 0;
      a {
        display: block;
        height: 80px;
        line-height: 80px;
        img {
          padding: 15px 0;
          display: inline-block;
        }
        span {
          display: inline-block;
          width: 80px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(21, 60, 106, 1);
        }
      }
    }
    .mainCenter {
      padding-left: 200px;
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      white-space: nowrap;
      a {
        margin-right: 70px;
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
      }
    }
  }
}
</style>
