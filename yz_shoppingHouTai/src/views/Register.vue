
<template>
  <div class="registerPage">
    <!-- 2、main主体 -->
    <div class="registerPageMain">
      <Row>
        <Col span="16" offset="4">
          <div class="RegisterContent">
            <!-- 1、logo -->
            <div class="logo">
              <img src="./../assets/images/login_logo.png" alt>
            </div>
            <!-- 2、表单 -->
            <div class="registerFrom">
              <Row class="inputContainer inputPhone">
                <Col class="inputLeft" span="9">
                  <label class="inputName">手机号*</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input
                    v-model="registerFrom.phoneCode"
                    type="text"
                    :maxlength="11"
                    placeholder="请输入手机号码"
                  ></Input>
                </Col>
              </Row>
              <Row class="inputContainer inputCheckCode">
                <Col class="inputLeft" span="9">
                  <label class="inputName">校验码*</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input v-model="registerFrom.checkCode" placeholder="请输入校验码"></Input>
                </Col>
                <Col class="inputRight" span="9">
                  <div class="code">
                    <Sidentify :identifyCode="identifyCode"></Sidentify>
                    <span @click="refreshCode">看不清楚换一张</span>
                  </div>
                </Col>
              </Row>
              <Row class="inputContainer inputVerificationCode">
                <Col class="inputLeft" span="9">
                  <label class="inputName">验证码*</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input
                    v-model="registerFrom.inputVerificationCode"
                    @on-blur="ObtainInputVerificationCode()"
                    placeholder="请输入验证码"
                  ></Input>
                </Col>
                <Col class="inputRight" span="9">
                  <Button @click="sendInputVerificationCode();" :disabled="disabled">{{btnText}}</Button>
                </Col>
              </Row>
              <Row class="inputContainer inputPwd">
                <Col class="inputLeft" span="9">
                  <label class="inputName">输入密码*</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input
                    v-model="registerFrom.upwd"
                    :minlength="6"
                    :maxlength="15"
                    type="password"
                    placeholder="6~15个字符，数字，字母组合"
                  ></Input>
                </Col>
              </Row>
              <Row class="inputContainer inputPwdOver">
                <Col class="inputLeft" span="9">
                  <label class="inputName">确认密码*</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input
                    v-model="registerFrom.overUpwd"
                    :minlength="6"
                    :maxlength="15"
                    type="password"
                    placeholder="请再次输入密码"
                  ></Input>
                </Col>
              </Row>
              <Row class="inputContainer inputWeChatCode">
                <Col class="inputLeft" span="9">
                  <label class="inputName">微信号</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input v-model="registerFrom.weChatCode" placeholder="选填"></Input>
                </Col>
              </Row>
              <Row class="inputContainer inputInvitationCode">
                <Col class="inputLeft" span="9">
                  <label class="inputName">邀请码</label>
                </Col>
                <Col class="inputCenter" span="6">
                  <Input v-model="registerFrom.invitationCode" placeholder="填写邀请码，双方各奖励1000枚原子币"></Input>
                </Col>
              </Row>
              <Row class="protocol">
                <Col span="6" offset="9">
                  <!-- v-model="single" -->
                  <Checkbox v-model="registerFrom.single">原子链用户使用协议</Checkbox>
                </Col>
              </Row>
            </div>
            <!-- 3、button -->
            <div class="btn">
              <Row>
                <Col class="btn" span="6" offset="9">
                  <Button type="primary" long @click="checkFrom()">立即注册</Button>
                  <div class="goLogin">
                    <router-link to="/loginPage">已有账户，登录</router-link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>

    <!-- 3、登陆成功跳转提示框 -->
    <div class="successRegister" v-if="successRegisterTip">
      <Row>
        <Col span="4" offset="10">
          <div class="successTip">
            <p>注册成功!</p>
            <p>3s后跳转到原子联盟...</p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
var times = 60;

// 导入效验码组件
import Sidentify from "./../components/identify.vue";

export default {
  name: "registerPage",
  data() {
    return {
      // successRegister:注册成功弹窗是否挂载
      successRegisterTip: false,
      // from表单数据
      registerFrom: {
        phoneCode: "", // 手机号
        checkCode: "", // 校验码
        inputVerificationCode: "", // 验证码
        upwd: "", // 注册密码
        overUpwd: "", // 确认密码
        weChatCode: "", // 微信号
        invitationCode: "", // 邀请码
        single: false // 用户协议
      },
      // 服务器数据
      isInputVerification: true, // 验证 验证码成功/失败

      // 校验码组件数据
      identifyCodes: "1234567890",
      identifyCode: "",

      // 发送验证短信验证禁用
      disabled: false,
      btnText: "发送验证码"
    };
  },
  components: {
    // 效验码组件
    Sidentify
  },
  created: function() {},
  mounted() {
    // 图片验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    // 表单验证函数
    checkFrom() {
      let isOk = false;
      let _this = this;
      console.log("生成的校验码" + this.identifyCode);
      console.log("输入的校验码" + this.registerFrom.checkCode);

      if (!this.registerFrom.phoneCode) {
        // 手机号码验证
        this.$Message.error("请输入电话号码!");
        isOk = false;
      } else if (!/^1[34578]\d{9}$/.test(this.registerFrom.phoneCode)) {
        this.$Message.error("请输入正确的电话号码!");
        isOk = false;
      } else if (!this.registerFrom.checkCode) {
        this.$Message.error("请输入校验码!");
        isOk = false;
      } else if (this.registerFrom.checkCode != this.identifyCode) {
        this.$Message.error("校验码输入不正确!");
        isOk = false;
      } else if (!this.registerFrom.inputVerificationCode) {
        // 验证码验证
        this.$Message.error("请输入验证码!");
        isOk = false;
      } else if (this.isInputVerification) {
        // 获取验证码
        this.$Message.error("验证码输入有误，请查验!");
        isOk = false;
      } else if (!this.registerFrom.upwd) {
        // 密码验证
        this.$Message.error("请输入密码!");
        isOk = false;
      } else if (
        !/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{0,20}$/.test(this.registerFrom.upwd)
      ) {
        this.$Message.error("请输入6~15个字符，数字，字母组合密码!");
        isOk = false;
      } else if (this.registerFrom.upwd != this.registerFrom.overUpwd) {
        this.$Message.error("两次密码输入不一致!");
        isOk = false;
      } else if (!this.registerFrom.single) {
        this.$Message.error("请阅读用户协议书!");
        isOk = false;
      } else {
        this.$axios
          .post("api/admin/userRegister", {
            user_mobile: this.registerFrom.phoneCode,
            user_password: this.registerFrom.upwd,
            invite_code: this.registerFrom.invitationCode,
            wechat_id: this.registerFrom.weChatCode
          })
          .then(res => {
            // 注册成功，弹出跳转弹窗
            this.successRegisterTip = true;
            // 页面跳转
            var id = setTimeout(function() {
              _this.$router.push({ path: "/loginPage" });
              clearTimeout(id);
            }, 3000);
          })
          .catch(err => {
            console.log(err);
            this.$Message.error(err.data.msg);
          });
      }
    },
    // 发送验证码
    sendInputVerificationCode() {
      if (!this.registerFrom.phoneCode) {
        this.$Message.error("请输入手机号码!");
      } else if (!/^1[34578]\d{9}$/.test(this.registerFrom.phoneCode)) {
        this.$Message.error("请输入正确的手机号码!");
      } else {
        // alert("---- 发送请求 ----");
        let _this = this;
        this.$axios
          .get("api/admin/SMS_phoneValidate", {
            params: {
              user_mobile: this.registerFrom.phoneCode
            }
          })
          .then(res => {
            // this.$Message.success("短信已发送，一分钟后可重新发送!");
            // this.disabled = true;
            // let id = setTimeout(function() {
            // 	_this.disabled = false;
            // 	clearTimeout(id);
            // }, 60000);
            this.time = setInterval(() => {
              if (times > 1) {
                this.disabled = true;
                times--;
                this.btnText = `${
                  times < 10 ? "0" + times : times
                }秒后重新发送`;
              } else {
                clearInterval(this.time);
                this.disabled = false;
                this.btnText = `发送验证码`;
                times = 60;
              }
            }, 1000);
          })
          .catch(err => {
            this.$Message.warning("网络繁忙，请稍后再试!");
          });
      }
    },
    /* ----------------- input失焦验证 ------------------------ */
    // // 手机号码失焦验证
    // ObtainInputPhone() {
    //     if (!this.registerFrom.phoneCode) {
    // 		// 手机号码验证
    // 		this.$Message.error("请输入电话号码!");
    // 	} else if (!/^1[34578]\d{9}$/.test(this.registerFrom.phoneCode)) {
    // 		this.$Message.error("请输入正确的电话号码!");
    // 	}
    // },
    // // 校验码 失焦验证
    // ObtainInputCheckCode() {
    //     if (!this.registerFrom.checkCode) {
    // 		this.$Message.error("请输入校验码!");
    // 	} else if ( this.registerFrom.checkCode != this.identifyCode ) {
    // 		this.$Message.error("校验码输入不正确!");
    // 	}
    // },
    // 验证码 失焦验证
    ObtainInputVerificationCode() {
      if (!this.registerFrom.inputVerificationCode) {
        this.$Message.error("请输入验证码!");
      } else {
        this.$axios
          .post("api/admin/SMS_verification", {
            user_mobile: this.registerFrom.phoneCode,
            code: this.registerFrom.inputVerificationCode
          })
          .then(res => {
            // this.$Message.success('短信已发送，请注意查收!');
            this.isInputVerification = false; // 请求数据成功，使其不进入到checkFrom验证中
            this.$Message.success("验证码输入正确!");
          })
          .catch(err => {
            // this.$Message.warning('网络繁忙，请稍后再试!');
            this.isInputVerification = true; // 请求数据失败
            this.$Message.warning("验证码错误,请查验!");
          });
      }
    },
    // // 密码  失焦验证
    // ObaintInputPwd() {
    //     if (!this.registerFrom.upwd) {
    // 		this.$Message.error("请输入密码!");
    // 	} else if (!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{0,20}$/.test(this.registerFrom.upwd)){
    //         this.$Message.error("请输入6~15个字符，数字，字母组合密码!");
    //     }
    // },
    // // 重复密码 失焦验证
    // ObaintInputOverPwd() {
    //     if( !this.registerFrom.overUpwd ){
    //         this.$Message.error("请输入确认密码!");
    //     }if (this.registerFrom.upwd != this.registerFrom.overUpwd) {
    // 		this.$Message.error("两次密码输入不一致!");
    // 	}
    // },
    /* ----------------效验码生成方法--------------------------- */

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
};
</script>

<style lang="less">
.registerPageMain {
  padding: 40px 0;
  background: url("./../assets/images/registerBg.png") no-repeat;
  background-size: 100% 100%;
  .RegisterContent {
    background: rgba(255, 255, 255, 1);
    opacity: 0.96;
    border-radius: 8px;
    .logo {
      padding: 20px 0;
    }
    .registerFrom {
      .inputContainer {
        margin-top: 20px;
        > div {
          height: 50px;
        }
        .inputLeft {
          padding-right: 10px;
          text-align: right;
          line-height: 50px;
        }
        .inputCenter {
          input {
            height: 50px;
          }
        }
        .inputRight {
          padding-left: 10px;
          text-align: left;
          line-height: 50px;
          .code {
            height: 50px;
            .s-canvas {
              position: relative;
              height: 50px;
              #s-canvas {
              }
            }
            span {
              position: absolute;
              top: 0;
              left: 130px;
              display: inline-block;
              font-size: 14px;
              height: 50px;
              line-height: 86px;
              cursor: pointer;
            }
          }
        }
      }
      .inputContainer:first-child {
        margin-top: 0;
      }
      .protocol {
        margin-top: 10px;
        text-align: left;
      }
    }
    .btn {
      padding: 20px 0;
      button {
        height: 50px;
        background: rgba(0, 160, 234, 1);
        border-radius: 4px;
      }
      .goLogin {
        padding-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 160, 234, 1);
      }
    }
  }
}
.successRegister {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .successTip {
    margin: 0 auto;
    margin-top: 100%;
    padding: 40px 0;
    width: 100%;
    border-radius: 8px;
    background: #fff;
    p:first-child {
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
    }
    p:last-child {
      padding-top: 30px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>


