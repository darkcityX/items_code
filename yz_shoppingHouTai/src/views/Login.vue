<template>
  <div class="loginPage">
    <!-- 2、main主体 -->
    <div class="loginPageMain">
      <!-- 1、大banner -->
      <div class="bannerImg">
        <img src="./../assets/images/indexBanner.png" alt>
      </div>
      <!-- 2、列表 -->
      <div class="shoppingList">
        <div class="listContainer" span="16" offset="4">
          <!-- 2.1、列表标题 -->
          <div class="title">
            <span>原子链自营</span>
            <img src="./../assets/images/shangcheng_icon_ziying.png" alt>
          </div>
          <!-- 2.2、列表 -->
          <ul class="list">
            <li
              class="list-item"
              v-for="(item,index) in productList"
              :key="index"
              :data-productId="item.product.productId"
            >
              <Card :bordered="false">
                <div>
                  <img :src="item.product.productImg">
                  <div class="detail-box">
                    <div class="shoppingInfo">
                      <p class="shoppingName">{{ item.product.productName }}</p>
                      <p class="shoppingOther">{{ item.product.productDescription }}</p>
                    </div>
                    <div class="btn">
                      <span class="priceContainer">
                        &yen;
                        <span class="price">{{ item.product.productPrice | moneyFilter }}</span>
                      </span>
                      <Button type="primary" @click="goDetailsPage(item)">立即购买
                        <Icon type="ios-arrow-forward"/>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 3、登录弹出窗 -->
    <div class="loginContainer" v-show="isLoginViewModel">
      <div class="loginView">
        <!-- 1、关闭按钮 -->
        <div class="close" @click="closeLoginModel();">
          <Icon type="ios-close" size="28"/>
        </div>
        <!-- 2、登录LOGO、窗口标题 -->
        <div class="loginViewTop">
          <img src="./../assets/images/login_logo.png" alt>
        </div>
        <!-- 3、表单 -->
        <div class="loginViewMain">
          <div class="userName">
            <Input
              v-model="loginFrom.userName"
              prefix="ios-phone-portrait"
              size="large"
              placeholder="用户名/手机号"
            />
          </div>
          <div class="userPwd" style="margin-top: 6px">
            <Input
              v-model="loginFrom.userPwd"
              prefix="ios-lock-outline"
              size="large"
              type="password"
              placeholder="密码"
            />
          </div>
        </div>
        <!-- 4、登录按钮 -->
        <Button type="primary" @click="checkFrom();" default>登录</Button>
        <!-- 5、去注册 -->
        <p class="toRegister">
          <span>
            <router-link to="/telChangePwd">忘记密码?</router-link>
          </span>
          <router-link to="/registerPage">还没有账户？注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueEvent from "@/common/js/VueEvent.js";
import { toMoney } from "@/common/js/MoneyFilter.js";
export default {
  name: "loginPage",
  data() {
    return {
      // 登录框显示
      isLoginViewModel: true,

      // 是否登录
      isLogin: false,

      // 登录表单
      loginFrom: {
        userName: "",
        userPwd: ""
      },

      // 用户信息
      userInfo: {},

      // 商品列表
      productList: []
    };
  },
  created() {
    // 1、进入组件前进行登录状态判断
    if (!sessionStorage.isLogin) {
      // alert("未登录");
      this.isLogin = false;
      this.isLoginViewModel = true;
    } else {
      // alert("已登录");
      this.isLogin = true;
      this.isLoginViewModel = false;
    }
    // 2、调用商品列表接口
    this.getProductList();
  },
  mounted: function() {
    // console.log("----------login组件挂载完毕！--------------");
    let _this = this;
    VueEvent.$on("to-login", function(data) {
      // console.log( "从header组件中传过来的值为：" + data );
      // console.log( "当前isLoginViewModel的值(修改前)：" + _this.isLoginViewModel );
      _this.isLoginViewModel = data;
      // console.log( "当前isLoginViewModel的值(修改后)：" + _this.isLoginViewModel  );
    });
  },
  filters: {
    // 价格过滤器
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    // 打开登录模态框
    openLoginModel() {
      this.isLoginViewModel = true;
    },
    // 关闭登录模态框
    closeLoginModel() {
      this.isLoginViewModel = false;
    },
    // 表单验证函数
    checkFrom() {
      if (!this.loginFrom.userName) {
        this.$Message.error("请输入用户名/手机号!");
      } else if (!this.loginFrom.userPwd) {
        this.$Message.error("请输入密码!");
      } else {
        this.$axios
          .post("api/admin/userLogin", {
            user_mobile: this.loginFrom.userName,
            user_password: this.loginFrom.userPwd
          })
          .then(res => {
            // 登录成功
            this.$store.dispatch("changeUser", res.user);
            // 登录成功提示框
            this.$Message.success("登录成功!");

            // 关闭登录模态框
            this.isLoginViewModel = false;

            // 将用户信息及登录状态存储到当前组件数据中
            this.userInfo = res;
            this.isLogin = true;

            // 将登录状态传递给Header组件
            // console.log( this.userInfo );
            VueEvent.$emit("to-head", this.isLogin);

            // 将登录成功状态存储到本地session会话中

            sessionStorage.setItem("isLogin", this.isLogin);
            sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
          })
          .catch(err => {
            // 错误提示框
            console.log(err);
            this.$Message.error(err.data.msg);
          });
      }
    },
    // 请求商品列表
    getProductList() {
      this.$axios
        .post("api/product/listProduct", {})
        .then(res => {
          // console.log(res);
          this.productList = res.productMapList;
        })
        .catch(err => {
          // console.log( err );
        });
    },
    // 立即购买按钮
    goDetailsPage(product) {
      sessionStorage.product = JSON.stringify(product);
      this.$router.push({ path: "/product_del", query: { product:JSON.stringify(product) } });
    }
  }
};
</script>

<style lang="less">
// 列表区域
.loginPageMain {
  background: #f5f5f5;
  // 1、大的banner图
  .bannerImg {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  // 2、主内容列表区域
  .shoppingList {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 80px;
    .title {
      padding: 20px 10px;
      text-align: left;
      span {
        color: rgba(34, 34, 34, 1);
        font-size: 22px;
        vertical-align: middle;
      }
      img {
        vertical-align: middle;
      }
    }
    .list {
      margin: 0 auto;
      list-style-type: none;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      .list-item {
        margin: 4px;
        width: 392px;
        height: 450px;
        .ivu-card {
          height: 100%;
          .ivu-card-body {
            height: 100%;
            div {
              // height: 100%;
            }
            img {
              width: 352px;
              height: 312px;
              object-fit: cover;
            }
            .detail-box {
              margin-top: 20px;
              .shoppingInfo {
                box-sizing: border-box;
                padding: 0 10px;
                text-align: left;
                .shoppingName {
                  font-size: 16px;
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                }
                .shoppingOther {
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(102, 102, 102, 1);
                }
              }
              .btn {
                box-sizing: border-box;
                padding: 0 10px;
                position: relative;
                margin-top: 10px;
                text-align: right;
                .priceContainer {
                  position: absolute;
                  left: 10px;
                  bottom: 0;
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(0, 160, 234, 1);
                  .price {
                    font-size: 16px;
                    font-weight: 600;
                  }
                }
                button {
                }
              }
            }
          }
        }
      }
    }
  }
}
// 登录框
.loginContainer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  .loginView {
    position: relative;
    margin: 0 auto;
    margin-top: 10%;
    padding: 40px 0;
    max-width: 440px;
    max-height: 560px;
    border-radius: 8px;
    background: #fff;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .loginViewTop {
      margin-bottom: 20px;
    }
    .loginViewMain {
      > div {
        margin-bottom: 15px;
        .ivu-input-wrapper {
          width: 360px;
        }
      }
    }
    > button {
      margin-bottom: 20px;
      width: 360px;
      height: 36px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .toRegister {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      span {
        margin-right: 10px;
        padding-right: 10px;
        border-right: 1px solid #333;
      }
      a {
        // font-size:14px;
        // font-weight:400;
        color: rgba(0, 160, 234, 1);
      }
    }
  }
}
</style>
